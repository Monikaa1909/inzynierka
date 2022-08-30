<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const goSpecificDay = (day: any) => {
  return router.push(`/events/${day.id}`)
}

const myMatches = [
  {
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 7, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    goalsConceded: 1,
    goalsScored: 3,
    opponent: 'BVB',
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility2'
  },
  {
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
const myTournaments = [
  {
    name: 'Tymbark',
    startDate: new Date(2022, 7, 12),
    endDate: new Date(2022, 7, 15),
    team: 'team1',
    sportFaciility: 'facility1'
  },
]

interface Match {
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

interface Tournament {
  name: String,
  startDate: Date,
  endDate: Date,
  team: string,
  sportFaciility: string
}
const tournaments = ref<Array<Tournament>>([])
for (let tournament of myTournaments) {
  tournaments.value.push(tournament)
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

const tournamentsAttributes = ref<Array<any>>([])
for (let tournament of tournaments.value) {
  const attribute = {
    popover: {
      label: computed(() => (t('events.tournament') + ' - ' + tournament.name))
    },
    highlight: {
      color: 'purple',
      fillMode: 'light',
    },
    dates: { start: tournament.startDate, end: tournament.endDate },
  }
  tournamentsAttributes.value.push(attribute)
}

const matchesAttributes = ref<Array<any>>([])
for (let match of matches.value) {
  const attribute = {
    key: 'match',
    dates: match.date,
    popover: {
      label: computed(() => (t('events.match') + ' - ' + match.opponent))
    },
    highlight: {
      color: 'purple',
      fillMode: 'solid',
    },
  }
  matchesAttributes.value.push(attribute)
}

const trainingAttributes = ref<Array<any>>([])
for (let training of trainings.value) {
  const attribute = {
    key: 'training',
    dates: training.date,
    popover: {
      label: computed(() => (t('events.training') + ' - ' + training.sportFaciility))
    },
    dot: 'green'
  }
  trainingAttributes.value.push(attribute)
}

trainingAttributes.value.forEach(element => {
  attributes.value.push(element)
})
matchesAttributes.value.forEach(element => {
  attributes.value.push(element)
})
tournamentsAttributes.value.forEach(element => {
  attributes.value.push(element)
})

const filter = (eventType: any) => {
  while (attributes.value.length > 0) {
    attributes.value.pop()
  }

  switch (eventType) {
    case 'trainings':
      trainingAttributes.value.forEach(element => {
        attributes.value.push(element)
      })
      break
    case 'matches':
      matchesAttributes.value.forEach(element => {
        attributes.value.push(element)
      })
      break
    case 'tournaments':
      tournamentsAttributes.value.forEach(element => {
        attributes.value.push(element)
      })
      break
    case 'all':
      trainingAttributes.value.forEach(element => {
        attributes.value.push(element)
      })
      matchesAttributes.value.forEach(element => {
        attributes.value.push(element)
      })
      tournamentsAttributes.value.forEach(element => {
        attributes.value.push(element)
      })
  }
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="w-full border">przyciski</div>
      <Calendar is-expanded :attributes="attributes" :locale="locale" @dayclick="goSpecificDay"></Calendar>
      <div class="w-full flex flex-col justify-center gap-4 sm:(flex-row)">
        <button
          @click="filter('trainings')"
          class="rounded-xl bg-#805AD5 w-full sm:(w-1/5)"
        >treningi</button>
        <button @click="filter('matches')" class="rounded-xl bg-#E9D8FD w-full sm:(w-1/5)">treningi</button>
        <button
          @click="filter('tournaments')"
          class="rounded-xl bg-#32B3A3 w-full sm:(w-1/5)"
        >treningi</button>
        <button @click="filter('all')" class="rounded-xl bg-#32B3A3 w-full sm:(w-1/5)">treningi</button>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>