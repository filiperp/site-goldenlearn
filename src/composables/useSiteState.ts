import { nextTick, ref } from 'vue'
import type { Category } from '../data/site'

// Estado compartilhado entre seções (filtro/destaque de soluções e mensagem do formulário).
const filter = ref<Category | 'all'>('all')
const highlight = ref<string | null>(null)
const contactMessage = ref('')
let highlightTimer: ReturnType<typeof setTimeout> | undefined

export function useSiteState() {
  /** Mostra todas as soluções, rola até a escolhida e a destaca por alguns segundos. */
  async function focusSolution(id: string) {
    filter.value = 'all'
    highlight.value = id
    await nextTick()
    document.getElementById(`sol-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    clearTimeout(highlightTimer)
    highlightTimer = setTimeout(() => (highlight.value = null), 3200)
  }

  return { filter, highlight, contactMessage, focusSolution }
}
