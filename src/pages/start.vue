<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { SetupCalendar } from 'v-calendar';
import { Calendar, DatePicker } from 'v-calendar';

</script>

<template>
  <div>
<Calendar />
  <DatePicker/>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
