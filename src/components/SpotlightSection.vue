<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSiteState } from '../composables/useSiteState'

const { t } = useI18n()
const { filter } = useSiteState()
const dice = [
  { letter: 'D', key: 'spot.d' },
  { letter: 'I', key: 'spot.i' },
  { letter: 'C', key: 'spot.c' },
  { letter: 'E', key: 'spot.e' },
]
</script>

<template>
  <section class="section spotlight">
    <div class="container spot-grid">
      <div v-reveal>
        <span class="eyebrow">{{ t('spot.eyebrow') }}</span>
        <h2 class="h2" v-html="t('spot.title')" />
        <p class="lead">{{ t('spot.text') }}</p>
        <div class="dice">
          <div v-for="d in dice" :key="d.letter"><b>{{ d.letter }}</b><span>{{ t(d.key) }}</span></div>
        </div>
        <a class="btn btn-primary" href="#sol-immersive" @click="filter = 'all'">{{ t('spot.cta') }}<AppIcon name="arrow" /></a>
      </div>
      <div v-reveal class="spot-media" data-delay="1">
        <img src="/img/unsplash/vr.webp" alt="" loading="lazy">
      </div>
    </div>
  </section>
</template>
