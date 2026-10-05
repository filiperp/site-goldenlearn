<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSiteState } from '../composables/useSiteState'
import { SOLUTIONS, type Category } from '../data/site'

interface SolutionText { id: string; name: string; kicker: string; text: string; feats: string[] }

const { t, tm, rt } = useI18n()
const { filter, contactMessage } = useSiteState()

const tabs: (Category | 'all')[] = ['all', 'people', 'learning', 'data']

const solutions = computed(() => {
  const texts = tm('solutionItems') as unknown as SolutionText[]
  return SOLUTIONS.map((meta) => {
    const s = texts.find((x) => rt(x.id as never) === meta.id)!
    return {
      ...meta,
      name: rt(s.name as never),
      kicker: rt(s.kicker as never),
      text: rt(s.text as never),
      feats: s.feats.map((f) => rt(f as never)),
    }
  })
})

function interest(name: string) {
  if (!contactMessage.value) contactMessage.value = `${name} — `
}
</script>

<template>
  <section id="solucoes" class="section section-cream">
    <div class="container">
      <div class="solutions-top">
        <div v-reveal class="section-head">
          <span class="eyebrow">{{ t('solutions.eyebrow') }}</span>
          <h2 class="h2">{{ t('solutions.title') }}</h2>
          <p class="lead">{{ t('solutions.sub') }}</p>
        </div>
        <div v-reveal class="tabs" role="tablist">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            role="tab"
            :aria-selected="filter === tab"
            @click="filter = tab"
          >{{ t(`solutions.${tab}`) }}</button>
        </div>
      </div>

      <div class="solutions-grid">
        <article
          v-for="s in solutions"
          v-show="filter === 'all' || filter === s.cat"
          :id="`sol-${s.id}`"
          :key="s.id"
          class="sol"
        >
          <div class="sol-media">
            <span class="tag">{{ t(`solutions.${s.cat}`) }}</span>
            <img :src="`/img/products/${s.img}.webp`" :alt="s.name" loading="lazy" width="1000" height="584">
          </div>
          <div class="sol-body">
            <span class="kicker">{{ s.kicker }}</span>
            <h3 class="h3">{{ s.name }}</h3>
            <p>{{ s.text }}</p>
            <ul class="sol-feats">
              <li v-for="f in s.feats" :key="f">{{ f }}</li>
            </ul>
            <a class="sol-link" href="#contato" @click="interest(s.name)">{{ t('solutions.cta') }}<AppIcon name="arrow" /></a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
