import { computed, type Ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from '../i18n'
import {
  FAQ_COUNT, GOOGLE_PARTNER_URL, HTML_LANG, INSTAGRAM_URL, LINKEDIN_URL, LOCALE_PATH, LOCALES,
  OG_LOCALE, ORG_LEGAL_NAME, PHONE_E164, SITE_NAME, SITE_URL, type Locale, type SolutionText,
} from '../data/site'
import bricolage from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url'
import geist from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'

const OG_IMAGE = `${SITE_URL}/img/brand/og-image.jpg`

/** Meta tags, hreflang, Open Graph/Twitter e dados estruturados (JSON-LD) da página. */
export function useSeo(locale: Ref<Locale>) {
  const { t, tm } = useI18n()
  const url = computed(() => SITE_URL + LOCALE_PATH[locale.value])

  const jsonLd = computed(() => {
    const orgId = `${SITE_URL}/#organization`
    const solutions = tm<SolutionText[]>('solutionItems') ?? []
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': orgId,
          name: SITE_NAME,
          legalName: ORG_LEGAL_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/img/brand/icon-512.png`,
          image: OG_IMAGE,
          description: t('meta.description'),
          slogan: t('footer.tagline'),
          sameAs: [LINKEDIN_URL, INSTAGRAM_URL, GOOGLE_PARTNER_URL],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: PHONE_E164,
            contactType: 'sales',
            areaServed: 'BR',
            availableLanguage: ['Portuguese', 'English', 'Spanish'],
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: t('solutions.eyebrow'),
            itemListElement: solutions.map((s) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: s.name, description: s.text, provider: { '@id': orgId } },
            })),
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { '@id': orgId },
          inLanguage: LOCALES.map((l) => HTML_LANG[l]),
        },
        {
          '@type': 'WebPage',
          '@id': `${url.value}#webpage`,
          url: url.value,
          name: t('meta.title'),
          description: t('meta.description'),
          inLanguage: HTML_LANG[locale.value],
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': orgId },
          primaryImageOfPage: OG_IMAGE,
        },
        {
          '@type': 'FAQPage',
          '@id': `${url.value}#faq`,
          inLanguage: HTML_LANG[locale.value],
          mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
            '@type': 'Question',
            name: t(`faq.q${i + 1}`),
            acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${i + 1}`) },
          })),
        },
      ],
    })
  })

  useHead({
    htmlAttrs: { lang: () => HTML_LANG[locale.value] },
    title: () => t('meta.title'),
    meta: [
      { name: 'description', content: () => t('meta.description') },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: () => t('meta.title') },
      { property: 'og:description', content: () => t('meta.description') },
      { property: 'og:url', content: () => url.value },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: () => t('meta.title') },
      { property: 'og:locale', content: () => OG_LOCALE[locale.value] },
      ...LOCALES.filter((l) => l !== locale.value).map((l) => ({ property: 'og:locale:alternate', content: OG_LOCALE[l] })),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => t('meta.title') },
      { name: 'twitter:description', content: () => t('meta.description') },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    link: [
      { rel: 'canonical', href: () => url.value },
      ...LOCALES.map((l) => ({ rel: 'alternate', hreflang: HTML_LANG[l], href: SITE_URL + LOCALE_PATH[l] })),
      { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/` },
      { rel: 'preload', as: 'font', type: 'font/woff2', href: bricolage, crossorigin: '' },
      { rel: 'preload', as: 'font', type: 'font/woff2', href: geist, crossorigin: '' },
    ],
    script: [{ type: 'application/ld+json', innerHTML: () => jsonLd.value }],
  })
}
