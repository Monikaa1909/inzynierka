<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
  date: {
    type: String,
    require: true
  }
})

const matches = ref([
  {
    id: 'matchesid1',
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 10, 12, 10, 5),
    team: 'Trampkarz C2',
    sportsFacility: 'Stadion miejski w Białymstoku',
    remarks: 'Zadzwonić potwierdzić boisko'
  },
  {
    id: 'matchesid2',
    goalsConceded: 1,
    goalsScored: 3,
    opponent: 'BVB',
    date: new Date(2022, 10, 12, 10, 20),
    team: 'Młodzik D2',
    sportsFacility: 'Orlik szkolny na Zielonej',
    remarks: ''
  },
  {
    id: 'matchesid3',
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Promień Mońki',
    date: new Date(2022, 10, 12, 16, 45),
    team: 'Trampkarz C1',
    sportsFacility: 'Orlik szkolny na Zielonej',
    remarks: ''
  },
])

const trainings = ref([
  {
    id: 'trainingid1',
    date: new Date(2022, 10, 12, 16, 10),
    team: 'Młodzik D1',
    sportsFacility: 'Stadion miejski w Białymstoku',
    remarks: '',
    type: ''
  },
  {
    id: 'trainingid1',
    date: new Date(2022, 10, 12, 17, 0),
    team: 'Junior Młodszy B1',
    sportsFacility: 'Stadion miejski w Białymstoku',
    remarks: ''
  }
])

const tournaments = ref([
  {
    id: 'tournamentsid1',
    name: 'Tymbark',
    startDate: new Date(2022, 10, 12, 16, 0),
    endDate: new Date(2022, 10, 15),
    team: 'Młodzik D1',
    sportsFacility: 'Stadion miejski w Białymstoku',
    remarks: ''
  },
])

