import { ref } from 'vue'
import type { Category } from '../data/site'

// Estado compartilhado entre seções (filtro de soluções e mensagem pré-preenchida do formulário).
const filter = ref<Category | 'all'>('all')
const contactMessage = ref('')

export function useSiteState() {
  return { filter, contactMessage }
}
