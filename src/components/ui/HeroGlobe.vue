<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Globo de partículas (esfera de Fibonacci) desenhado em canvas.
// Otimizações: cores pré-calculadas em buckets e desenho em lote por cor,
// menos pontos/DPR no mobile, pausa fora da tela e início no tempo ocioso.

const canvas = ref<HTMLCanvasElement | null>(null)

const BLUE = [47, 111, 214]
const ORANGE = [242, 110, 33]
const AMBER = [255, 181, 71]
const LIGHT_STEPS = 16
const ALPHA_STEPS = 10

let cleanup: (() => void) | null = null

function mix(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}
function smooth(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

// Paleta: [luz][alpha] → string rgba
const PALETTE: string[][] = Array.from({ length: LIGHT_STEPS }, (_, li) => {
  const l = li / (LIGHT_STEPS - 1)
  const c = l < 0.6 ? mix(BLUE, ORANGE, l / 0.6) : mix(ORANGE, AMBER, (l - 0.6) / 0.4)
  return Array.from({ length: ALPHA_STEPS }, (_, ai) => {
    const a = 0.06 + 0.94 * (ai / (ALPHA_STEPS - 1)) ** 2
    return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`
  })
})

function init(el: HTMLCanvasElement) {
  const ctx = el.getContext('2d', { alpha: true })
  if (!ctx) return

  const mobile = window.matchMedia('(max-width: 760px)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const N = mobile ? 1100 : 1900
  const pts = new Float32Array(N * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    pts[i * 3] = Math.cos(golden * i) * r
    pts[i * 3 + 1] = y
    pts[i * 3 + 2] = Math.sin(golden * i) * r
  }
  // buckets reaproveitados a cada quadro: lista de (x, y, tamanho)
  const buckets: number[][] = Array.from({ length: LIGHT_STEPS * ALPHA_STEPS }, () => [])

  let w = 0, h = 0, dpr = 1
  let angle = 0.6, mx = 0, my = 0, tx = 0, ty = 0
  let last = performance.now()
  let raf = 0, running = false

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
    w = el.clientWidth
    h = el.clientHeight
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
  }

  function frame(now: number) {
    const dt = Math.min(64, now - last)
    last = now
    if (!reduced) angle += dt * 0.00012
    mx += (tx - mx) * 0.04
    my += (ty - my) * 0.04

    const c = ctx!
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    c.clearRect(0, 0, w, h)
    const cx = w / 2, cy = h / 2
    const R = Math.min(w, h) * 0.36
    const a = angle + mx * 0.35
    const tilt = -0.38 + my * 0.18
    const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt)

    // halo + corpo da esfera
    const halo = c.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.7)
    halo.addColorStop(0, 'rgba(242,110,33,0.16)')
    halo.addColorStop(0.5, 'rgba(47,111,214,0.08)')
    halo.addColorStop(1, 'rgba(47,111,214,0)')
    c.fillStyle = halo
    c.fillRect(0, 0, w, h)
    const body = c.createRadialGradient(cx + R * 0.35, cy - R * 0.4, R * 0.05, cx, cy, R)
    body.addColorStop(0, 'rgba(255,170,90,0.30)')
    body.addColorStop(0.35, 'rgba(120,70,60,0.22)')
    body.addColorStop(0.75, 'rgba(24,57,102,0.32)')
    body.addColorStop(1, 'rgba(8,14,28,0.55)')
    c.beginPath()
    c.arc(cx, cy, R, 0, Math.PI * 2)
    c.fillStyle = body
    c.fill()
    const rim = c.createLinearGradient(cx - R, cy + R, cx + R, cy - R)
    rim.addColorStop(0, 'rgba(47,111,214,0.15)')
    rim.addColorStop(1, 'rgba(255,181,71,0.55)')
    c.strokeStyle = rim
    c.lineWidth = 1.5
    c.stroke()

    // pontos agrupados por cor
    for (const b of buckets) b.length = 0
    for (let i = 0; i < N; i++) {
      const x = pts[i * 3], y = pts[i * 3 + 1], z = pts[i * 3 + 2]
      const x1 = x * ca + z * sa
      const z1 = -x * sa + z * ca
      const y2 = y * ct - z1 * st
      const z2 = y * st + z1 * ct
      const depth = (z2 + 1) / 2
      const light = smooth(0.25, 1, depth * 0.75 + (x1 * 0.5 + 0.5) * 0.25 + (-y2 * 0.5 + 0.5) * 0.15)
      const li = Math.round(light * (LIGHT_STEPS - 1))
      const ai = Math.round(depth * (ALPHA_STEPS - 1))
      const s = 0.6 + 2 * depth
      buckets[li * ALPHA_STEPS + ai].push(cx + x1 * R - s / 2, cy + y2 * R - s / 2, s)
    }
    c.globalCompositeOperation = 'lighter'
    for (let k = 0; k < buckets.length; k++) {
      const b = buckets[k]
      if (!b.length) continue
      c.fillStyle = PALETTE[(k / ALPHA_STEPS) | 0][k % ALPHA_STEPS]
      c.beginPath()
      for (let j = 0; j < b.length; j += 3) c.rect(b[j], b[j + 1], b[j + 2], b[j + 2])
      c.fill()
    }
    c.globalCompositeOperation = 'source-over'

    // anel orbital + satélites
    const ringR = R * 1.32
    c.save()
    c.translate(cx, cy)
    c.rotate(-0.32 + mx * 0.1)
    c.scale(1, 0.26 + my * 0.05)
    c.beginPath()
    c.arc(0, 0, ringR, 0, Math.PI * 2)
    const ring = c.createLinearGradient(-ringR, 0, ringR, 0)
    ring.addColorStop(0, 'rgba(47,111,214,0.05)')
    ring.addColorStop(0.5, 'rgba(255,181,71,0.45)')
    ring.addColorStop(1, 'rgba(47,111,214,0.05)')
    c.strokeStyle = ring
    c.lineWidth = 1.2
    c.stroke()
    for (let k = 0; k < 3; k++) {
      const t = angle * 2.4 + (k * Math.PI * 2) / 3
      const front = Math.sin(t) > 0
      c.beginPath()
      c.arc(Math.cos(t) * ringR, Math.sin(t) * ringR, front ? 4 : 2.5, 0, Math.PI * 2)
      c.fillStyle = front ? 'rgba(255,181,71,0.95)' : 'rgba(47,111,214,0.5)'
      c.shadowColor = 'rgba(242,110,33,0.9)'
      c.shadowBlur = front ? 18 : 0
      c.fill()
    }
    c.restore()

    if (running && !reduced) raf = requestAnimationFrame(frame)
  }

  const start = () => {
    if (running) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const onPointer = (e: PointerEvent) => {
    tx = (e.clientX / window.innerWidth) * 2 - 1
    ty = (e.clientY / window.innerHeight) * 2 - 1
  }

  resize()
  frame(performance.now())
  el.classList.add('ready')
  const ro = new ResizeObserver(() => {
    resize()
    if (!running) frame(performance.now())
  })
  ro.observe(el)
  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
  io.observe(el)
  if (!mobile) window.addEventListener('pointermove', onPointer, { passive: true })

  cleanup = () => {
    stop()
    ro.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onPointer)
  }
}

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const go = () => init(el)
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 600 })
  else setTimeout(go, 120)
})
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div class="hero-globe" aria-hidden="true"><canvas ref="canvas" /></div>
</template>
