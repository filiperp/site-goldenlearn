<script setup lang="ts">
import { useI18n } from '../../i18n'
import ResponsiveImg from '../ui/ResponsiveImg.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const { t } = useI18n()
const steps = ['s1', 's2', 's3', 's4']
</script>

<template>
  <section id="como-trabalhamos" class="section" aria-labelledby="como-title">
    <div class="container approach">
      <div class="approach-sticky">
        <SectionHeader id="como-title" :eyebrow="t('approach.eyebrow')" :title="t('approach.title')" :lead="t('approach.sub')" />
        <div v-reveal class="approach-img">
          <ResponsiveImg folder="unsplash" name="workshop" :alt="t('alt.workshop')" sizes="(max-width: 1060px) 100vw, 560px" />
        </div>
      </div>
      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s" v-reveal class="step">
          <span class="step-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="h3">{{ t(`approach.${s}Title`) }}</h3>
            <p>{{ t(`approach.${s}Text`) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
