/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL pública do site, sem barra final (ex.: https://goldenlearn.com.br). Definida no build. */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
