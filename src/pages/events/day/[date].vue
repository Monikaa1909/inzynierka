<script setup lang="ts">
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Match } from 'backend/database/schemas/Match'
import { Team } from 'backend/database/schemas/Team'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ date: string }>()

const selectedDate = new Date(props.date)

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

const matches = ref(<Array<Match>>([]))
const tournaments = ref([] as Omit<Tournament[], '_id'>)
const trainings = ref([] as Omit<Training[], '_id'>)

const {
  data: matchesData,
  isFetching: isMatchesFetching,
  isFinished: isMatchesFinished,
  error: matchesError,
  execute: refechMatches
} = useFetch(urlMatches, { initialData: [] }).json<Match[]>()

whenever(matchesData, (data) => {
  matches.value = data
  matches.value.map(item => item.date = new Date(item.date) as unknown as Date)

  matches.value = matches.value.filter(element => {
    return element.date.getFullYear() === selectedDate.getFullYear()
      && element.date.getMonth() === selectedDate.getMonth()
      && element.date.getDate() === selectedDate.getDate() 
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
  tournaments.value = data
  tournaments.value.map(element => element.startDate = new Date(element.startDate) as unknown as Date)
  tournaments.value.map(element => element.endDate = new Date(element.endDate) as unknown as Date)

  tournaments.value = tournaments.value.filter(element => {
    let start = new Date(element.startDate)
    start.setHours(0, 0)
    let end = new Date(element.endDate)
    end.setHours(23, 59)

    return start <= selectedDate && end >= selectedDate
    })
})

const {
  data: trainingsData,
  isFetching: isTrainingsFetching,
  isFinished: isTrainingsFinished,
  error: trainingsError,
  execute: refechTrainings
} = useFetch(urlTrainings, { initialData: [] }).json<Training[]>()

whenever(trainingsData, (data) => {
  trainings.value = data
  trainings.value.map(element => element.date = new Date(element.date) as unknown as Date)

  trainings.value = trainings.value.filter(element => {
    return element.date.getFullYear() === selectedDate.getFullYear()
      && element.date.getMonth() === selectedDate.getMonth()
      && element.date.getDate() === selectedDate.getDate() 
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

const events = computed(() => {
  var newEvents = <Array<any>>([])
  if (eventsTypeFilter.value === 'matches' || eventsTypeFilter.value === 'all') {
    matches.value.forEach(element => {
      const event = {
        id: element._id,
        type: 'Match',
        date: element.date,
        team: element.team.teamName,
        goalsConceded: element.goalsConceded ? element.goalsConceded : 0,
        goalsScored: element.goalsScored ? element.goalsScored : 0,
        sportsFacility: element.sportsFacility?.name,
        opponent: element.opponent ? element.opponent : '-',
        remarks: element.remarks ? element.remarks : '-',
        get hour(): string {
          if (this.date.getHours().toLocaleString(locale.value).length == 2)
            return this.date.getHours().toLocaleString(locale.value)
          else
            return '0' + this.date.getHours().toLocaleString(locale.value)
        },
        get minutes(): string {
          if (this.date.getMinutes().toLocaleString(locale.value).length == 2)
            return this.date.getMinutes().toLocaleString(locale.value)
          else
            return '0' + this.date.getMinutes().toLocaleString(locale.value)
        }
      }
      newEvents.push(event)
    })
  }

  if (eventsTypeFilter.value === 'trainings' || eventsTypeFilter.value === 'all') {
    trainings.value.forEach(element => {
      const event = {
        id: element._id,
        type: 'Training',
        date: element.date,
        team: element.team.teamName,
        sportsFacility: element.sportsFacility?.name ? element.sportsFacility?.name : '-',
        remarks: element.remarks ? element.remarks : '-',
        get hour(): string {
          if (this.date.getHours().toLocaleString(locale.value).length == 2)
            return this.date.getHours().toLocaleString(locale.value)
          else
            return '0' + this.date.getHours().toLocaleString(locale.value)
        },
        get minutes(): string {
          if (this.date.getMinutes().toLocaleString(locale.value).length == 2)
            return this.date.getMinutes().toLocaleString(locale.value)
          else
            return '0' + this.date.getMinutes().toLocaleString(locale.value)
        }
      }
      newEvents.push(event)
    })
  }

  if (eventsTypeFilter.value === 'tournaments' || eventsTypeFilter.value === 'all') {
    tournaments.value.forEach(element => {
      const event = {
        id: element._id,
        type: 'Tournament',
        tournamentName: element.tournamentName ? element.tournamentName : '-',
        startDate: element.startDate,
        endDate: element.endDate,
        friendly: element.friendly,
        team: element.team.teamName,
        sportsFacility: element.sportsFacility?.name,
        remarks: element.remarks ? element.remarks : '-',
        get hour(): string {
          if (this.startDate.getHours().toLocaleString(locale.value).length == 2)
            return this.startDate.getHours().toLocaleString(locale.value)
          else
            return '0' + this.startDate.getHours().toLocaleString(locale.value)
        },
        get minutes(): string {
          if (this.startDate.getMinutes().toLocaleString(locale.value).length == 2)
            return this.startDate.getMinutes().toLocaleString(locale.value)
          else
            return '0' + this.startDate.getMinutes().toLocaleString(locale.value)
        }
      }
      newEvents.push(event)
    })
  }

  return newEvents
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

const goEditEvent = (eventId: string, eventType: string) => {
  return router.push(`/events/edit/${eventType.toLowerCase()}/${eventId}`)
}

const goAddEvent = () => {
  return router.push(`/events/day/add/newEvent/${props.date}`)
}

const goToEvent = (event: any) => {
  if (event.type === 'Match')
    return router.push(`/events/match/${event.id}`)
  else if (event.type === 'Tournament')
    return router.push(`/events/tournament/${event.id}`)
  else if (event.type === 'Training')
    return router.push(`/events/training/${event.id}`)
}

const showAttendanceList = (eventId: any) => {
  return router.push(`/events/attendanceList/${eventId}`)
}

const showMatchStatistic = (eventId: any) => {
  return router.push(`/events/statistic/match/${eventId}`)
}

const showTournamentStatistic = (eventId: any) => {
  return router.push(`/events/statistic/tournament/${eventId}`)
}

const isDeleting = ref(false)
const deletingEvent = ref<any>()

const deleteEvent = (event: any) => {
  isDeleting.value = true
  deletingEvent.value = event
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  if (deletingEvent.value.type === 'Match') {
    await useFetch(`/api/match/${deletingEvent.value?.id}`).delete()
    refechMatches()
  } else if (deletingEvent.value.type === 'Tournament') {
    await useFetch(`/api/tournament/${deletingEvent.value?.id}`).delete()
    refechTournaments()
  } else if (deletingEvent.value.type === 'Training') {
    await useFetch(`/api/training/${deletingEvent.value?.id}`).delete()
    refechTrainings()
  }
}
</script>

<template>
  <BackgroundFrame>
    <template #data>
      <div class=" w-full h-full flex flex-col p-4 gap-4">

        <div class="w-full flex flex-row justify-end gap-8 flex-wrap sm:(flex-nowrap)">
          <button class="flex flex-row gap-2" @click="filterMenu">
            <img src="../../../assets/filter-icon.png" class="h-48px" />
            <p v-if="isHidden" class="h-full flex items-center text-base font-bold color-#464646">{{
                t('button.show-filters')
            }}</p>
            <p v-else class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.hide-filters') }}
            </p>
          </button>
          <button @click="goAddEvent()" class="flex flex-row gap-2">
            <img src="../../../assets/add-icon2.png" class="h-48px" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-event') }}</p>
          </button>
        </div>

        <div v-if="!isHidden" class="w-full flex flex-col gap-2">

          <div class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
            <button @click="eventsTypeFilter = 'matches'" class="p-1 w-full rounded-xl">
              <p :class="activeMatches"
                class=" rounded-xl px-4 py-2 text-sm hover:bg-#805AD5 text-gray-700 text-center">
                {{ t('button.matches')
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
                class="rounded-xl px-4 py-2 text-sm hover:bg-#32B3A3 text-gray-700 text-center">
                {{ t('button.trainings')
                }}</p>
            </button>
            <button @click="eventsTypeFilter = 'all'" class="p-1 w-full rounded-xl">
              <p :class="activeAll" class="rounded-xl px-4 py-2 text-sm hover:bg-#143547 hover:text-white text-center">
                {{ t('button.all') }}</p>
            </button>
          </div>

          <div v-if="isTeamsFinished"
            class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row flex-wrap)">
            <button v-for="team in teams" @click="teamsFilter = team._id" class="p-1 rounded-xl">
              <p class=" rounded-xl px-4 py-2 text-sm hover:bg-#2F4D5E hover:text-white  text-center"
                :class="[teamsFilter === team._id ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                {{ team.teamName }}</p>
            </button>
            <button @click="teamsFilter = 'all'" class="p-1 rounded-xl">
              <p class=" rounded-xl px-4 py-2 text-sm hover:bg-#2F4D5E hover:text-white text-center"
                :class="[teamsFilter === 'all' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                {{ t('button.all') }} </p>
            </button>
          </div>

        </div>

        <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        </DeletingMesageDialog>

        <LoadingCircle v-if="isFetching"></LoadingCircle>

        <MyCenterElement v-if="isFinished && !isDeleting && !error && events.length != 0"
          class="xl:(px-300px) lg:(200px)">

          <MiniWhiteFrame v-for="event in events" v-bind:key="event.id" class="hover:bg-#E3E3E3 w-full"
            clickable="cursor-pointer" @go-to="goToEvent(event)">
            <template #nav>

              <button v-if="event.type === 'Training'" @click="showAttendanceList(event.id)">
                <img src="../../../assets/attendance-list-icon.png" class="h-24px" />
              </button>
              <button v-if="event.type === 'Match'" @click="showMatchStatistic(event.id)">
                <img src="../../../assets/statistic-icon.png" class="h-24px" />
              </button>
              <button v-if="event.type === 'Tournament'" @click="showTournamentStatistic(event.id)">
                <img src="../../../assets/statistic-icon.png" class="h-24px" />
              </button>
              <button @click="goEditEvent(event.id, event.type)">
                <img src="../../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button @click="deleteEvent(event)">
                <img src="../../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>

            <template #icon>
              <img v-if="event.type == 'Match' || event.type == 'Mecz'" src="../../../assets/match-icon2.png"
                class="h-150px" />
              <img v-else-if="event.type == 'Tournament'" src="../../../assets/tournament-icon.png" class="h-150px" />
              <img v-else-if="event.type == 'Training'" src="../../../assets/training-icon.png" class="h-150px" />
            </template>

            <template #attributes>

              <SingleAttribute>
                <template #attributeName>{{ t('single-event.type') }}:</template>
                <template v-if="event.type === 'Match'" #attributeValue>{{ t('events.lower-case.match') }}</template>
                <template v-else-if="event.type === 'Tournament'"
                  #attributeValue>{{t('events.lower-case.tournament')}}</template>
                <template v-else="event.type === 'Training'"
                  #attributeValue>{{t('events.lower-case.training')}}</template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type !== 'Tournament'">
                <template #attributeName>{{ t('single-event.date') }}:</template>
                <template #attributeValue>
                  {{ event.date.toLocaleDateString(locale) }} {{ event.hour }}:{{ event.minutes }}
                </template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type === 'Tournament'">
                <template #attributeName>{{ t('single-event.name') }}:</template>
                <template #attributeValue> {{ event.tournamentName }} </template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type !== 'Training' && event.friendly">
                <template #attributeName v-if="event.type === 'Match'">{{ t('single-event.type-of-match') }}:</template>
                <template #attributeName v-else-if="event.type === 'Tournament'">{{ t('single-event.type-of-tournament')}}:</template>
                <template #attributeValue> {{ t('single-event.friendly') }} </template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type === 'Tournament'">
                <template #attributeName>{{ t('single-event.start-date') }}:</template>
                <template #attributeValue>
                  {{ event.startDate.toLocaleDateString(locale) }} {{ event.hour }}:{{ event.minutes }}
                </template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type === 'Tournament'">
                <template #attributeName>{{ t('single-event.end-date') }}:</template>
                <template #attributeValue>
                  {{ event.endDate.toLocaleDateString(locale) }}
                </template>
              </SingleAttribute>

              <SingleAttribute>
                <template #attributeName>{{ t('single-event.team') }}:</template>
                <template #attributeValue>{{ event.team }}</template>
              </SingleAttribute>

              <SingleAttribute>
                <template #attributeName>{{ t('single-event.object') }}:</template>
                <template #attributeValue>{{ event.sportsFacility }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type === 'Match'">
                <template #attributeName>{{ t('single-event.opponent') }}:</template>
                <template #attributeValue> {{ event.opponent }} </template>
              </SingleAttribute>

              <SingleAttribute v-if="event.type === 'Match'">
                <template #attributeName>{{ t('single-event.result') }}:</template>
                <template #attributeValue>
                  {{ event.goalsScored }} : {{ event.goalsConceded }}
                </template>
              </SingleAttribute>

              <SingleAttribute v-if="event.remarks != ''">
                <template #attributeName>{{ t('single-event.remarks') }}:</template>
                <template #attributeValue>{{ event.remarks }}</template>
              </SingleAttribute>
            </template>
          </MiniWhiteFrame>
        </MyCenterElement>

        <ErrorMessageInfo v-else-if="!isDeleting && isFinished && events?.length === 0">
          {{ t('error-messages.no-data') }}
        </ErrorMessageInfo>
        <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>