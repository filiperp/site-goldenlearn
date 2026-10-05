// Pós-build: gera arquivos que dependem da URL pública do site (sitemap, robots)
// e os extras do GitHub Pages (404.html e .nojekyll).
// A URL vem de VITE_SITE_URL (definida no workflow) ou do domínio de produção.
import { copyFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const SITE_URL = (process.env.VITE_SITE_URL || 'https://goldenlearn.com.br').replace(/\/+$/, '')
const LOCALES = [
  { hreflang: 'pt-BR', path: '/' },
  { hreflang: 'en', path: '/en/' },
  { hreflang: 'es', path: '/es/' },
]
const today = new Date().toISOString().slice(0, 10)

const alternates = LOCALES.map(
  (l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE_URL}${l.path}"/>`,
).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(
  (l) => `  <url>
    <loc>${SITE_URL}${l.path}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>
  </url>`,
).join('\n')}
</urlset>
`

writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
// GitHub Pages: página para URLs inexistentes e desativa o processamento Jekyll
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'))
writeFileSync(join(DIST, '.nojekyll'), '')

console.log(`[postbuild] sitemap.xml, robots.txt, 404.html e .nojekyll gerados para ${SITE_URL}`)
