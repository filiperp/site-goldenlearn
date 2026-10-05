<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CLIENTS } from '../data/site'

const { t } = useI18n()
</script>

<template>
  <section class="logos" :aria-label="t('logos.title')">
    <p>{{ t('logos.title') }}</p>
    <div class="marquee">
      <div class="marquee-track">
        <span v-for="c in CLIENTS" :key="c">{{ c }}</span>
        <span v-for="c in CLIENTS" :key="c + '-dup'" aria-hidden="true">{{ c }}</span>
      </div>
    </div>
  </section>
</template>
