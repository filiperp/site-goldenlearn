import { inject, ref, shallowRef, type App, type InjectionKey, type Ref, type ShallowRef } from 'vue'
import type { Locale } from './data/site'
import type pt from './locales/pt.json'

// i18n mínimo: cada página carrega apenas o JSON do próprio idioma (code-splitting),
// evitando embutir os três idiomas e o runtime do vue-i18n no bundle.

export type Messages = typeof pt

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  pt: () => import('./locales/pt.json'),
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json'),
}

interface I18nState {
  locale: Ref<Locale>
  messages: ShallowRef<Messages | null>
}

const KEY: InjectionKey<I18nState> = Symbol('i18n')

export function createI18n() {
  const state: I18nState = { locale: ref<Locale>('pt'), messages: shallowRef(null) }
  return {
    install(app: App) {
      app.provide(KEY, state)
    },
    async setLocale(locale: Locale) {
      if (state.locale.value === locale && state.messages.value) return
      state.messages.value = (await loaders[locale]()).default
      state.locale.value = locale
    },
  }
}

function lookup(messages: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((obj, k) => (obj as Record<string, unknown> | undefined)?.[k], messages)
}

export function useI18n() {
  const state = inject(KEY)
  if (!state) throw new Error('i18n não instalado')
  /** Texto traduzido (strings podem conter HTML simples, ex.: <em>). */
  const t = (key: string): string => {
    const value = lookup(state.messages.value, key)
    return typeof value === 'string' ? value : key
  }
  /** Valor bruto (arrays/objetos) de uma chave. */
  const tm = <T>(key: string): T => lookup(state.messages.value, key) as T
  return { t, tm, locale: state.locale, messages: state.messages }
}
