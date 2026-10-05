<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { GOOGLE_PARTNER_URL } from '../data/site'

const { t } = useI18n()
</script>

<template>
  <section id="parceiros" class="section section-cream">
    <div class="container">
      <div v-reveal class="section-head center">
        <span class="eyebrow">{{ t('partners.eyebrow') }}</span>
        <h2 class="h2">{{ t('partners.title') }}</h2>
        <p class="lead">{{ t('partners.sub') }}</p>
      </div>
      <div class="partners">
        <div v-reveal class="partner-card">
          <div>
            <h3 class="h3">{{ t('partners.c1Title') }}</h3>
            <p>{{ t('partners.c1Text') }}</p>
          </div>
          <div class="logos-img">
            <img src="/img/partners/parceiros.webp" alt="Life Academy, Golden Connection, GM Cinco, Google Digital Native Partner" loading="lazy">
          </div>
        </div>
        <div v-reveal class="partner-card" data-delay="1">
          <div>
            <h3 class="h3">{{ t('partners.c2Title') }}</h3>
            <p>{{ t('partners.c2Text') }}</p>
          </div>
          <div class="logos-img">
            <img src="/img/partners/instituicoes.webp" alt="MIT, University of Oxford, Johns Hopkins, The University of Chicago, Harvard University" loading="lazy">
          </div>
        </div>
      </div>
      <div v-reveal class="google-badge">
        <img src="/img/original/Logo-Google-Partner-logo-small-size.png" alt="Google Partner" loading="lazy">
        <div>
          <b>{{ t('partners.googleTitle') }}</b>
          <p>{{ t('partners.googleText') }}</p>
        </div>
        <a class="btn btn-outline" :href="GOOGLE_PARTNER_URL" target="_blank" rel="noopener">{{ t('partners.googleLink') }}<AppIcon name="external" /></a>
      </div>
    </div>
  </section>
</template>
