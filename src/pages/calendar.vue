<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const attributes = [
  {
    key: 'today',
    highlight: {
      color: '#143547',
      fillMode: 'light',
    },
    dates: new Date(),
  },
]

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <Calendar is-expanded :attributes="attributes" :locale="locale" />
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>