import { ViteSSG } from 'vite-ssg'
import type { RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import { createI18n } from './i18n'
import { LOCALE_PATH, LOCALES, type Locale } from './data/site'
import { vReveal } from './composables/reveal'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/geist-mono/wght.css'
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
    base: import.meta.env.BASE_URL,
    scrollBehavior(to) {
      return to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }
    },
  },
  ({ app, router }) => {
    const i18n = createI18n()
    app.use(i18n)
    app.directive('reveal', vReveal)
    router.beforeEach(async (to) => {
      await i18n.setLocale((to.meta.locale as Locale) ?? 'pt')
    })
  },
  // Hidrata o HTML pré-renderizado em vez de recriar a página inteira no cliente.
  { hydration: true },
)
