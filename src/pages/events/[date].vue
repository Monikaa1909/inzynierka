<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	date: String,
})

const myMatches = [
  {
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 10, 12, 10, 10),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    goalsConceded: 1,
    goalsScored: 3,
    opponent: 'BVB',
    date: new Date(2022, 10, 12, 10, 20),
    team: 'team1',
    sportFaciility: 'facility2'
  },
  {
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Promień Mońki',
    date: new Date(2022, 10, 12, 16, 45),
    team: 'team1',
    sportFaciility: 'facility1'
  },
]
const myTrainings = [
  {
    date: new Date(2022, 10, 12, 16, 10),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    date: new Date(2022, 10, 12, 17, 0),
    team: 'team2',
    sportFaciility: 'facility1'
  }
]
const myTournaments = [
  {
    name: 'Tymbark',
    startDate: new Date(2022, 10, 12, 16, 0),
    endDate: new Date(2022, 10, 15),
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

const events = computed(() => {
  var newEvents = <Array<any>>([])
  switch (eventsType.value) {
    case 'trainings':
      for (let training of trainings.value) {
        const event = {
          type: 'Training',
          dates: { start: training.date },
          hour: training.date.getHours(),
          team: training.team,
          sportFaciility: training.sportFaciility,
        }
        newEvents.push(event)
      }
      break
    case 'matches':
      for (let match of matches.value) {
        const event = {
          type: 'Match',
          dates: { start: match.date },
          hour: match.date.getHours(),
          team: match.team,
          sportFaciility: match.sportFaciility,
          opponent: match.opponent,
        }
        newEvents.push(event)
      }
      break
    case 'tournaments':
      for (let tournament of tournaments.value) {
        const event = {
          type: 'Tournament',
          dates: { start: tournament.startDate, end: tournament.endDate },
          hour: tournament.startDate.getHours(),
          team: tournament.team,
          sportFaciility: tournament.sportFaciility,
        }
        newEvents.push(event)
      }
      break
    case 'all':
      for (let training of trainings.value) {
        const event = {
          type: 'Training',
          dates: { start: training.date },
          hour: training.date.getHours(),
          team: training.team,
          sportFaciility: training.sportFaciility,
        }
        newEvents.push(event)
      }
      for (let match of matches.value) {
        const event = {
          type: 'Match',
          dates: { start: match.date },
          hour: match.date.getHours(),
          team: match.team,
          sportFaciility: match.sportFaciility,
          opponent: match.opponent,
        }
        newEvents.push(event)
      }
      for (let tournament of tournaments.value) {
        const event = {
          type: 'Tournament',
          dates: { start: tournament.startDate, end: tournament.endDate },
          hour: tournament.startDate.getHours(),
          team: tournament.team,
          sportFaciility: tournament.sportFaciility,
        }
        newEvents.push(event)
      }
  }
  newEvents.sort( function (a: any, b: any) {
    if (a.dates.start.getHours() < b.dates.start.getHours()) return -1
    else if (a.dates.start.getHours() > b.dates.start.getHours()) return 1
    if (a.dates.start.getMinutes() < b.dates.start.getMinutes()) return -1
    else return 1
  }
    
  )
  return newEvents
})

const eventsType = ref('all')

const isHidden = ref(true)

const filterMenu = () => {
  isHidden.value = !isHidden.value
}

const activeMatches = computed(() => {
  if (eventsType.value === 'matches')
    return 'bg-#805AD5'
})

const activeTournaments = computed(() => {
  if (eventsType.value === 'tournaments')
    return 'bg-#E9D8FD'
})

const activeTrainings = computed(() => {
  if (eventsType.value === 'trainings')
    return 'bg-#32B3A3'
})

const activeAll = computed(() => {
  if (eventsType.value === 'all')
    return 'bg-#143547 text-white '
  else
    return 'text-gray-700'
})

const goEditEvent = (eventId: any) => {
  return router.push(`/addEventDay/${eventId}`)
}

const goAddEvent = () => {
  return router.push(`/addEventDay/${props.date}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <div class=" w-full h-full flex flex-col p-4 gap-4">
        <div class="w-full flex flex-row justify-end gap-8 flex-wrap sm:(flex-nowrap)">
          <button class="flex flex-row gap-2" @click="filterMenu">
            <img src="../../assets/filter-icon.png" class="h-48px" />
            <p v-if="isHidden" class="h-full flex items-center text-base font-bold color-#464646">{{
            t('button.show-filters')}}</p>
            <p v-else class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.hide-filters')}}
            </p>
          </button>
          <button @click="goAddEvent()" class="flex flex-row gap-2">
            <img src="../../assets/add-icon2.png" class="h-48px" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-event')}}</p>
          </button>
        </div>
        <div v-if="!isHidden"
          class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
          <button @click="eventsType='matches'" class="p-1 w-full rounded-xl">
            <p :class="activeMatches" class=" rounded-xl px-4 py-2 text-sm hover:bg-#805AD5 text-gray-700 text-center">
              {{ t('button.matches')
              }}</p>
          </button>
          <button @click="eventsType='tournaments'" class="p-1 w-full rounded-xl">
            <p :class="activeTournaments"
              class=" rounded-xl px-4 py-2 text-sm hover:bg-#E9D8FD text-gray-700 text-center">{{
              t('button.tournaments') }}</p>
          </button>
          <button @click="eventsType='trainings'" class="p-1 w-full rounded-xl">
            <p :class="activeTrainings" class="rounded-xl px-4 py-2 text-sm hover:bg-#32B3A3 text-gray-700 text-center">
              {{ t('button.trainings')
              }}</p>
          </button>
          <button @click="eventsType='all'" class="p-1 w-full rounded-xl">
            <p :class="activeAll" class="rounded-xl px-4 py-2 text-sm hover:bg-#143547 hover:text-white text-center">
              {{ t('button.all') }}</p>
          </button>
        </div>
        <MyCenterElement class="xl:(px-200px)">
          <template v-slot>
            <MiniWhiteFrame v-for="event in events" v-bind:key="event.type" class="border border-#464646 w-full">
              <template v-slot:nav>
                <button @click="goEditEvent(event.type)">
                  <img src="../../assets/edit-icon.png" class="h-24px" />
                </button>
                <button>
                  <img src="../../assets/delete-icon.png" class="h-24px" />
                </button>
              </template>
              <template v-slot:icon>
                <img v-if="event.type == 'Match'" src="../../assets/calendar-icon-purple.png" class="h-150px" />
                <img v-else-if="event.type == 'Tournament'" src="../../assets/calendar-icon-purple-light.png"
                  class="h-150px" />
                <img v-else-if="event.type == 'Training'" src="../../assets/calendar-icon-green.png" class="h-150px" />
              </template>
              <template v-slot:attributes>
                {{props.date}}
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.type') }}:</template>
                  <template v-slot:attributeValue>{{ event.type }}</template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type !== 'Tournament'">
                  <template v-slot:attributeName>{{ t('single-event.date') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.dates.start.toLocaleDateString(locale) }}
                  </template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Tournament'">
                  <template v-slot:attributeName>{{ t('single-event.start-date') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.dates.start.toLocaleDateString(locale) }}
                  </template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Tournament'">
                  <template v-slot:attributeName>{{ t('single-event.end-date') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.dates.end.toLocaleDateString(locale) }}
                  </template>
                </SingleAttribute>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.hour') }}:</template>
                  <template v-slot:attributeValue>{{ event.dates.start.getHours() }}:{{ event.dates.start.getMinutes() }}</template>
                </SingleAttribute>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.team') }}:</template>
                  <template v-slot:attributeValue>{{ event.team }}</template>
                </SingleAttribute>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.object') }}:</template>
                  <template v-slot:attributeValue>{{ event.sportFaciility }}</template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Match'">
                  <template v-slot:attributeName>{{ t('single-event.opponent') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.opponent }}
                  </template>
                </SingleAttribute>
              </template>
            </MiniWhiteFrame>
          </template>
        </MyCenterElement>

      </div>

    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>