<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSiteState } from '../composables/useSiteState'
import type { Category } from '../data/site'

const { t } = useI18n()
const { filter } = useSiteState()

const pillars: { key: string; cat: Category; img: string }[] = [
  { key: 'p1', cat: 'people', img: 'meeting' },
  { key: 'p2', cat: 'learning', img: 'learning' },
  { key: 'p3', cat: 'data', img: 'data' },
]
</script>

<template>
  <section id="plataforma" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <span class="eyebrow">{{ t('pillars.eyebrow') }}</span>
        <h2 class="h2" v-html="t('pillars.title')" />
        <p class="lead">{{ t('pillars.sub') }}</p>
      </div>
      <div class="pillars">
        <a
          v-for="(p, i) in pillars"
          :key="p.key"
          v-reveal
          class="pillar"
          href="#solucoes"
          :data-delay="i"
          @click="filter = p.cat"
        >
          <img :src="`/img/unsplash/${p.img}.webp`" alt="" loading="lazy">
          <span class="tag">{{ t(`pillars.${p.key}Tag`) }}</span>
          <h3>{{ t(`pillars.${p.key}Title`) }}</h3>
          <p>{{ t(`pillars.${p.key}Text`) }}</p>
          <span class="sol-link">{{ t('pillars.link') }}<AppIcon name="arrow" /></span>
        </a>
      </div>
    </div>
  </section>
</template>
