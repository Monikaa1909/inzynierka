<script setup lang="ts">
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Match } from 'backend/database/schemas/Match'
import { Team } from 'backend/database/schemas/Team'

import { Calendar } from 'v-calendar'
import 'v-calendar/dist/style.css'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'
const teamsFilter = ref('all')

const urlMatches = computed(() => {
  if (teamsFilter.value === 'all') {
    return `/api/matches/${academy}`
  } else {
    return `/api/matches/team/${teamsFilter.value}`
  }
})

const urlTrainings = computed(() => {
  if (teamsFilter.value === 'all') {
    return `/api/trainings/${academy}`
  } else {
    return `/api/trainings/team/${teamsFilter.value}`
  }
})

const urlTournaments = computed(() => {
  if (teamsFilter.value === 'all') {
    return `/api/tournaments/${academy}`
  } else {
    return `/api/tournaments/team/${teamsFilter.value}`
  }
})

whenever(urlMatches, (data) => {
  refechMatches()
})

whenever(urlTournaments, (data) => {
  refechTournaments()
})

whenever(urlTrainings, (data) => {
  refechTrainings()
})

const {
  data: teams,
  isFetching: isTeamsFetching,
  isFinished: isTeamsFinished,
  error: teamsError,
} = useFetch(`/api/teams/${academy}`, { initialData: [] }).json<Team[]>()

const matches = ref([] as Omit<Match[], '_id'>)
const tournaments = ref([] as Omit<Tournament[], '_id'>)
const trainings = ref([] as Omit<Training[], '_id'>)

const matchesAttributes = ref<Array<any>>([])
const tournamentsAttributes = ref<Array<any>>([])
const trainingsAttributes = ref<Array<any>>([])

const {
  data: matchesData,
  isFetching: isMatchesFetching,
  isFinished: isMatchesFinished,
  error: matchesError,
  execute: refechMatches
} = useFetch(urlMatches, { initialData: [] }).json<Match[]>()

whenever(matchesData, (data) => {
  matchesAttributes.value = []
  matches.value = data
  matches.value.map(element => element.date = new Date(element.date) as unknown as Date)
  let i = 0
  matches.value.forEach(element => {
    let attribute = {
      key: 'match' + i++,
      dates: element.date,
      popover: {
        label: computed(() => t('events.match') + (element.opponent ? (' - ' + element.opponent) : ''))
      },
      highlight: {
        color: 'purple',
        fillMode: 'solid',
      },
    }
    matchesAttributes.value.push(attribute)
  })
})

const {
  data: tournamentsData,
  isFetching: isTournamentsFetching,
  isFinished: isTournamentsFinished,
  error: tournamentsError,
  execute: refechTournaments
} = useFetch(urlTournaments, { initialData: [] }).json<Tournament[]>()

whenever(tournamentsData, (data) => {
  tournamentsAttributes.value = []
  tournaments.value = data
  tournaments.value.map(element => element.startDate = new Date(element.startDate) as unknown as Date)
  tournaments.value.map(element => element.endDate = new Date(element.endDate) as unknown as Date)
  let i = 0 
  tournaments.value.forEach(element => {
    let attribute = {
      key: 'tournament' + i++,
      popover: {
        label: computed(() => 
          (t('events.tournament') + (element.tournamentName ? (' - ' + element.tournamentName) : '')))
      },
      highlight: {
        color: 'purple',
        fillMode: 'light',
      },
      dates: { start: element.startDate, end: element.endDate },
    }
    tournamentsAttributes.value.push(attribute)
  });
})

const {
  data: trainingsData,
  isFetching: isTrainingsFetching,
  isFinished: isTrainingsFinished,
  error: trainingsError,
  execute: refechTrainings
} = useFetch(urlTrainings, { initialData: [] }).json<Training[]>()

whenever(trainingsData, (data) => {
  trainingsAttributes.value = []
  trainings.value = data
  trainings.value.map(element => element.date = new Date(element.date) as unknown as Date)
  let i = 0
  trainings.value.forEach(element => {
    let attribute = {
      key: 'training' + i++,
      dates: element.date,
      popover: {
        label: computed(() => (t('events.training') + (element.sportsFacility ? (' - ' + element.sportsFacility.name) : '')))
      },
      dot: 'green'
    }
    trainingsAttributes.value.push(attribute)
  })
})

const isFinished = computed(() => {
  return isMatchesFinished.value && isTournamentsFinished.value && isTrainingsFinished.value && isTeamsFinished.value
})

const isFetching = computed(() => {
  return isMatchesFetching.value && isTournamentsFetching.value && isTrainingsFetching.value && isTeamsFetching.value
})

const error = computed(() => {
  return matchesError.value && tournamentsError.value && trainingsError.value && teamsError.value
})

const eventsTypeFilter = ref('all')

