<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppNav from '../components/ui/AppNav.vue'
import AppFooter from '../components/ui/AppFooter.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ShowcaseSection from '../components/sections/ShowcaseSection.vue'
import LogoMarquee from '../components/sections/LogoMarquee.vue'
import PillarsSection from '../components/sections/PillarsSection.vue'
import SolutionsSection from '../components/sections/SolutionsSection.vue'
import ApproachSection from '../components/sections/ApproachSection.vue'
import SpotlightSection from '../components/sections/SpotlightSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import PartnersSection from '../components/sections/PartnersSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { useSeo } from '../composables/useSeo'
import { useI18n } from '../i18n'
import { LOCALE_PATH, type Locale } from '../data/site'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const locale = computed(() => (route.meta.locale as Locale) ?? 'pt')

useSeo(locale)

// Visitante que já escolheu EN/ES volta para o idioma salvo ao abrir a raiz.
onMounted(() => {
  if (locale.value !== 'pt' || route.hash) return
  let saved: string | null = null
  try { saved = localStorage.getItem('gl-lang') } catch { /* armazenamento indisponível */ }
  if (saved === 'en' || saved === 'es') router.replace(LOCALE_PATH[saved])
})
</script>

<template>
  <a class="skip-link" href="#conteudo">{{ t('nav.skip') }}</a>
  <AppNav />
  <main id="top">
    <HeroSection />
    <div id="conteudo">
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
    </div>
  </main>
  <AppFooter />
</template>
