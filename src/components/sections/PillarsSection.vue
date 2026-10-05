<script setup lang="ts">
import { useI18n } from '../../i18n'
import AppIcon from '../ui/AppIcon.vue'
import ResponsiveImg from '../ui/ResponsiveImg.vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { useSiteState } from '../../composables/useSiteState'
import type { Category } from '../../data/site'

const { t } = useI18n()
const { filter } = useSiteState()

const pillars: { key: string; cat: Category; img: string }[] = [
  { key: 'p1', cat: 'people', img: 'meeting' },
  { key: 'p2', cat: 'learning', img: 'learning' },
  { key: 'p3', cat: 'data', img: 'data' },
]
</script>

<template>
  <section id="plataforma" class="section" aria-labelledby="plataforma-title">
    <div class="container">
      <SectionHeader id="plataforma-title" :eyebrow="t('pillars.eyebrow')" :title="t('pillars.title')" :lead="t('pillars.sub')" />
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
          <ResponsiveImg folder="unsplash" :name="p.img" alt="" sizes="(max-width: 1060px) 100vw, 400px" />
          <span class="tag">{{ t(`pillars.${p.key}Tag`) }}</span>
          <h3>{{ t(`pillars.${p.key}Title`) }}</h3>
          <p>{{ t(`pillars.${p.key}Text`) }}</p>
          <span class="sol-link">{{ t('pillars.link') }}<AppIcon name="arrow" /></span>
        </a>
      </div>
    </div>
  </section>
</template>
