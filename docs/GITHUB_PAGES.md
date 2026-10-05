# Como configurar o GitHub Pages — site Golden Learn

Guia passo a passo para publicar este site no **GitHub Pages** usando o workflow
`.github/workflows/deploy.yml`. Os valores abaixo já são os deste projeto.

| Item | Valor |
|---|---|
| Repositório | `filiperp/site-goldenlearn` |
| Branch publicado | `main` |
| Domínio | `goldenlearn.com.br` (o `www` redireciona para ele) |
| Workflow | **Deploy no GitHub Pages** (`.github/workflows/deploy.yml`) |
| URL sem domínio | `https://filiperp.github.io/site-goldenlearn/` |

> **Situação atual (out/2026):** a origem do Pages já foi trocada para **GitHub Actions** e o domínio
> `goldenlearn.com.br` já está configurado com HTTPS. Falta apenas o código com o workflow chegar ao `main`
> (passo 4). Os demais passos servem para conferir ou refazer a configuração.

---

## 1. Pré-requisitos

- Repositório **público** (Pages em repositório privado exige plano pago do GitHub).
- Permissão de **administrador** no repositório (para acessar *Settings*).
- O arquivo `.github/workflows/deploy.yml` presente no branch `main`.

## 2. Ativar o Pages com GitHub Actions

1. Abra o repositório no GitHub → **Settings** → **Pages** (menu lateral, seção *Code and automation*).
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
   - ⚠️ Não use “Deploy from a branch”: nesse modo o GitHub publica o código-fonte sem build
     e o site aparece **em branco**.
3. Não é preciso escolher nenhum workflow sugerido — o nosso já está no repositório.

Pela linha de comando (opcional, com o `gh` autenticado):

```bash
gh api -X PUT repos/filiperp/site-goldenlearn/pages -f build_type=workflow
```

## 3. Domínio próprio (goldenlearn.com.br)

### 3.1. Configurar o DNS (no registro do domínio — ex.: Registro.br, Cloudflare)

Crie os registros abaixo e **remova** quaisquer registros `A`/`AAAA`/`CNAME` antigos do domínio
(por exemplo, os que apontavam para o servidor WordPress).

| Tipo | Nome / Host | Valor |
|---|---|---|
| A | `@` (raiz) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `filiperp.github.io` |

- Os registros **AAAA** (IPv6) são opcionais, mas recomendados.
- Para o `www`, o GitHub recomenda **CNAME → `filiperp.github.io`**. Hoje o `www` usa os mesmos 4 registros
  **A** da raiz, o que também funciona.

> Se usar **Cloudflare**, deixe os registros como **DNS only** (nuvem cinza) até o certificado HTTPS do
> GitHub ser emitido; depois pode ativar o proxy, com SSL em modo *Full*.

Para conferir a propagação (pode levar de minutos a 24 h):

```bash
dig +short goldenlearn.com.br        # deve listar os 4 IPs 185.199.10x.153
dig +short www.goldenlearn.com.br    # deve mostrar filiperp.github.io e os mesmos IPs
```

### 3.2. Informar o domínio no GitHub

1. **Settings → Pages → Custom domain**: digite `goldenlearn.com.br` e clique em **Save**.
2. Aguarde a verificação de DNS (“DNS check successful”).
3. Marque **Enforce HTTPS** assim que a opção ficar disponível (o certificado pode levar até ~1 h).

> Com deploy via GitHub Actions **não é necessário** um arquivo `CNAME` no repositório — o domínio fica
> salvo nas configurações do Pages.

### 3.3. (Recomendado) Verificar o domínio na sua conta

Evita que outra conta do GitHub “sequestre” o domínio:

1. Clique na sua foto → **Settings** (da conta, não do repositório) → **Pages** → **Add a domain**.
2. Digite `goldenlearn.com.br`; o GitHub mostra um registro **TXT** (`_github-pages-challenge-filiperp...`).
3. Crie esse TXT no DNS, aguarde a propagação e clique em **Verify**.

## 4. Publicar o site

O deploy roda automaticamente a cada **push no `main`**:

```bash
git checkout main
git pull
git merge vue-site      # traz as mudanças do site e o workflow
git push
```

Também é possível rodar manualmente: **Actions → Deploy no GitHub Pages → Run workflow**.

Acompanhe em **Actions**: o job **Build** (≈1 min) e depois **Deploy** (≈30 s). Ao final, o link do site
aparece no resumo da execução e em **Settings → Pages** (“Your site is live at…”).

### O que o workflow faz

1. Instala Node 22 e as dependências (`npm ci`).
2. Lê do Pages o caminho base e a URL do site (`actions/configure-pages`):
   - com domínio próprio → base `/` e URL `https://goldenlearn.com.br`;
   - sem domínio → base `/site-goldenlearn/` e URL `https://filiperp.github.io/site-goldenlearn`.
3. Roda `npm run build` (typecheck + páginas estáticas em PT, EN e ES + sitemap/robots/404).
4. Publica a pasta `dist/` no ambiente **github-pages**.

## 5. Branch e permissões (conferência)

- **Branch padrão:** em **Settings → General → Default branch**, prefira `main`
  (assim o botão *Run workflow* aparece direto em *Actions*).
- **Ambiente `github-pages`:** em **Settings → Environments → github-pages → Deployment branches**,
  o `main` deve estar permitido (já está).
- **Permissões do workflow:** já declaradas no próprio arquivo (`pages: write`, `id-token: write`);
  não é preciso mudar nada em *Settings → Actions*.

## 6. Voltar para uma versão anterior

1. **Actions → Deploy no GitHub Pages** → abra uma execução antiga que estava boa.
2. Clique em **Re-run all jobs** — o site volta àquela versão.

Ou desfaça o commit no `main` (`git revert <commit>` + `git push`), o que dispara um novo deploy.

## 7. Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Página **em branco** | Origem do Pages em “Deploy from a branch” | Passo 2: mudar para **GitHub Actions** e rodar o workflow |
| Workflow falha no **Deploy** com erro de ambiente/branch | Branch não permitido no ambiente `github-pages` | Passo 5: permitir `main` em *Deployment branches* |
| Workflow falha no **Build** | Erro de TypeScript ou dependência | Abra o log do passo *Build*; rode `npm run build` localmente para reproduzir |
| Imagens/CSS com **404** sem domínio próprio | Build sem o caminho base | Use o workflow (ele define `BASE_PATH`); localmente: `BASE_PATH=/site-goldenlearn/ npm run build` |
| “**DNS check unsuccessful**” | DNS ainda propagando ou registros errados | Conferir a tabela do passo 3.1 e esperar a propagação |
| **Enforce HTTPS** desabilitado | Certificado ainda sendo emitido | Aguardar até ~1 h; remover e salvar o domínio de novo se passar de 24 h |
| Site antigo (WordPress) ainda aparece | Cache de DNS/navegador | Testar em aba anônima ou com `dig`; aguardar o TTL do DNS |
| Domínio some das configurações | Alguém removeu em *Settings → Pages* | Informar de novo (passo 3.2) |

## 8. Publicar sem domínio próprio (opcional)

1. **Settings → Pages → Custom domain**: clique em **Remove**.
2. Rode o workflow de novo (*Run workflow*).
3. O site passa a ficar em `https://filiperp.github.io/site-goldenlearn/` — o build ajusta sozinho
   imagens, rotas, canonical e sitemap para esse endereço.

---

Referências oficiais: [Configurar a origem de publicação](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) ·
[Domínio personalizado](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) ·
[Verificar domínio](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
