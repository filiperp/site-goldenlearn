<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const steps = ['s1', 's2', 's3', 's4']
</script>

<template>
  <section id="como-trabalhamos" class="section">
    <div class="container approach">
      <div v-reveal class="approach-sticky">
        <span class="eyebrow">{{ t('approach.eyebrow') }}</span>
        <h2 class="h2">{{ t('approach.title') }}</h2>
        <p class="lead">{{ t('approach.sub') }}</p>
        <div class="approach-img"><img src="/img/unsplash/workshop.webp" alt="" loading="lazy"></div>
      </div>
      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s" v-reveal class="step">
          <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="h3">{{ t(`approach.${s}Title`) }}</h3>
            <p>{{ t(`approach.${s}Text`) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
