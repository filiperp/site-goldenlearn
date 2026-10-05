<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { LOCALE_PATH, LOCALES, type Locale } from '../data/site'

const { t, locale } = useI18n()
const scrolled = ref(false)
const open = ref(false)

const links = [
  { href: '#solucoes', key: 'nav.solutions' },
  { href: '#como-trabalhamos', key: 'nav.approach' },
  { href: '#sobre', key: 'nav.about' },
  { href: '#parceiros', key: 'nav.partners' },
  { href: '#faq', key: 'nav.faq' },
]

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function rememberLocale(l: Locale) {
  try { localStorage.setItem('gl-lang', l) } catch { /* armazenamento indisponível */ }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled: scrolled || open }">
    <div class="container nav-inner">
      <a class="nav-logo" href="#top" aria-label="Golden Learn">
        <img src="/img/logo-white.png" alt="Golden Learn" width="320" height="132">
      </a>
      <nav :aria-label="t('nav.solutions')">
        <ul class="nav-links">
          <li v-for="l in links" :key="l.href"><a :href="l.href">{{ t(l.key) }}</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <div class="lang" role="group" aria-label="Idioma / Language / Idioma">
          <RouterLink
            v-for="l in LOCALES"
            :key="l"
            :to="LOCALE_PATH[l]"
            :aria-current="locale === l ? 'true' : undefined"
            :hreflang="l"
            @click="rememberLocale(l)"
          >{{ l.toUpperCase() }}</RouterLink>
        </div>
        <a class="btn btn-primary" href="#contato">{{ t('nav.cta') }}</a>
        <button class="menu-toggle" type="button" aria-label="Menu" :aria-expanded="open" @click="open = !open">
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" :class="{ open }">
    <a v-for="l in links" :key="l.href" :href="l.href" @click="open = false">{{ t(l.key) }}</a>
    <a class="btn btn-primary" href="#contato" @click="open = false">{{ t('nav.cta') }}</a>
  </div>
</template>
