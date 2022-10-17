<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const goSpecificDay = (day: any) => {
  return router.push(`/events/day/${day.id}`)
}

const myMatches = [
  {
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 8, 12),
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
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
]
const myTrainings = [
  {
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    date: new Date(2022, 8, 13),
    team: 'team2',
    sportFaciility: 'facility1'
  }
]
const myTournaments = [
  {
    name: 'Tymbark',
    startDate: new Date(2022, 8, 12),
    endDate: new Date(2022, 8, 15),
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

const eventsType = ref('all')

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
const attributes = computed(() => {
  var newAttributes = <Array<any>>([])
  switch (eventsType.value) {
    case 'trainings':
      trainingAttributes.value.forEach(element => {
        newAttributes.push(element)
      })
      break
    case 'matches':
      matchesAttributes.value.forEach(element => {
        newAttributes.push(element)
      })
      break
    case 'tournaments':
      tournamentsAttributes.value.forEach(element => {
        newAttributes.push(element)
      })
      break
    case 'all':
      trainingAttributes.value.forEach(element => {
        newAttributes.push(element)
      })
      matchesAttributes.value.forEach(element => {
        newAttributes.push(element)
      })
      tournamentsAttributes.value.forEach(element => {
        newAttributes.push(element)
      })
  }
  return newAttributes
})

const isHidden = ref(true)

const filterMenu = () => {
  isHidden.value = !isHidden.value
}

const activeMatches = computed(() => {
  if(eventsType.value === 'matches')
    return 'bg-#805AD5'
})

const activeTournaments = computed(() => {
  if(eventsType.value === 'tournaments')
    return 'bg-#E9D8FD'
})

const activeTrainings = computed(() => {
  if(eventsType.value === 'trainings')
    return 'bg-#32B3A3'
})

const activeAll = computed(() => {
  if(eventsType.value === 'all')
    return 'bg-#143547 text-white '
  else
    return 'text-gray-700'
})

const goAddEvent = (playerId: any) => {
  return router.push(`/events/add/newEvent`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
    <template v-slot>
      <div class="w-full h-full p-4 flex flex-col gap-8">
        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex flex-row justify-end gap-8 flex-wrap sm:(flex-nowrap)">
            <button class="flex flex-row gap-2" @click="filterMenu">
              <img src="../assets/filter-icon.png" class="h-48px" />
              <p v-if="isHidden" class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.show-filters')}}</p>
              <p v-else class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.hide-filters')}}</p>
            </button>
            <button @click="goAddEvent" class="flex flex-row gap-2">
              <img src="../assets/add-icon2.png" class="h-48px" />
              <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-event')}}</p>
            </button>
          </div>
          <div :class="[isHidden ? 'invisible' : '']"
            class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
            <button @click="eventsType='matches'" class="p-1 w-full rounded-xl">
              <p :class="activeMatches"
                class=" rounded-xl px-4 py-2 text-sm hover:bg-#805AD5 text-gray-700 text-center">{{ t('button.matches')
                }}</p>
            </button>
            <button @click="eventsType='tournaments'" class="p-1 w-full rounded-xl">
              <p :class="activeTournaments"
                class=" rounded-xl px-4 py-2 text-sm hover:bg-#E9D8FD text-gray-700 text-center">{{
                t('button.tournaments') }}</p>
            </button>
            <button @click="eventsType='trainings'" class="p-1 w-full rounded-xl">
              <p :class="activeTrainings"
                class="rounded-xl px-4 py-2 text-sm hover:bg-#32B3A3 text-gray-700 text-center">{{ t('button.trainings')
                }}</p>
            </button>
            <button @click="eventsType='all'" class="p-1 w-full rounded-xl">
              <p :class="activeAll" class="rounded-xl px-4 py-2 text-sm hover:bg-#143547 hover:text-white text-center">
                {{ t('button.all') }}</p>
            </button>
          </div>
        </div>
        <div class="w-full h-full flex items-center">
          <Calendar is-expanded :attributes="attributes" :locale="locale" @dayclick="goSpecificDay"></Calendar>
        </div>
      </div>
    </template>
  </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>