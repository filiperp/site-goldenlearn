import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { FontaineTransform } from 'fontaine'

export default defineConfig({
  plugins: [
    vue(),
    // Gera fontes de fallback com métricas ajustadas (size-adjust/ascent-override):
    // o texto não "pula" quando Bricolage/Geist terminam de carregar.
    FontaineTransform.vite({
      fallbacks: ['Arial', 'Helvetica Neue', 'Roboto'],
      resolvePath: (id) => new URL(id.startsWith('/') ? `.${id}` : id, new URL('./', import.meta.url)),
    }),
  ],
  define: {
    // DEBUG_HYDRATION=1 npm run build → mostra no console detalhes de divergência SSR/cliente
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(!!process.env.DEBUG_HYDRATION),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssgOptions: {
    // gera dist/index.html, dist/en/index.html e dist/es/index.html
    dirStyle: 'nested',
    formatting: 'minify',
    // Desativado: o CSS crítico do beasties gerava layout shift e travava o Chrome em testes.
    // O CSS externo (~7 KB gzip, cache de 1 ano) teve melhor resultado no Lighthouse.
    beastiesOptions: false,
  },
})
