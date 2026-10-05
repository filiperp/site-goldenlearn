import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import type { RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import { LOCALE_PATH, LOCALES, type Locale } from './data/site'
import { vReveal } from './composables/reveal'
import pt from './locales/pt.json'
import en from './locales/en.json'
import es from './locales/es.json'
import './styles/main.css'

const routes: RouteRecordRaw[] = LOCALES.map((locale) => ({
  path: LOCALE_PATH[locale],
  name: locale,
  component: HomePage,
  meta: { locale },
}))

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to) {
      return to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }
    },
  },
  ({ app, router }) => {
    const i18n = createI18n({
      legacy: false,
      locale: 'pt',
      fallbackLocale: 'pt',
      warnHtmlMessage: false,
      messages: { pt, en, es },
    })
    app.use(i18n)
    app.directive('reveal', vReveal)

    router.beforeEach((to) => {
      i18n.global.locale.value = (to.meta.locale as Locale) ?? 'pt'
    })
  },
)
