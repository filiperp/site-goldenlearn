<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'

const { t } = useI18n()
const bars = [90, 74, 62, 48, 36, 24]
</script>

<template>
  <section class="hero">
    <div class="container">
      <span class="hero-badge"><b>{{ t('hero.badgeTag') }}</b><span>{{ t('hero.badge') }}</span></span>
      <h1 class="display" v-html="t('hero.title')" />
      <p class="lead">{{ t('hero.sub') }}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="#contato">{{ t('hero.cta1') }}<AppIcon name="arrow" /></a>
        <a class="btn btn-ghost" href="#solucoes">{{ t('hero.cta2') }}</a>
      </div>
      <div class="hero-note">
        <span v-for="n in ['note1', 'note2', 'note3']" :key="n"><AppIcon name="check" />{{ t(`hero.${n}`) }}</span>
      </div>

      <div v-reveal class="hero-stage" data-delay="2">
        <div class="float-card fc-1" aria-hidden="true">
          <small>{{ t('hero.card1Label') }}</small>
          <strong>{{ t('hero.card1Title') }}</strong>
          <div class="progress"><i /></div>
          <div class="fc-row"><span>{{ t('hero.card1Meta') }}</span><b>78%</b></div>
        </div>
        <div class="float-card fc-2" aria-hidden="true">
          <small>{{ t('hero.card2Label') }}</small>
          <strong>{{ t('hero.card2Title') }}</strong>
          <div class="bars"><i v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }" /></div>
          <span class="pill">{{ t('hero.card2Pill') }}</span>
        </div>
        <div class="float-card fc-3" aria-hidden="true">
          <div class="fc-flex">
            <span class="check"><AppIcon name="badge" /></span>
            <div><small>{{ t('hero.card3Label') }}</small><strong>{{ t('hero.card3Title') }}</strong></div>
          </div>
        </div>
        <div class="hero-frame">
          <img src="/img/unsplash/hero.webp" alt="" width="1600" height="1067" fetchpriority="high">
        </div>
      </div>
    </div>
  </section>
</template>
