<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import HeroGlobe from './HeroGlobe.vue'
import { useSiteState } from '../composables/useSiteState'

const MAX = 280
const { t } = useI18n()
const { focusSolution, sendToContact } = useSiteState()
const question = ref('')
const canSend = computed(() => question.value.trim().length > 0)

// Chips de sugestão → solução correspondente
const chips = [
  { key: 'chip1', target: 'retention' },
  { key: 'chip2', target: 'tdplanner' },
  { key: 'chip3', target: 'comprova' },
  { key: 'chip4', target: 'datadriven' },
  { key: 'chip5', target: 'immersive' },
  { key: 'chip6', target: 'assets' },
]

function send() {
  if (canSend.value) sendToContact(question.value.trim())
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <section class="hero">
    <div class="hero-bg" />
    <HeroGlobe />
    <div class="container hero-inner">
      <span class="hero-badge"><b>{{ t('hero.badgeTag') }}</b><span>{{ t('hero.badge') }}</span></span>
      <h1 class="display" v-html="t('hero.title')" />
      <p class="lead">{{ t('hero.sub') }}</p>

      <form class="ask" @submit.prevent="send">
        <label for="hero-ask">{{ t('hero.askLabel') }}</label>
        <div class="ask-box">
          <textarea
            id="hero-ask"
            v-model="question"
            rows="2"
            :maxlength="MAX"
            :placeholder="t('hero.askPh')"
            @keydown="onKey"
          />
          <button class="ask-send" type="submit" :disabled="!canSend" :aria-label="t('hero.askSend')">
            <AppIcon name="arrow" />
          </button>
          <span class="ask-count">{{ question.length }}/{{ MAX }}</span>
        </div>
      </form>

      <div class="chips">
        <button v-for="c in chips" :key="c.key" type="button" class="chip" @click="focusSolution(c.target)">
          {{ t(`hero.${c.key}`) }}
        </button>
      </div>
    </div>
    <a class="scroll-cue" href="#vitrine">{{ t('hero.scroll') }}<i /></a>
  </section>
</template>