const events = computed(() => {
  var newEvents = <Array<any>>([])
  switch (eventsType.value) {
    case 'trainings':
      for (let training of trainings.value) {
        const event = {
          id: training.id,
          type: 'Training',
          startDate: training.date,
          team: training.team,
          sportsFacility: training.sportsFacility,
          remarks: training.remarks,
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
      }
      break
    case 'matches':
      for (let match of matches.value) {
        const event = {
          id: match.id,
          type: 'Match',
          startDate: match.date,
          team: match.team,
          goalsConceded: match.goalsConceded,
	        goalsScored: match.goalsScored,
          sportsFacility: match.sportsFacility,
          opponent: match.opponent,
          remarks: match.remarks,
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
      }
      break
    case 'tournaments':
      for (let tournament of tournaments.value) {
        const event = {
          id: tournament.id,
          type: 'Tournament',
          startDate: tournament.startDate,
          endDate: tournament.endDate,
          team: tournament.team,
          sportsFacility: tournament.sportsFacility,
          remarks: tournament.remarks,
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
      }
      break
    case 'all':
      for (let training of trainings.value) {
        const event = {
          id: training.id,
          type: 'Training',
          startDate: training.date,
          team: training.team,
          sportsFacility: training.sportsFacility,
          remarks: training.remarks,
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
      }
      for (let match of matches.value) {
        const event = {
          id: match.id,
          type: 'Match',
          startDate: match.date,
          team: match.team,
          sportsFacility: match.sportsFacility,
          goalsConceded: match.goalsConceded,
	        goalsScored: match.goalsScored,
          opponent: match.opponent,
          remarks: match.remarks,
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
      }
      for (let tournament of tournaments.value) {
        const event = {
          id: tournament.id,
          type: 'Tournament',
          startDate: tournament.startDate,
          endDate: tournament.endDate,
          team: tournament.team,
          sportsFacility: tournament.sportsFacility,
          remarks: tournament.remarks,
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
      }
  }
  newEvents.sort(function (a: any, b: any) {
    if (a.startDate.getHours() < b.startDate.getHours()) return -1
    else if (a.startDate.getHours() > b.startDate.getHours()) return 1
    if (a.startDate.getMinutes() < b.startDate.getMinutes()) return -1
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
  return router.push(`/events/edit/${eventId}`)
}

const goAddEvent = () => {
  return router.push(`/events/day/add/newEvent/${props.date}`)
}

const goToEvent = (eventId: any) => {
  return router.push(`/events/${eventId}`)
}

const showAttendanceList = (eventId: any) => {
  return router.push(`/events/attendanceList/${eventId}`)
}

const showMatchStatistic = (eventId: any) => {
  return router.push(`/events/statistic/match/${eventId}`)
}
</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <div class=" w-full h-full flex flex-col p-4 gap-4">
        <div class="w-full flex flex-row justify-end gap-8 flex-wrap sm:(flex-nowrap)">
          <button class="flex flex-row gap-2" @click="filterMenu">
            <img src="../../../assets/filter-icon.png" class="h-48px" />
            <p v-if="isHidden" class="h-full flex items-center text-base font-bold color-#464646">{{
            t('button.show-filters')}}</p>
            <p v-else class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.hide-filters')}}
            </p>
          </button>
          <button @click="goAddEvent()" class="flex flex-row gap-2">
            <img src="../../../assets/add-icon2.png" class="h-48px" />
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
        <MyCenterElement class="xl:(px-300px) lg:(200px)">
          <template v-slot>
            <MiniWhiteFrame v-for="event in events" v-bind:key="event.id" class="hover:bg-#E3E3E3 w-full"
              clickable="cursor-pointer" @go-to="goToEvent(event.id)">
              <template v-slot:nav>
                <button @click="showAttendanceList(event.id)">
                  <img src="../../../assets/attendance-list-icon.png" class="h-24px" />
                </button>
                <button v-if="event.type === 'Match'" @click="showMatchStatistic(event.id)">
                  <img src="../../../assets/statistic-icon.png" class="h-24px" />
                </button>
                <button @click="goEditEvent(event.id)">
                  <img src="../../../assets/edit-icon.png" class="h-24px" />
                </button>
                <button>
                  <img src="../../../assets/delete-icon.png" class="h-24px" />
                </button>
              </template>
              <template v-slot:icon>
                <img v-if="event.type == 'Match'" src="../../../assets/calendar-icon-purple.png" class="h-150px" />
                <img v-else-if="event.type == 'Tournament'" src="../../../assets/calendar-icon-purple-light.png"
                  class="h-150px" />
                <img v-else-if="event.type == 'Training'" src="../../../assets/calendar-icon-green.png"
                  class="h-150px" />
              </template>
              <template v-slot:attributes>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.type') }}:</template>
                  <template v-slot:attributeValue>{{ event.type }}</template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type !== 'Tournament'">
                  <template v-slot:attributeName>{{ t('single-event.date') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.startDate.toLocaleDateString(locale) }}
                  </template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Tournament'">
                  <template v-slot:attributeName>{{ t('single-event.start-date') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.startDate.toLocaleDateString(locale) }}
                  </template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Tournament'">
                  <template v-slot:attributeName>{{ t('single-event.end-date') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.endDate.toLocaleDateString(locale) }}
                  </template>
                </SingleAttribute>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.hour') }}:</template>
                  <template v-slot:attributeValue>{{ event.hour }}:{{ event.minutes
                  }}</template>
                </SingleAttribute>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.team') }}:</template>
                  <template v-slot:attributeValue>{{ event.team }}</template>
                </SingleAttribute>
                <SingleAttribute>
                  <template v-slot:attributeName>{{ t('single-event.object') }}:</template>
                  <template v-slot:attributeValue>{{ event.sportsFacility }}</template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Match'">
                  <template v-slot:attributeName>{{ t('single-event.opponent') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.opponent }}
                  </template>
                </SingleAttribute>
                <SingleAttribute v-if="event.type === 'Match'">
                  <template v-slot:attributeName>{{ t('single-event.result') }}:</template>
                  <template v-slot:attributeValue>
                    {{ event.goalsScored }} : {{ event.goalsConceded }}
                  </template>
                </SingleAttribute>
                <SingleAttribute v-if="event.remarks != ''">
                  <template v-slot:attributeName>{{ t('single-event.remarks') }}:</template>
                  <template v-slot:attributeValue>{{ event.remarks }}</template>
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