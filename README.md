# Golden Learn — site institucional (redesign)

Site estático (HTML + CSS + JS puro, sem build) com tradução **PT / EN / ES**.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000  (ou ?lang=en / ?lang=es)
```

Para publicar, basta enviar a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, S3, cPanel, etc.).

## Estrutura

```
index.html              página única (conteúdo PT inline para SEO)
assets/css/style.css    design system (tokens no :root)
assets/js/i18n.js       TODOS os textos nos 3 idiomas + dados das 10 soluções
assets/js/main.js       troca de idioma, filtros, animações, formulário → WhatsApp
assets/img/
  logo.png / logo-white.png   logo original e versão branca (fundo escuro)
  products/                   mockups das soluções (recortados, WebP)
  partners/                   faixas de logos de parceiros, instituições e clientes
  unsplash/                   fotos do Unsplash (WebP, 1600px)
  original/                   imagens baixadas do site atual, sem alteração
```

## Editando textos e idiomas

- Cada elemento traduzível tem `data-i18n="chave"`; o texto está em `assets/js/i18n.js` nas seções `pt`, `en` e `es`.
- As soluções (nome, descrição, bullets, imagem, categoria) ficam no array `solutions` de cada idioma.
- O idioma é escolhido por `?lang=`, pela preferência salva no navegador ou pelo idioma do navegador (padrão: PT).

## Contato / formulário

O formulário não precisa de backend: monta a mensagem e abre o WhatsApp `+55 11 91553-8743`
(constante `WHATSAPP` em `assets/js/main.js`).

## Pendências para revisar antes de publicar

- **Links de Instagram e LinkedIn**: o site atual não expunha as URLs; usei `instagram.com/goldenlearn` e
  `linkedin.com/company/goldenlearn` como suposição — confirme em `index.html`.
- **FAQ**: respostas sobre prazos, integrações, setores e LGPD foram redigidas a partir do conteúdo do site; valide com o time.
- **Cards flutuantes do hero** (“Liderança de Operações 78%”, etc.) são ilustrações de interface, não dados reais.
- **Marquee de clientes**: nomes extraídos da arte “empresas parceiras” do site atual (exibidos como texto).

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
