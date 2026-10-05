<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../../i18n'
import AppIcon from '../ui/AppIcon.vue'
import ResponsiveImg from '../ui/ResponsiveImg.vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { useSiteState } from '../../composables/useSiteState'
import { SOLUTIONS, type Category, type SolutionText } from '../../data/site'

const { t, tm } = useI18n()
const { filter, highlight, contactMessage } = useSiteState()

const tabs: (Category | 'all')[] = ['all', 'people', 'learning', 'data']

const solutions = computed(() => {
  const texts = tm<SolutionText[]>('solutionItems') ?? []
  return SOLUTIONS.map((meta) => ({ ...meta, ...texts.find((x) => x.id === meta.id)! }))
})

function interest(name: string) {
  if (!contactMessage.value) contactMessage.value = `${name} — `
}
</script>

<template>
  <section id="solucoes" class="section section-alt" aria-labelledby="solucoes-title">
    <div class="container">
      <div class="solutions-top">
        <SectionHeader id="solucoes-title" :eyebrow="t('solutions.eyebrow')" :title="t('solutions.title')" :lead="t('solutions.sub')" />
        <div v-reveal class="tabs" role="tablist" :aria-label="t('solutions.eyebrow')">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            role="tab"
            :aria-selected="filter === tab"
            aria-controls="solutions-grid"
            @click="filter = tab"
          >{{ t(`solutions.${tab}`) }}</button>
        </div>
      </div>

      <div id="solutions-grid" class="solutions-grid">
        <article
          v-for="s in solutions"
          v-show="filter === 'all' || filter === s.cat"
          :id="`sol-${s.id}`"
          :key="s.id"
          class="sol"
          :class="{ highlight: highlight === s.id }"
          :aria-labelledby="`sol-${s.id}-title`"
        >
          <div class="sol-media">
            <span class="tag">{{ t(`solutions.${s.cat}`) }}</span>
            <ResponsiveImg folder="products" :name="s.img" :alt="`${s.name} — ${s.kicker}`" sizes="(max-width: 760px) 68vw, (max-width: 1060px) 36vw, 460px" :width="1000" :height="584" />
          </div>
          <div class="sol-body">
            <p class="kicker">{{ s.kicker }}</p>
            <h3 :id="`sol-${s.id}-title`" class="h3">{{ s.name }}</h3>
            <p>{{ s.text }}</p>
            <ul class="sol-feats">
              <li v-for="f in s.feats" :key="f">{{ f }}</li>
            </ul>
            <a class="sol-link" href="#contato" @click="interest(s.name)">{{ t('solutions.cta') }}<span class="sr-only"> — {{ s.name }}</span><AppIcon name="arrow" /></a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
