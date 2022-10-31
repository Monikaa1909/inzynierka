<script setup lang="ts">
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Match } from 'backend/database/schemas/Match'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string, eventType: string }>()

const url = computed(() => {
  if (props.eventType === 'Match')
    return `/api/match/${props.id}`
  else if (props.eventType === 'Tournament')
    return `/api/match/${props.id}`
  else
    return `/api/match/${props.id}`
})

const {
  data: eventData,
  isFetching,
  isFinished,
  error,
} = useFetch(url, { initialData: {} }).json<Match | Tournament | Training>()

  let event = {
      id: '',
      type: '',
      date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      team: undefined,
      goalsConceded: 0,
      goalsScored: 0,
      sportsFacility: undefined,
      opponent: '',
      remarks: '',
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

whenever(eventData, (data) => {
  if (props.eventType === 'Match') {
    event = {
      id: data._id,
      type: 'Match',
      date: data.date,
      team: data.team.teamName,
      goalsConceded: data.goalsConceded ? data.goalsConceded : 0,
      goalsScored: data.goalsScored ? data.goalsScored : 0,
      sportsFacility: data.sportsFacility?.name,
      opponent: data.opponent ? data.opponent : '-',
      remarks: data.remarks ? data.remarks : '-',
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
  } else if (props.eventType === 'Training') {
     event = {
      id: data._id,
      type: 'Match',
      date: data.date,
      team: data.team.teamName,
      goalsConceded: data.goalsConceded ? data.goalsConceded : 0,
      goalsScored: data.goalsScored ? data.goalsScored : 0,
      sportsFacility: data.sportsFacility?.name,
      opponent: data.opponent ? data.opponent : '-',
      remarks: data.remarks ? data.remarks : '-',
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
  } else {
     event = {
      id: data._id,
      type: 'Tournament',
      tournamentName: data.tournamentName ? data.tournamentName : '-',
      startDate: data.startDate,
      endDate: data.endDate,
      friendly: data.friendly,
      team: data.team.teamName,
      sportsFacility: data.sportsFacility?.name,
      remarks: data.remarks ? data.remarks : '-',
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
  }
})

const goEditEvent = (eventId: any) => {
  return router.push(`/events/edit/${eventId}`)
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
    <template #data>

      <!-- <LoadingCircle v-else-if="isFetching"></LoadingCircle> -->

      <MyCenterElement>
        <MyCenterElement>
          <template v-slot>
            <MiniWhiteFrame>
              <template v-slot:nav>
                <button @click="showAttendanceList(props.id)">
                  <img src="../../assets/attendance-list-icon.png" class="h-24px" />
                </button>
                <button v-if="event.type === 'Match'" @click="showMatchStatistic(props.id)">
                  <img src="../../assets/statistic-icon.png" class="h-24px" />
                </button>
                <button @click="goEditEvent(event.id)">
                  <img src="../../assets/edit-icon.png" class="h-24px" />
                </button>
                <button>
                  <img src="../../assets/delete-icon.png" class="h-24px" />
                </button>
              </template>
              <template v-slot:icon>
                <img v-if="event.type == 'Match'" src="../../assets/match-icon2.png" class="h-150px" />
                <img v-else-if="event.type == 'Tournament'" src="../../assets/tournament-icon.png" class="h-150px" />
                <img v-else-if="event.type == 'Training'" src="../../assets/training-icon.png" class="h-150px" />
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
              <template v-slot:footer>
                <SingleButton @click="router.go(-1)">
                  <template v-slot:buttonName>{{ t('button.back') }}</template>
                </SingleButton>
              </template>
            </MiniWhiteFrame>
          </template>
        </MyCenterElement>
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>