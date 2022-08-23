<script setup lang="ts">
import 'v-calendar/dist/style.css';
// import { SetupCalendar } from 'v-calendar';
import { Calendar } from 'v-calendar';
const { t } = useI18n()

const matches = [
  {
    oponent: 'oponent1',
    date: new Date(1995, 11, 17)
  },
  {
    oponent: 'oponent2',
    date: new Date(2001, 2, 1)
  },
]

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <Calendar is-expanded/>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>