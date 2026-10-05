import type { Directive } from 'vue'

// v-reveal: o SSR marca o elemento com data-reveal (oculto via CSS) e, no cliente,
// um IntersectionObserver troca para data-reveal="in" quando ele entra na tela.
// Usa atributo (e não classe) para não divergir da hidratação nem ser apagado em re-renders.

let observer: IntersectionObserver | null = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in')
            observer!.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
  }
  return observer
}

export const vReveal: Directive<HTMLElement> = {
  getSSRProps: () => ({ 'data-reveal': '' }),
  mounted(el) {
    if (el.getAttribute('data-reveal') === 'in') return
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-reveal', 'in')
      return
    }
    if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
