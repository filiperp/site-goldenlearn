// Dados do site que não dependem de idioma.

export const SITE_URL = 'https://www.goldenlearn.com.br'

export const WHATSAPP = '5511915538743'
export const WHATSAPP_LABEL = '+55 11 91553-8743'
export const GOOGLE_PARTNER_URL = 'https://cloud.google.com/find-a-partner/partner/golden-learn'
// TODO: confirmar as URLs oficiais das redes sociais
export const LINKEDIN_URL = 'https://www.linkedin.com/company/goldenlearn/'
export const INSTAGRAM_URL = 'https://www.instagram.com/goldenlearn/'

export const LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' }
export const LOCALE_PATH: Record<Locale, string> = { pt: '/', en: '/en/', es: '/es/' }

export type Category = 'people' | 'learning' | 'data'

// Metadados das soluções; textos ficam em src/locales/*.json (solutionItems, mesma ordem/id).
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

export const CLIENTS = [
  'Pfizer', 'Nestlé', 'Santander', 'BASF', 'Komatsu', 'Garoto', 'Bombril', 'Adams',
  'Drogaria São Paulo', 'Drogarias Pacheco', 'PremieRpet', 'Manserv', 'Paquetá', 'Capodarte',
  'Cisper', 'GrandFood', 'Socil', 'Brascorp', 'Simak Rent', 'Minea', 'Dumond',
]
