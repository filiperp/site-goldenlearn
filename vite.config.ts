import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // gera dist/index.html, dist/en/index.html e dist/es/index.html
    dirStyle: 'nested',
    formatting: 'minify',
  },
})
