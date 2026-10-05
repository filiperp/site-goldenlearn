# Golden Learn — site institucional

Vue 3 + Vite + [vite-ssg](https://github.com/antfu-collective/vite-ssg): o build pré-renderiza cada idioma
em HTML estático (bom para SEO) e o Vue hidrata a página no navegador.

| Idioma | URL | Arquivo gerado |
|---|---|---|
| Português (padrão) | `/` | `dist/index.html` |
| English | `/en/` | `dist/en/index.html` |
| Español | `/es/` | `dist/es/index.html` |

## Comandos

Requer Node 20+.

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5173
npm run build     # typecheck + gera o site estático em dist/
npm run preview   # serve o dist/ localmente
```

Para publicar, envie o conteúdo de `dist/` para qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages,
S3, cPanel...). Nenhum servidor Node é necessário.

## Estrutura

```
index.html                  shell HTML (fontes, favicon)
src/main.ts                 rotas por idioma, vue-i18n e diretiva v-reveal
src/pages/HomePage.vue      monta as seções + <head> (title, description, canonical, hreflang)
src/components/             uma seção por componente (Hero, Solutions, Faq, Contact...)
src/locales/{pt,en,es}.json TODOS os textos do site
src/data/site.ts            WhatsApp, redes sociais, clientes e metadados das soluções
src/styles/main.css         design system (tokens no :root)
public/img/                 imagens (originais do site antigo, mockups, Unsplash)
public/sitemap.xml          sitemap com as 3 versões de idioma
```

## Editando conteúdo

- **Textos:** altere a mesma chave em `src/locales/pt.json`, `en.json` e `es.json`.
- **Soluções:** textos em `solutionItems` (nos JSONs); categoria e imagem em `SOLUTIONS` (`src/data/site.ts`).
- **Contato/redes:** constantes em `src/data/site.ts`. O formulário abre o WhatsApp com a mensagem — não há backend.
- **Novo idioma:** adicione o JSON, inclua o código em `LOCALES`, `HTML_LANG` e `LOCALE_PATH` e registre as
  mensagens em `src/main.ts`.

## Pendências para revisar antes de publicar

- **Instagram e LinkedIn:** as URLs em `src/data/site.ts` são suposições (o site antigo não as expunha).
- **FAQ:** respostas sobre prazos, integrações, setores e LGPD foram redigidas a partir do site antigo; valide com o time.
- **Cards flutuantes do hero** (ex.: “78%”) são ilustração de interface, não dados reais.

## Créditos das fotos (Unsplash — licença Unsplash)

| Arquivo | Foto |
|---|---|
| hero.webp | https://images.unsplash.com/photo-1522071820081-009f0129c71c |
| team.webp | https://images.unsplash.com/photo-1551434678-e076c223a692 |
| meeting.webp | https://images.unsplash.com/photo-1531482615713-2afd69097998 |
| data.webp | https://images.unsplash.com/photo-1551288049-bebda4e38f71 |
| vr.webp | https://images.unsplash.com/photo-1593508512255-86ab42a8e620 |
| learning.webp | https://images.unsplash.com/photo-1524178232363-1fb2b075b655 |
| building.webp | https://images.unsplash.com/photo-1486406146926-c627a92ad1ab |
| workshop.webp | https://images.unsplash.com/photo-1517245386807-bb43f82c33c4 |
| engineer.webp | https://images.unsplash.com/photo-1581091226825-a6a2a5aee158 |
