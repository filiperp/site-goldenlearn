# Golden Learn — site institucional

Vue 3 + Vite + [vite-ssg](https://github.com/antfu-collective/vite-ssg): cada idioma é pré-renderizado em HTML
estático e o Vue **hidrata** a página no navegador (sem recriar o DOM).

| Idioma | URL | Arquivo gerado |
|---|---|---|
| Português (padrão) | `/` | `dist/index.html` |
| English | `/en/` | `dist/en/index.html` |
| Español | `/es/` | `dist/es/index.html` |

Visual: tema escuro, títulos em **Bricolage Grotesque**, texto em **Geist** e rótulos em **Geist Mono**
(auto-hospedadas via Fontsource, com fallbacks de métricas ajustadas pelo `fontaine`). A abertura ocupa a tela
inteira e tem um globo de partículas em canvas (`HeroGlobe.vue`, carregado sob demanda).

## Comandos

Requer Node 20+.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # typecheck + site estático em dist/
npm run preview    # serve o dist/ localmente
DEBUG_HYDRATION=1 npm run build   # build com detalhes de divergência SSR/cliente no console
```

## Publicação

> Passo a passo completo (Pages, domínio, DNS, HTTPS e problemas comuns): [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md)

### GitHub Pages (automático)

O workflow `.github/workflows/deploy.yml` faz o build e publica a cada push no `main`
(ou manualmente em **Actions → Deploy no GitHub Pages → Run workflow**).

- Em **Settings → Pages**, a origem deve ser **GitHub Actions** (não “Deploy from a branch”).
- O caminho base e a URL do site vêm do próprio Pages (`actions/configure-pages`): com o domínio
  `goldenlearn.com.br` o site fica na raiz; sem domínio, em `https://<usuario>.github.io/<repo>/` — tudo
  (imagens, rotas, canonical, sitemap) se ajusta sozinho.
- O pós-build (`scripts/postbuild.mjs`) gera `sitemap.xml`, `robots.txt`, `404.html` e `.nojekyll`.

Para simular localmente um deploy em subcaminho:
`BASE_PATH=/site-goldenlearn/ VITE_SITE_URL=https://filiperp.github.io/site-goldenlearn npm run build`

### Outras hospedagens

Envie o conteúdo de `dist/` para qualquer hospedagem estática:

- **Apache / cPanel**: o `public/.htaccess` (copiado para `dist/`) força HTTPS no domínio sem www, ativa gzip
  e cache (1 ano para `assets/`, 30 dias para imagens, HTML sempre revalidado).
- **Netlify / Cloudflare Pages**: o `public/_headers` aplica as mesmas regras de cache.

## Estrutura

```
index.html                     shell HTML (favicon, manifest)
src/main.ts                    rotas por idioma, i18n, hidratação e diretiva v-reveal
src/i18n.ts                    i18n próprio (~40 linhas): carrega só o JSON do idioma da página
src/locales/{pt,en,es}.json    TODOS os textos do site (inclui alt de imagens e FAQ)
src/data/site.ts               contato, redes, navegação, clientes e metadados das soluções
src/pages/HomePage.vue         monta as seções
src/composables/useSeo.ts      title, description, canonical, hreflang, Open Graph/Twitter e JSON-LD
src/composables/useSiteState.ts  estado compartilhado (filtro de soluções, mensagem do formulário)
src/composables/reveal.ts      animação de entrada ao rolar (v-reveal)
src/components/sections/       uma seção por componente (Hero, Solutions, Faq, Contact…)
src/components/ui/             peças reutilizáveis (AppNav, AppFooter, SectionHeader, ResponsiveImg, HeroGlobe…)
src/styles/main.css            design system: cores, tipografia e escala de espaçamento em :root
public/img/brand/              logo, ícones, imagem Open Graph (og-image.jpg)
public/img/unsplash|products/  fotos e mockups em WebP com variantes responsivas (-640/-1024, -500)
design-source/                 imagens originais do site antigo (fora do build)
```

## Editando conteúdo

- **Textos:** altere a mesma chave em `src/locales/pt.json`, `en.json` e `es.json`.
- **Soluções:** textos em `solutionItems` (JSONs); categoria e imagem em `SOLUTIONS` (`src/data/site.ts`).
- **Espaçamentos:** ajuste `--section-y`, `--block-gap`, `--grid-gap`, `--split-gap` e `--card-pad` no topo do CSS.
- **Novas fotos:** salve `nome.webp` (1600px) e as variantes `nome-640.webp` e `nome-1024.webp` em
  `public/img/unsplash/` e use `<ResponsiveImg folder="unsplash" name="nome" … />`.

## SEO

- HTML estático por idioma com `lang`, `title`, `description`, `canonical` e `hreflang` (+ `x-default`).
- Open Graph / Twitter Card com imagem 1200×630.
- JSON-LD: `Organization` (contato + catálogo das 10 soluções), `WebSite`, `WebPage` e `FAQPage`.
- `sitemap.xml` com alternates de idioma, `robots.txt`, `site.webmanifest`.
- Hierarquia de títulos (1 `h1`, `h2` por seção, `h3` nos itens), `alt` em todas as imagens, seções com `aria-labelledby`.

## Performance (Lighthouse mobile, 4G simulado, servidor com gzip/cache)

Performance **97** · Acessibilidade **100** · Boas práticas **100** · SEO **100**
— LCP 2,5 s · CLS 0,001 · TBT 0 ms

O que contribui: hidratação real (`hydration: true`), i18n por idioma em chunk separado (sem `vue-i18n`),
globo em chunk assíncrono iniciado no tempo ocioso, imagens com `srcset`/`sizes` e `loading="lazy"`,
preload das fontes do título/texto, fallbacks de fonte sem layout shift e título do hero sem animação de opacidade.

## Pendências para revisar antes de publicar

- **Instagram e LinkedIn:** as URLs em `src/data/site.ts` são suposições (o site antigo não as expunha).
- **FAQ:** respostas sobre prazos, integrações, setores e LGPD foram redigidas a partir do site antigo; valide com o time.
- **Cards da vitrine** (ex.: “78%”) são ilustração de interface, não dados reais.

## Créditos das fotos (Unsplash — licença Unsplash)

| Arquivo | Foto |
|---|---|
| hero | https://images.unsplash.com/photo-1522071820081-009f0129c71c |
| team | https://images.unsplash.com/photo-1551434678-e076c223a692 |
| careers | https://images.unsplash.com/photo-1573496359142-b8d87734a5a2 |
| data | https://images.unsplash.com/photo-1551288049-bebda4e38f71 |
| vr | https://images.unsplash.com/photo-1593508512255-86ab42a8e620 |
| learning | https://images.unsplash.com/photo-1524178232363-1fb2b075b655 |
| building | https://images.unsplash.com/photo-1486406146926-c627a92ad1ab |
| workshop | https://images.unsplash.com/photo-1517245386807-bb43f82c33c4 |
| engineer | https://images.unsplash.com/photo-1581091226825-a6a2a5aee158 |
