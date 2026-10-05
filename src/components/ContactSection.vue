<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSiteState } from '../composables/useSiteState'
import { INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP, WHATSAPP_LABEL } from '../data/site'

const { t } = useI18n()
const { contactMessage } = useSiteState()

const form = reactive({ name: '', company: '', email: '', interest: '' })
const interests = ['opt1', 'opt2', 'opt3', 'opt4']

function submit() {
  const lines = [
    t('form.waIntro'),
    '',
    `${t('form.name')}: ${form.name}`,
    `${t('form.company')}: ${form.company}`,
    `${t('form.email')}: ${form.email}`,
  ]
  if (form.interest) lines.push(`${t('form.interest')}: ${t(`form.${form.interest}`)}`)
  if (contactMessage.value) lines.push('', contactMessage.value)
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
}
</script>

<template>
  <section id="contato" class="section cta">
    <div class="container cta-grid">
      <div v-reveal>
        <span class="eyebrow">{{ t('cta.eyebrow') }}</span>
        <h2 class="h2">{{ t('cta.title') }}</h2>
        <p class="lead">{{ t('cta.sub') }}</p>
        <ul class="contact-list">
          <li>
            <a :href="`https://wa.me/${WHATSAPP}`" target="_blank" rel="noopener">
              <span class="ico"><AppIcon name="whatsapp" /></span>{{ t('cta.whatsapp') }} · {{ WHATSAPP_LABEL }}
            </a>
          </li>
          <li>
            <a :href="LINKEDIN_URL" target="_blank" rel="noopener"><span class="ico"><AppIcon name="linkedin" /></span>{{ t('cta.linkedin') }}</a>
          </li>
          <li>
            <a :href="INSTAGRAM_URL" target="_blank" rel="noopener"><span class="ico"><AppIcon name="instagram" /></span>{{ t('cta.instagram') }}</a>
          </li>
        </ul>
      </div>

      <form v-reveal class="form" data-delay="1" @submit.prevent="submit">
        <h3 class="h3">{{ t('form.title') }}</h3>
        <div class="row">
          <div class="field">
            <label for="f-name">{{ t('form.name') }}</label>
            <input id="f-name" v-model="form.name" name="name" required autocomplete="name">
          </div>
          <div class="field">
            <label for="f-company">{{ t('form.company') }}</label>
            <input id="f-company" v-model="form.company" name="company" required autocomplete="organization">
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="f-email">{{ t('form.email') }}</label>
            <input id="f-email" v-model="form.email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="f-interest">{{ t('form.interest') }}</label>
            <select id="f-interest" v-model="form.interest" name="interest">
              <option value="">{{ t('form.opt0') }}</option>
              <option v-for="o in interests" :key="o" :value="o">{{ t(`form.${o}`) }}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="f-message">{{ t('form.message') }}</label>
          <textarea id="f-message" v-model="contactMessage" name="message" :placeholder="t('form.messagePh')" />
        </div>
        <button class="btn btn-primary" type="submit">{{ t('form.submit') }}<AppIcon name="arrow" /></button>
        <small>{{ t('form.note') }}</small>
      </form>
    </div>
  </section>
</template>
