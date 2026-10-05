<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Globo de partículas (esfera de Fibonacci) desenhado em canvas.
// Pontos da frente ficam laranja/âmbar, os do fundo azul; anel orbital com "satélites".

const canvas = ref<HTMLCanvasElement | null>(null)

const N = 2400
const BLUE: [number, number, number] = [47, 111, 214]
const ORANGE: [number, number, number] = [242, 110, 33]
const AMBER: [number, number, number] = [255, 181, 71]

let raf = 0
let running = false
let cleanup: (() => void) | null = null

function mix(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}
function smooth(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return

  const pts = new Float32Array(N * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    pts[i * 3] = Math.cos(th) * r
    pts[i * 3 + 1] = y
    pts[i * 3 + 2] = Math.sin(th) * r
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let w = 0, h = 0, dpr = 1
  let angle = 0.6
  let mx = 0, my = 0, tx = 0, ty = 0
  let last = performance.now()

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = el!.clientWidth
    h = el!.clientHeight
    el!.width = Math.round(w * dpr)
    el!.height = Math.round(h * dpr)
  }

  function draw(now: number) {
    const dt = Math.min(64, now - last)
    last = now
    if (!reduced) angle += dt * 0.00012
    mx += (tx - mx) * 0.04
    my += (ty - my) * 0.04

    const c = ctx!
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    c.clearRect(0, 0, w, h)
    const cx = w / 2, cy = h / 2
    const R = Math.min(w, h) * 0.32
    const a = angle + mx * 0.35
    const tilt = -0.38 + my * 0.18
    const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt)

    // halo atrás do globo
    const halo = c.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.7)
    halo.addColorStop(0, 'rgba(242,110,33,0.16)')
    halo.addColorStop(0.5, 'rgba(47,111,214,0.08)')
    halo.addColorStop(1, 'rgba(47,111,214,0)')
    c.fillStyle = halo
    c.fillRect(0, 0, w, h)

    // corpo da esfera: sombreado com luz vinda do alto à direita
    const body = c.createRadialGradient(cx + R * 0.35, cy - R * 0.4, R * 0.05, cx, cy, R)
    body.addColorStop(0, 'rgba(255,170,90,0.30)')
    body.addColorStop(0.35, 'rgba(120,70,60,0.22)')
    body.addColorStop(0.75, 'rgba(24,57,102,0.32)')
    body.addColorStop(1, 'rgba(8,14,28,0.55)')
    c.beginPath()
    c.arc(cx, cy, R, 0, Math.PI * 2)
    c.fillStyle = body
    c.fill()
    // borda iluminada
    const rim = c.createLinearGradient(cx - R, cy + R, cx + R, cy - R)
    rim.addColorStop(0, 'rgba(47,111,214,0.15)')
    rim.addColorStop(1, 'rgba(255,181,71,0.55)')
    c.strokeStyle = rim
    c.lineWidth = 1.5
    c.stroke()

    c.globalCompositeOperation = 'lighter'
    for (let i = 0; i < N; i++) {
      const x = pts[i * 3], y = pts[i * 3 + 1], z = pts[i * 3 + 2]
      const x1 = x * ca + z * sa
      const z1 = -x * sa + z * ca
      const y2 = y * ct - z1 * st
      const z2 = y * st + z1 * ct
      const depth = (z2 + 1) / 2
      const light = smooth(0.25, 1, depth * 0.75 + (x1 * 0.5 + 0.5) * 0.25 + (-y2 * 0.5 + 0.5) * 0.15)
      const col = light < 0.6 ? mix(BLUE, ORANGE, light / 0.6) : mix(ORANGE, AMBER, (light - 0.6) / 0.4)
      const alpha = 0.06 + 0.94 * depth * depth
      const s = 0.6 + 2.0 * depth
      c.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${alpha.toFixed(3)})`
      c.fillRect(cx + x1 * R - s / 2, cy + y2 * R - s / 2, s, s)
    }

    // anel orbital inclinado + satélites
    c.globalCompositeOperation = 'source-over'
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
      const sx = Math.cos(t) * ringR, sy = Math.sin(t) * ringR
      const front = Math.sin(t) > 0
      c.beginPath()
      c.arc(sx, sy, front ? 4 : 2.5, 0, Math.PI * 2)
      c.fillStyle = front ? 'rgba(255,181,71,0.95)' : 'rgba(47,111,214,0.5)'
      c.shadowColor = 'rgba(242,110,33,0.9)'
      c.shadowBlur = front ? 18 : 0
      c.fill()
    }
    c.restore()
    c.shadowBlur = 0

    if (running && !reduced) raf = requestAnimationFrame(draw)
  }

  function start() {
    if (running) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(draw)
  }
  function stop() {
    running = false
    cancelAnimationFrame(raf)
  }

  function onPointer(e: PointerEvent) {
    tx = (e.clientX / window.innerWidth) * 2 - 1
    ty = (e.clientY / window.innerHeight) * 2 - 1
  }

  resize()
  const ro = new ResizeObserver(() => { resize(); if (!running) draw(performance.now()) })
  ro.observe(el)
  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
  io.observe(el)
  window.addEventListener('pointermove', onPointer, { passive: true })
  draw(performance.now())

  cleanup = () => {
    stop()
    ro.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onPointer)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div class="hero-globe" aria-hidden="true"><canvas ref="canvas" /></div>
</template>
