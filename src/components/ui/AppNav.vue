<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../../i18n'
import AppIcon from './AppIcon.vue'
import { asset, HTML_LANG, LOCALE_PATH, LOCALES, NAV_LINKS, type Locale } from '../../data/site'

const { t, locale } = useI18n()
const scrolled = ref(false)
const open = ref(false)

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
      <a class="nav-logo" href="#top" aria-label="Golden Learn — início">
        <img :src="asset('img/brand/logo-white.png')" alt="Golden Learn" width="320" height="132" fetchpriority="high">
      </a>
      <nav :aria-label="t('nav.label')">
        <ul class="nav-links">
          <li v-for="l in NAV_LINKS" :key="l.href"><a :href="l.href">{{ t(l.key) }}</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <div class="lang" role="group" :aria-label="t('nav.language')">
          <RouterLink
            v-for="l in LOCALES"
            :key="l"
            :to="LOCALE_PATH[l]"
            :aria-current="locale === l ? 'true' : undefined"
            :hreflang="HTML_LANG[l]"
            :lang="HTML_LANG[l]"
            @click="rememberLocale(l)"
          >{{ l.toUpperCase() }}</RouterLink>
        </div>
        <a class="btn btn-primary" href="#contato">{{ t('nav.cta') }}</a>
        <button class="menu-toggle" type="button" :aria-label="t('nav.menu')" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open">
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
  </header>
  <nav id="mobile-menu" class="mobile-menu" :class="{ open }" :aria-label="t('nav.label')" :inert="!open || undefined">
    <a v-for="l in NAV_LINKS" :key="l.href" :href="l.href" @click="open = false">{{ t(l.key) }}</a>
    <a class="btn btn-primary" href="#contato" @click="open = false">{{ t('nav.cta') }}</a>
  </nav>
</template>
