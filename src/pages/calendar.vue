<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const myMatches = [
  {
    type: 'Match',
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 7, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    type: 'Match',
    goalsConceded: 1,
    goalsScored: 3,
    opponent: 'BVB',
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility2'
  },
  {
    type: 'Turniej',
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Promień Mońki',
    date: new Date(2022, 7, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
]
const myTrainings = [
  {
    date: new Date(2022, 7, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    date: new Date(2022, 7, 13),
    team: 'team2',
    sportFaciility: 'facility1'
  }
]

interface Match {
  type: string,
  goalsConceded: number,
  goalsScored: number,
  opponent: string,
  date: Date,
  team: string,
  sportFaciility: string
}
const matches = ref<Array<Match>>([])
for (let match of myMatches) {
  matches.value.push(match)
}

interface Training {
  date: Date,
  team: string,
  sportFaciility: string
}
const trainings = ref<Array<Training>>([])
for (let training of myTrainings) {
  trainings.value.push(training)
}

const attributes = ref<Array<any>>([])
for (let match of matches.value) {
  if (match.type === 'Match' || match.type === 'Mecz') {
    const attribute = {
      dates: match.date,
      popover: {
        label: 'MECZ' + ' - ' + match.opponent
      },
      highlight: {
        color: 'purple',
        fillMode: 'light',
      },
    }
    attributes.value.push(attribute)
  }
  
}

for (let training of trainings.value) {
  const attribute = {
    dates: training.date,
    popover: {
      label: training.team
    },
    dot: 'green',
  }
  attributes.value.push(attribute)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <Calendar is-expanded :attributes="attributes" :locale="locale"></Calendar>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>