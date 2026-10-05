<script setup lang="ts">
import { useI18n } from '../../i18n'
import SectionHeader from '../ui/SectionHeader.vue'
import { FAQ_COUNT } from '../../data/site'

const { t } = useI18n()
const items = Array.from({ length: FAQ_COUNT }, (_, i) => i + 1)
</script>

<template>
  <section id="faq" class="section" aria-labelledby="faq-title">
    <div class="container faq-wrap">
      <SectionHeader id="faq-title" :eyebrow="t('faq.eyebrow')" :title="t('faq.title')" :lead="t('faq.sub')" />
      <div v-reveal class="faq" data-delay="1">
        <details v-for="i in items" :key="i" :open="i === 1">
          <summary><h3>{{ t(`faq.q${i}`) }}</h3><i aria-hidden="true" /></summary>
          <p>{{ t(`faq.a${i}`) }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
