<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const items = [1, 2, 3, 4, 5]
</script>

<template>
  <section id="faq" class="section">
    <div class="container faq-wrap">
      <div v-reveal class="section-head">
        <span class="eyebrow">{{ t('faq.eyebrow') }}</span>
        <h2 class="h2">{{ t('faq.title') }}</h2>
        <p class="lead">{{ t('faq.sub') }}</p>
      </div>
      <div v-reveal class="faq" data-delay="1">
        <details v-for="i in items" :key="i" :open="i === 1">
          <summary><span>{{ t(`faq.q${i}`) }}</span><i /></summary>
          <p>{{ t(`faq.a${i}`) }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
