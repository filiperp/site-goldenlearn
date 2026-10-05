<script setup lang="ts">
import { computed } from 'vue'

// Gera srcset a partir das variantes existentes em public/img (ex.: hero-640.webp, hero-1024.webp, hero.webp).
const VARIANTS = {
  unsplash: { widths: [640, 1024], full: 1600 },
  products: { widths: [500], full: 1000 },
} as const

const props = withDefaults(
  defineProps<{
    folder: keyof typeof VARIANTS
    name: string
    alt: string
    sizes?: string
    width?: number
    height?: number
    eager?: boolean
  }>(),
  { sizes: '100vw', eager: false },
)

const base = computed(() => `/img/${props.folder}/${props.name}`)
const srcset = computed(() => {
  const v = VARIANTS[props.folder]
  return [...v.widths.map((w) => `${base.value}-${w}.webp ${w}w`), `${base.value}.webp ${v.full}w`].join(', ')
})
</script>

<template>
  <img
    :src="`${base}.webp`"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  >
</template>
