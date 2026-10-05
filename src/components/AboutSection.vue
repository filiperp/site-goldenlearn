<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'

const { t } = useI18n()

const values = [
  { key: 'v1', icon: 'globe' },
  { key: 'v2', icon: 'star' },
  { key: 'v3', icon: 'trend' },
] as const

const stats = [
  { value: '35', plus: true, key: 's1' },
  { value: '10', plus: false, key: 's2' },
  { value: '3', plus: false, key: 's3' },
  { value: 'SaaS', plus: false, key: 's4' },
]
</script>

<template>
  <section id="sobre" class="section">
    <div class="container">
      <div class="about">
        <div v-reveal>
          <span class="eyebrow">{{ t('about.eyebrow') }}</span>
          <h2 class="h2">{{ t('about.title') }}</h2>
          <p class="lead">{{ t('about.text') }}</p>
          <div class="values">
            <div v-for="v in values" :key="v.key" class="value">
              <span class="ico"><AppIcon :name="v.icon" /></span>
              <div>
                <h4>{{ t(`about.${v.key}Title`) }}</h4>
                <p>{{ t(`about.${v.key}Text`) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-reveal class="about-media" data-delay="1">
          <img src="/img/unsplash/building.webp" alt="" loading="lazy">
          <img src="/img/unsplash/team.webp" alt="" loading="lazy">
          <img src="/img/unsplash/engineer.webp" alt="" loading="lazy">
        </div>
      </div>
      <div v-reveal class="stats">
        <div v-for="s in stats" :key="s.key" class="stat">
          <b>{{ s.value }}<sup v-if="s.plus">+</sup></b>
          <span>{{ t(`stats.${s.key}`) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