const attributes = computed(() => {
  var newAttributes = <Array<any>>([])
  if (eventsTypeFilter.value === 'trainings' || eventsTypeFilter.value === 'all')
    trainingsAttributes.value.forEach(element => {
      newAttributes.push(element)
    })
  if (eventsTypeFilter.value === 'tournaments' || eventsTypeFilter.value === 'all')
    tournamentsAttributes.value.forEach(element => {
      newAttributes.push(element)
    })
  if (eventsTypeFilter.value === 'matches' || eventsTypeFilter.value === 'all')
    matchesAttributes.value.forEach(element => {
      newAttributes.push(element)
    })
  return newAttributes
})

const isHidden = ref(true)

const filterMenu = () => {
  isHidden.value = !isHidden.value
}

const activeMatches = computed(() => {
  if (eventsTypeFilter.value === 'matches')
    return 'bg-#805AD5'
})

const activeTournaments = computed(() => {
  if (eventsTypeFilter.value === 'tournaments')
    return 'bg-#E9D8FD'
})

const activeTrainings = computed(() => {
  if (eventsTypeFilter.value === 'trainings')
    return 'bg-#32B3A3'
})

const activeAll = computed(() => {
  if (eventsTypeFilter.value === 'all')
    return 'bg-#143547 text-white '
  else
    return 'text-gray-700'
})

const goAddEvent = (playerId: any) => {
  return router.push(`/events/add/newEvent`)
}

const goSpecificDay = (day: any) => {
  return router.push(`/events/day/${day.id}`)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <div class="w-full h-full p-4 flex flex-col gap-8">

          <div class="w-full flex flex-col gap-4">
            <div class="w-full flex flex-row justify-end gap-8 flex-wrap sm:(flex-nowrap)">
              <button class="flex flex-row gap-2" @click="filterMenu">
                <img src="../assets/filter-icon.png" class="h-48px" />
                <p v-if="isHidden" class="h-full flex items-center text-base font-bold color-#464646">{{
                    t('button.show-filters')
                }}</p>
                <p v-else class="h-full flex items-center text-base font-bold color-#464646">{{
                    t('button.hide-filters')
                }}</p>
              </button>
              <button @click="goAddEvent" class="flex flex-row gap-2">
                <img src="../assets/add-icon2.png" class="h-48px" />
                <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-event') }}</p>
              </button>
            </div>

            <div class="w-full flex flex-col gap-2" :class="[isHidden ? 'invisible' : '']">
              <div class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
                <button @click="eventsTypeFilter = 'matches'" class="p-1 w-full rounded-xl">
                  <p :class="activeMatches"
                    class=" rounded-xl px-4 py-2 text-sm hover:bg-#805AD5 text-gray-700 text-center">{{
                        t('button.matches')
                    }}</p>
                </button>
                <button @click="eventsTypeFilter = 'tournaments'" class="p-1 w-full rounded-xl">
                  <p :class="activeTournaments"
                    class=" rounded-xl px-4 py-2 text-sm hover:bg-#E9D8FD text-gray-700 text-center">{{
                        t('button.tournaments')
                    }}</p>
                </button>
                <button @click="eventsTypeFilter = 'trainings'" class="p-1 w-full rounded-xl">
                  <p :class="activeTrainings"
                    class="rounded-xl px-4 py-2 text-sm hover:bg-#32B3A3 text-gray-700 text-center">{{
                        t('button.trainings')
                    }}</p>
                </button>
                <button @click="eventsTypeFilter = 'all'" class="p-1 w-full rounded-xl">
                  <p :class="activeAll"
                    class="rounded-xl px-4 py-2 text-sm hover:bg-#143547 hover:text-white text-center">
                    {{ t('button.all') }}</p>
                </button>
              </div>

              <div v-if="isTeamsFinished"
                class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row flex-wrap)">
                <button v-for="team in teams" @click="teamsFilter = team._id" 
                
                class="p-1 rounded-xl">
                  <p class=" rounded-xl px-4 py-2 text-sm hover:bg-#2F4D5E hover:text-white  text-center"
                  :class="[teamsFilter === team._id ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                    {{ team.teamName }}</p>
                </button>
                <button @click="teamsFilter = 'all'" class="p-1 rounded-xl">
                  <p class=" rounded-xl px-4 py-2 text-sm hover:bg-#2F4D5E hover:text-white text-center"
                  :class="[teamsFilter === 'all' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                    {{ t('button.all')}} </p>
                </button>
              </div>
            </div>

          </div>

          <div class="w-full h-full flex items-center">
            <LoadingCircle v-if="isFetching"></LoadingCircle>

            <Calendar v-if="isFinished && !error" 
              is-expanded 
              :attributes="attributes"
              :locale="locale" @dayclick="goSpecificDay"
              >
            </Calendar>

            <ErrorMessageInfo v-else-if="error"></ErrorMessageInfo>
          </div>
        </div>
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

