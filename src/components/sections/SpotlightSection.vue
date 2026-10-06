<script setup lang="ts">
import { useI18n } from '../../i18n'
import AppIcon from '../ui/AppIcon.vue'
import ResponsiveImg from '../ui/ResponsiveImg.vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { useSiteState } from '../../composables/useSiteState'

const { t } = useI18n()
const { focusSolution } = useSiteState()
const dice = [
  { letter: 'D', key: 'spot.d' },
  { letter: 'I', key: 'spot.i' },
  { letter: 'C', key: 'spot.c' },
  { letter: 'E', key: 'spot.e' },
]
</script>

<template>
  <section class="section spotlight on-dark" aria-labelledby="spot-title">
    <div class="container spot-grid">
      <div>
        <SectionHeader id="spot-title" :eyebrow="t('spot.eyebrow')" :title="t('spot.title')" :lead="t('spot.text')" />
        <ul v-reveal class="dice">
          <li v-for="d in dice" :key="d.letter"><b>{{ d.letter }}</b><span>{{ t(d.key) }}</span></li>
        </ul>
        <a class="btn btn-primary" href="#sol-immersive" @click.prevent="focusSolution('immersive')">{{ t('spot.cta') }}<AppIcon name="arrow" /></a>
      </div>
      <div v-reveal class="spot-media" data-delay="1">
        <ResponsiveImg folder="unsplash" name="vr" :alt="t('alt.vr')" sizes="(max-width: 1060px) 100vw, 590px" />
      </div>
    </div>
  </section>
</template>
