<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSiteState } from '../composables/useSiteState'
import { GOOGLE_PARTNER_URL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP, WHATSAPP_LABEL, type Category } from '../data/site'

const { t } = useI18n()
const { filter } = useSiteState()
const year = new Date().getFullYear()

const fronts: { key: string; cat: Category }[] = [
  { key: 'pillars.p1Title', cat: 'people' },
  { key: 'pillars.p2Title', cat: 'learning' },
  { key: 'pillars.p3Title', cat: 'data' },
]
const company = [
  { href: '#sobre', key: 'nav.about' },
  { href: '#como-trabalhamos', key: 'nav.approach' },
  { href: '#parceiros', key: 'nav.partners' },
  { href: '#faq', key: 'nav.faq' },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <img src="/img/logo-white.png" alt="Golden Learn" width="320" height="132" loading="lazy">
          <p class="tagline">{{ t('footer.tagline') }}</p>
        </div>
        <div>
          <h5>{{ t('footer.solutions') }}</h5>
          <ul>
            <li v-for="f in fronts" :key="f.cat"><a href="#solucoes" @click="filter = f.cat">{{ t(f.key) }}</a></li>
          </ul>
        </div>
        <div>
          <h5>{{ t('footer.company') }}</h5>
          <ul>
            <li v-for="c in company" :key="c.href"><a :href="c.href">{{ t(c.key) }}</a></li>
          </ul>
        </div>
        <div>
          <h5>{{ t('footer.contact') }}</h5>
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
        <span>© {{ year }} Grupo Golden Learn. {{ t('footer.rights') }}</span>
        <span>{{ t('footer.made') }}</span>
      </div>
    </div>
  </footer>
  <a class="wa-float" :href="`https://wa.me/${WHATSAPP}`" target="_blank" rel="noopener" aria-label="WhatsApp">
    <AppIcon name="whatsapp" />
  </a>
</template>
