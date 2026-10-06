import { onMounted, ref } from 'vue'

// Tema: claro é o padrão. A escolha do visitante fica em localStorage ('gl-theme')
// e é aplicada antes da primeira pintura por um script inline no index.html.

export type Theme = 'light' | 'dark'

const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#061f2c' }
const theme = ref<Theme>('light')

function apply(t: Theme) {
  const root = document.documentElement
  if (t === 'dark') root.setAttribute('data-theme', 'dark')
  else root.removeAttribute('data-theme')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[t])
}

export function useTheme() {
  onMounted(() => {
    theme.value = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply(theme.value)
    try { localStorage.setItem('gl-theme', theme.value) } catch { /* armazenamento indisponível */ }
  }

  return { theme, toggle }
}
