<script setup lang="ts">
import { useI18n } from '../../i18n'
import AppIcon from '../ui/AppIcon.vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { GOOGLE_PARTNER_URL } from '../../data/site'

const { t } = useI18n()
</script>

<template>
  <section id="parceiros" class="section section-alt" aria-labelledby="parceiros-title">
    <div class="container">
      <SectionHeader id="parceiros-title" center :eyebrow="t('partners.eyebrow')" :title="t('partners.title')" :lead="t('partners.sub')" />
      <div class="partners">
        <article v-reveal class="partner-card">
          <div>
            <h3 class="h3">{{ t('partners.c1Title') }}</h3>
            <p>{{ t('partners.c1Text') }}</p>
          </div>
          <div class="logos-img">
            <img src="/img/partners/parceiros.webp" alt="Life Academy, Golden Connection, GM Cinco, Google Digital Native Partner" width="1365" height="160" loading="lazy" decoding="async">
          </div>
        </article>
        <article v-reveal class="partner-card" data-delay="1">
          <div>
            <h3 class="h3">{{ t('partners.c2Title') }}</h3>
            <p>{{ t('partners.c2Text') }}</p>
          </div>
          <div class="logos-img">
            <img src="/img/partners/instituicoes.webp" alt="MIT, University of Oxford, Johns Hopkins University, The University of Chicago, Harvard University" width="1506" height="110" loading="lazy" decoding="async">
          </div>
        </article>
      </div>
      <div v-reveal class="google-badge">
        <div class="g-logo"><img src="/img/brand/google-partner.png" alt="Google Partner" width="355" height="251" loading="lazy" decoding="async"></div>
        <div>
          <h3 class="h3">{{ t('partners.googleTitle') }}</h3>
          <p>{{ t('partners.googleText') }}</p>
        </div>
        <a class="btn btn-outline" :href="GOOGLE_PARTNER_URL" target="_blank" rel="noopener">{{ t('partners.googleLink') }}<AppIcon name="external" /></a>
      </div>
    </div>
  </section>
</template>
