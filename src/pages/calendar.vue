<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const isHidden = ref(true)

const filterMenu = () => {
  isHidden.value = !isHidden.value
}

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

// const attributes = ref<Array<any>>([])
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

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="w-full h-full p-4 flex flex-col justify-center place-items-center gap-8">
        <div class="w-full flex flex-col">
          <div
            class="w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)"
          >
            <button @click="filterMenu" @focusout="filterMenu">
              <img src="../assets/edit-icon.png" class="h-48px" />
            </button>
            <button>
              <img src="../assets/delete-icon.png" class="h-48px" />
            </button>
          </div>
          <div class="w-full flex justify-items-end justify-end">
            <div
              id="dropdownNavbar"
              :class="[isHidden ? 'hidden' : '']"
              class="z-10 bg-white absolute divide-y divide-gray-100 shadow items-center justify-end w-44"
            >
              <div>
                <!-- <button class="p-1 w-full">
                  <p
                    class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left"
                  >{{ t('button.your-profile') }}</p>
                </button>
                <button class="p-1 w-full">
                  <p
                    class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left"
                  >{{ t('button.change-language') }}</p>
                </button>-->
                <button @click="eventsType = 'matches'" class="p-1 w-full">
                  <p
                    class="px-4 py-2 text-sm hover:bg-#805AD5 text-gray-700 text-left"
                  >treningi</p>
                </button>
                <button @click="eventsType = 'tournaments'" class="p-1 w-full">
                <p
                    class="px-4 py-2 text-sm hover:bg-#E9D8FD text-gray-700 text-left"
                  >treningi</p>
                </button>
                <button @click="eventsType = 'trainings'" class="p-1 w-full">
                <p
                    class="px-4 py-2 text-sm hover:bg-#32B3A3 text-gray-700 text-left"
                  >treningi</p>
                </button>
                <button @click="eventsType = 'all'" class="p-1 w-full">
                <p
                    class="px-4 py-2 text-sm hover:bg-#143547 text-gray-700 hover:text-white text-left"
                  >treningi</p>
                  </button>
              </div>
            </div>
          </div>
        </div>
        <Calendar is-expanded :attributes="attributes" :locale="locale" @dayclick="goSpecificDay"></Calendar>
      </div>

      <!-- <div class="w-full flex flex-col justify-center gap-4 sm:(flex-row)">
        <button
          @click="eventsType = 'matches'"
          class="rounded-xl bg-#805AD5 w-full sm:(w-1/5)"
        >treningi</button>
        <button @click="eventsType = 'tournaments'" class="rounded-xl bg-#E9D8FD w-full sm:(w-1/5)">treningi</button>
        <button
          @click="eventsType = 'trainings'"
          class="rounded-xl bg-#32B3A3 w-full sm:(w-1/5)"
        >treningi</button>
        <button @click="eventsType = 'all'" class="rounded-xl bg-#143547 w-full sm:(w-1/5)">treningi</button>
      </div>-->
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>