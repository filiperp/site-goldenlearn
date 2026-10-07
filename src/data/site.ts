// Dados do site que não dependem de idioma.

/** URL pública (sem barra final). No GitHub Pages vem do workflow; padrão = domínio de produção. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://goldenlearn.com.br').replace(/\/+$/, '')

/** Caminho de um arquivo de public/ respeitando o base do Vite (ex.: /site-goldenlearn/ no Pages sem domínio). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\/+/, '')
export const SITE_NAME = 'Golden Learn'
export const ORG_LEGAL_NAME = 'Grupo Golden Learn'

export const WHATSAPP = '5511915538743'
export const WHATSAPP_LABEL = '+55 11 91553-8743'
export const PHONE_E164 = '+5511915538743'
export const GOOGLE_PARTNER_URL = 'https://cloud.google.com/find-a-partner/partner/golden-learn'
// TODO: confirmar as URLs oficiais das redes sociais
export const LINKEDIN_URL = 'https://www.linkedin.com/company/goldenlearn/'
export const INSTAGRAM_URL = 'https://www.instagram.com/goldenlearn/'

export const LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' }
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }
export const LOCALE_PATH: Record<Locale, string> = { pt: '/', en: '/en/', es: '/es/' }

export const NAV_LINKS = [
  { href: '#solucoes', key: 'nav.solutions' },
  { href: '#como-trabalhamos', key: 'nav.approach' },
  { href: '#sobre', key: 'nav.about' },
  { href: '#parceiros', key: 'nav.partners' },
  { href: '#faq', key: 'nav.faq' },
]

export const FAQ_COUNT = 5

export type Category = 'people' | 'learning' | 'data'

export interface SolutionText { id: string; name: string; kicker: string; text: string; feats: string[] }

// Metadados das soluções; textos ficam em src/locales/*.json (solutionItems, mesmo id).
export const SOLUTIONS: { id: string; cat: Category; img: string }[] = [
  { id: 'paths', cat: 'people', img: 'paths' },
  { id: 'comprova', cat: 'people', img: 'comprova' },
  { id: 'retention', cat: 'people', img: 'hr-retention-machine' },
  { id: 'strengths', cat: 'people', img: 'ponto-fortes' },
  { id: 'tdplanner', cat: 'learning', img: 't-e-d-planner' },
  { id: 'content', cat: 'learning', img: 'content-factory' },
  { id: 'immersive', cat: 'learning', img: 'imersinve-learn' },
  { id: 'datadriven', cat: 'data', img: 'data-driven' },
  { id: 'assets', cat: 'data', img: 'sistema-inteligente-de-gestao' },
  { id: 'ppt', cat: 'data', img: 'ppt' },
]

// Clientes (logos): ver src/data/clients.json, gerado por scripts/build-client-logos.py
// a partir de design-source/clients/clients.csv.
