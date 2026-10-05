<script setup lang="ts">
import { useI18n } from '../../i18n'
import { CLIENTS } from '../../data/site'

const { t } = useI18n()
</script>

<template>
  <section class="logos" aria-labelledby="clientes-title">
    <h2 id="clientes-title" class="logos-title">{{ t('logos.title') }}</h2>
    <div class="marquee">
      <ul class="marquee-track">
        <li v-for="c in CLIENTS" :key="c">{{ c }}</li>
        <li v-for="c in CLIENTS" :key="c + '-dup'" aria-hidden="true">{{ c }}</li>
      </ul>
    </div>
  </section>
</template>
