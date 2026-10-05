import type { Directive } from 'vue'

let observer: IntersectionObserver | null = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer!.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
  }
  return observer
}

/** Adiciona a classe `reveal` e a anima quando o elemento entra na tela. */
export const vReveal: Directive<HTMLElement> = {
  getSSRProps: () => ({ class: 'reveal' }),
  mounted(el) {
    el.classList.add('reveal')
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
