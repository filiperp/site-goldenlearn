<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import LogoMarquee from '../components/LogoMarquee.vue'
import PillarsSection from '../components/PillarsSection.vue'
import SolutionsSection from '../components/SolutionsSection.vue'
import ApproachSection from '../components/ApproachSection.vue'
import SpotlightSection from '../components/SpotlightSection.vue'
import AboutSection from '../components/AboutSection.vue'
import PartnersSection from '../components/PartnersSection.vue'
import FaqSection from '../components/FaqSection.vue'
import ContactSection from '../components/ContactSection.vue'
import AppFooter from '../components/AppFooter.vue'
import { HTML_LANG, LOCALE_PATH, LOCALES, SITE_URL, type Locale } from '../data/site'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const locale = computed(() => (route.meta.locale as Locale) ?? 'pt')

useHead({
  htmlAttrs: { lang: () => HTML_LANG[locale.value] },
  title: () => t('meta.title'),
  meta: [
    { name: 'description', content: () => t('meta.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => t('meta.title') },
    { property: 'og:description', content: () => t('meta.description') },
    { property: 'og:url', content: () => SITE_URL + LOCALE_PATH[locale.value] },
    { property: 'og:image', content: `${SITE_URL}/img/unsplash/hero.webp` },
    { property: 'og:locale', content: () => HTML_LANG[locale.value].replace('-', '_') },
  ],
  link: [
    { rel: 'canonical', href: () => SITE_URL + LOCALE_PATH[locale.value] },
    ...LOCALES.map((l) => ({ rel: 'alternate', hreflang: HTML_LANG[l], href: SITE_URL + LOCALE_PATH[l] })),
    { rel: 'alternate', hreflang: 'x-default', href: SITE_URL + '/' },
  ],
})

// Visitante que já escolheu EN/ES volta para o idioma salvo ao abrir a raiz.
onMounted(() => {
  if (locale.value !== 'pt' || route.hash) return
  let saved: string | null = null
  try { saved = localStorage.getItem('gl-lang') } catch { /* armazenamento indisponível */ }
  if (saved === 'en' || saved === 'es') router.replace(LOCALE_PATH[saved])
})
</script>

<template>
  <AppNav />
  <main id="top">
    <HeroSection />
    <ShowcaseSection />
    <LogoMarquee />
    <PillarsSection />
    <SolutionsSection />
    <ApproachSection />
    <SpotlightSection />
    <AboutSection />
    <PartnersSection />
    <FaqSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
