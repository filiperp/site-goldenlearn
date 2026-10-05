<script setup lang="ts">
defineProps<{
  id: string
  eyebrow: string
  title: string
  lead?: string
  center?: boolean
}>()
</script>

<template>
  <header v-reveal class="section-head" :class="{ center }">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="id" class="h2" v-html="title" />
    <p v-if="lead" class="lead">{{ lead }}</p>
  </header>
</template>
