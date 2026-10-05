<script setup lang="ts">
import { useI18n } from '../../i18n'
import AppIcon from './AppIcon.vue'
import { useSiteState } from '../../composables/useSiteState'
import { asset, GOOGLE_PARTNER_URL, INSTAGRAM_URL, LINKEDIN_URL, NAV_LINKS, WHATSAPP, WHATSAPP_LABEL, type Category } from '../../data/site'

const { t } = useI18n()
const { filter } = useSiteState()
const year = new Date().getFullYear()

const fronts: { key: string; cat: Category }[] = [
  { key: 'pillars.p1Title', cat: 'people' },
  { key: 'pillars.p2Title', cat: 'learning' },
  { key: 'pillars.p3Title', cat: 'data' },
]
const company = NAV_LINKS.filter((l) => l.href !== '#solucoes')
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <img :src="asset('img/brand/logo-white.png')" alt="Golden Learn" width="320" height="132" loading="lazy" decoding="async">
          <p class="tagline">{{ t('footer.tagline') }}</p>
        </div>
        <nav :aria-label="t('footer.solutions')">
          <p class="footer-title">{{ t('footer.solutions') }}</p>
          <ul>
            <li v-for="f in fronts" :key="f.cat"><a href="#solucoes" @click="filter = f.cat">{{ t(f.key) }}</a></li>
          </ul>
        </nav>
        <nav :aria-label="t('footer.company')">
          <p class="footer-title">{{ t('footer.company') }}</p>
          <ul>
            <li v-for="c in company" :key="c.href"><a :href="c.href">{{ t(c.key) }}</a></li>
          </ul>
        </nav>
        <div>
          <p class="footer-title">{{ t('footer.contact') }}</p>
          <ul>
            <li><a :href="`https://wa.me/${WHATSAPP}`" target="_blank" rel="noopener">{{ WHATSAPP_LABEL }}</a></li>
            <li><a :href="GOOGLE_PARTNER_URL" target="_blank" rel="noopener">Google Cloud Partner</a></li>
          </ul>
          <div class="socials">
            <a :href="LINKEDIN_URL" target="_blank" rel="noopener" aria-label="LinkedIn"><AppIcon name="linkedin" /></a>
            <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" aria-label="Instagram"><AppIcon name="instagram" /></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <small>© {{ year }} Grupo Golden Learn. {{ t('footer.rights') }}</small>
        <small>{{ t('footer.made') }}</small>
      </div>
      <p class="footer-word" aria-hidden="true">Golden Learn</p>
    </div>
  </footer>
  <a class="wa-float" :href="`https://wa.me/${WHATSAPP}`" target="_blank" rel="noopener" :aria-label="`WhatsApp ${WHATSAPP_LABEL}`">
    <AppIcon name="whatsapp" />
  </a>
</template>
