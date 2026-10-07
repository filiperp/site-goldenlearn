<script setup lang="ts">
import { useI18n } from '../../i18n'
import { asset } from '../../data/site'
import clients from '../../data/clients.json'

// Logos coloridos dos clientes. Lista, arquivos e tamanhos (já equilibrados visualmente)
// ficam em src/data/clients.json — gerado por scripts/build-client-logos.py.
const { t } = useI18n()
</script>

<template>
  <section class="logos" aria-labelledby="clientes-title">
    <h2 id="clientes-title" class="logos-title">{{ t('logos.title') }}</h2>
    <div class="marquee">
      <ul class="marquee-track">
        <li v-for="c in clients" :key="c.key" class="client-logo" :title="c.name" :style="{ '--w': `${c.w}px`, '--h': `${c.h}px` }">
          <img :src="asset(`img/clients/${c.file}`)" :alt="c.name" :width="c.w" :height="c.h" loading="lazy" decoding="async">
        </li>
        <li v-for="c in clients" :key="c.key + '-dup'" class="client-logo" aria-hidden="true" :style="{ '--w': `${c.w}px`, '--h': `${c.h}px` }">
          <img :src="asset(`img/clients/${c.file}`)" alt="" :width="c.w" :height="c.h" loading="lazy" decoding="async">
        </li>
      </ul>
    </div>
  </section>
</template>
