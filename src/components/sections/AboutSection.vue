<script setup lang="ts">
import { useI18n } from '../../i18n'
import AppIcon from '../ui/AppIcon.vue'
import ResponsiveImg from '../ui/ResponsiveImg.vue'
import SectionHeader from '../ui/SectionHeader.vue'

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
  <section id="sobre" class="section" aria-labelledby="sobre-title">
    <div class="container">
      <div class="about">
        <div>
          <SectionHeader id="sobre-title" :eyebrow="t('about.eyebrow')" :title="t('about.title')" :lead="t('about.text')" />
          <ul v-reveal class="values">
            <li v-for="v in values" :key="v.key" class="value">
              <span class="ico"><AppIcon :name="v.icon" /></span>
              <div>
                <h3>{{ t(`about.${v.key}Title`) }}</h3>
                <p>{{ t(`about.${v.key}Text`) }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-reveal class="about-media" data-delay="1">
          <ResponsiveImg folder="unsplash" name="building" :alt="t('alt.building')" sizes="(max-width: 1060px) 50vw, 300px" />
          <ResponsiveImg folder="unsplash" name="team" :alt="t('alt.team')" sizes="(max-width: 1060px) 50vw, 300px" />
          <ResponsiveImg folder="unsplash" name="engineer" :alt="t('alt.engineer')" sizes="(max-width: 1060px) 50vw, 300px" />
        </div>
      </div>
      <dl v-reveal class="stats">
        <div v-for="s in stats" :key="s.key" class="stat">
          <dt>{{ s.value }}<sup v-if="s.plus">+</sup></dt>
          <dd>{{ t(`stats.${s.key}`) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
