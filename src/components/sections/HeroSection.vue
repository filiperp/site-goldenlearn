<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useI18n } from '../../i18n'
import AppIcon from '../ui/AppIcon.vue'

// O globo é carregado em um chunk separado: não bloqueia o texto (LCP) do hero.
const HeroGlobe = defineAsyncComponent(() => import('../ui/HeroGlobe.vue'))

const { t } = useI18n()
const facts = ['fact1', 'fact2', 'fact3']
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-bg" aria-hidden="true" />
    <ClientOnly><HeroGlobe /></ClientOnly>

    <div class="container hero-inner">
      <p class="hero-badge"><b>{{ t('hero.badgeTag') }}</b><span>{{ t('hero.badge') }}</span></p>
      <h1 id="hero-title" class="display" v-html="t('hero.title')" />
      <p class="lead">{{ t('hero.sub') }}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="#contato">{{ t('hero.cta1') }}<AppIcon name="arrow" /></a>
        <a class="btn btn-ghost" href="#solucoes">{{ t('hero.cta2') }}</a>
      </div>
      <ul class="hero-facts">
        <li v-for="f in facts" :key="f"><AppIcon name="check" />{{ t(`hero.${f}`) }}</li>
      </ul>
    </div>

    <a class="scroll-cue" href="#vitrine" :aria-label="t('hero.scroll')"><span>{{ t('hero.scroll') }}</span><i /></a>
  </section>
</template>
