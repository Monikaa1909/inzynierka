<script setup lang="ts">
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { Player } from 'backend/database/schemas/Player'
import { Match } from 'backend/database/schemas/Match'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const matchStatistic = ref([] as MatchStatistic[])
const playerStatistic = ref({} as MatchStatistic)
const match = ref(<Match>({}))

const playerUrl = ref(``)

const {
  data: matchData,
  isFetching: isMatchFetching,
  isFinished: isMatchFinished,
  error: matchError,
} = useFetch(`/api/match/${props.id}`, { initialData: {} }).json<Match>()

whenever(matchData, (data) => {
  match.value = data
  match.value.date = new Date(match.value.date) as unknown as Date
  playerUrl.value = `/api/players/team/${data.team._id}`
})

const {
  data: matchStatisticData,
  isFetching: isMatchStatisticFetching,
  isFinished: isMatchStatisticFinished,
  error: matchStatisticError,
  execute: refechMatchStatistic
} = useFetch(`/api/matchStatistic/${props.id}`, { initialData: [] }).json<MatchStatistic[]>()

const {
  data: players,
  isFetching: isPlayersFetching,
  error: playersError,
  execute: refechPlayers
} = useFetch(playerUrl, { initialData: [], immediate: false }).json<Player[]>()

whenever(matchStatisticData, (data) => {
  matchStatistic.value = data
  if (matchStatistic.value.length === 0) {
    refechPlayers()
  }
})

whenever(players, (data) => {
  if (data.length > 0) {
    data.forEach(async element => {
      playerStatistic.value.player = element
      playerStatistic.value.match = match as unknown as Match
      const { execute: savePlayerStatistic, error: saveError } = useFetch(`/api/matchStatistic`, { immediate: false }).post(playerStatistic)
      await savePlayerStatistic()
      if (saveError.value) {
        alert(t('error-messages.unknow-error'))
        return
      }
      refechMatchStatistic()
    })
  }
})

const isFinished = computed(() => {
  return isMatchFinished.value && isMatchStatisticFinished.value
})

const isFetching = computed(() => {
  return isMatchFetching.value || isMatchStatisticFetching.value || isPlayersFetching.value
})

const error = computed(() => {
  return matchError.value && matchStatisticError.value && playersError.value
})

const isHidden = ref(true)
const sortType = ref('all')

function changeSorting(newSortType: any) {
  sortType.value = newSortType
}

const goEditMatchStatistic = (eventId: any) => {
  return router.push(`/events/statistic/match/edit/${eventId}`)
}

const sortedStatistic = computed(() => {
  matchStatistic.value.forEach(element => {
    if (!element.attendance) {
      element.goalsScored = 0
      element.yellowCards = 0
      element.redCards = 0
      element.minutesPlayed = 0
    }
  })

  switch (sortType.value) {
    case 'playersUp':
      console.log('playersUp')
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.player.lastName < b.player.lastName) return 1
        else return -1
      })
      return matchStatistic.value
    case 'playersDown':
      console.log('playersDown')
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.player.lastName < b.player.lastName) return -1
        else return 1
      })
      return matchStatistic.value
    case 'attendanceDown':

      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.attendance > b.attendance) return 1
        else return -1
      })
      return matchStatistic.value
    case 'attendanceUp':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.attendance > b.attendance) return -1
        else return 1
      })
      return matchStatistic.value
    case 'goalsScoredDown':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.goalsScored > b.goalsScored) return 1
        else if (a.goalsScored < b.goalsScored) return -1
        else if (!a.attendance && b.attendance) return -1
        else return 1
      })
      return matchStatistic.value
    case 'goalsScoredUp':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.goalsScored > b.goalsScored) return -1
        else if (a.goalsScored < b.goalsScored) return 1
        else if (!a.attendance && b.attendance) return 1
        else return -1
      })
      return matchStatistic.value
    case 'yellowCardsDown':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.yellowCards > b.yellowCards) return 1
        else if (a.yellowCards < b.yellowCards) return -1
        else if (!a.attendance && b.attendance) return -1
        else return 1
      })
      return matchStatistic.value
    case 'yellowCardsUp':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.yellowCards > b.yellowCards) return -1
        else if (a.yellowCards < b.yellowCards) return 1
        else if (!a.attendance && b.attendance) return 1
        else return -1
      })
      return matchStatistic.value
    case 'redCardsDown':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.redCards > b.redCards) return 1
        else if (a.redCards < b.redCards) return -1
        else if (!a.attendance && b.attendance) return -1
        else return 1
      })
      return matchStatistic.value
    case 'redCardsUp':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.redCards > b.redCards) return -1
        else if (a.redCards < b.redCards) return 1
        else if (!a.attendance && b.attendance) return 1
        else return -1
      })
      return matchStatistic.value
    case 'minutesPlayedDown':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.minutesPlayed > b.minutesPlayed) return 1
        else if (a.minutesPlayed < b.minutesPlayed) return -1
        else if (!a.attendance && b.attendance) return -1
        else return 1
      })
      return matchStatistic.value
    case 'minutesPlayedUp':
      matchStatistic.value.sort(function (a: any, b: any) {
        if (a.minutesPlayed > b.minutesPlayed) return -1
        else if (a.minutesPlayed < b.minutesPlayed) return 1
        else if (!a.attendance && b.attendance) return 1
        else return -1
      })
      return matchStatistic.value
    default:
      return matchStatistic.value
  }
})

</script>

<template>
  <MiniWhiteFrame>

    <template #nav>
      <button @click="isHidden = !isHidden">
        <img src="../assets/filter-icon.png" class="h-24px" />
      </button>
      <button @click="goEditMatchStatistic(props.id)">
        <img src="../assets/edit-icon.png" class="h-24px" />
      </button>
    </template>

    <template #icon>
      <img src="../assets/statistic-icon2.png" class="h-150px" />
    </template>

    <template #attributes>

      <LoadingCircle v-if="isFetching"></LoadingCircle>

      <!-- <ErrorMessageInfo v-else-if="!error && isFinished && players?.length === 0 && attendanceList.length === 0"></ErrorMessageInfo> -->
      <!-- <ErrorMessageInfo v-else-if="!error && isFinished && (!match || players?.length === 0)">
        {{ t('error-messages.no-players-in-team') }}
      </ErrorMessageInfo> -->

      <div v-else-if="isFinished && !error" class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

        <StatisticSortOptions :statisticType="'match'" @changeSorting="changeSorting" v-if="!isHidden">
        </StatisticSortOptions>

        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 w-full px-2">
            <p class="font-medium">{{ t('single-event.result') }}: </p>
            <p>{{ match.goalsScored }}:{{ match.goalsConceded }}</p>
          </div>
          <div class="flex flex-row gap-2 w-full px-2">
            <p class="font-medium">{{ t('single-event.duration') }}: </p>
            <p>{{ match.duration }} {{ t('single-event.minutes') }}</p>
          </div>
        </div>

        <div class="h-full w-full grid gap-2 px-2">

          <div class="h-full w-full grid  invisible md:(visible) grid-cols-7">
            <StatisticHeader> {{ t('match-statistic.player') }} </StatisticHeader>
            <StatisticHeader> {{ t('match-statistic.attendance') }} </StatisticHeader>
            <StatisticHeader> {{ t('match-statistic.goals-scored') }} </StatisticHeader>
            <StatisticHeader> {{ t('match-statistic.yellow-cards') }} </StatisticHeader>
            <StatisticHeader> {{ t('match-statistic.red-cards') }}</StatisticHeader>
            <StatisticHeader> {{ t('match-statistic.minutes-played') }} </StatisticHeader>
            <StatisticHeader> {{ t('match-statistic.remarks') }}</StatisticHeader>
          </div>

          <div v-if="matchStatistic.length != 0" v-for="statistic in sortedStatistic" v-bind:key="statistic._id"
            class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

            <SingleStatistic>
              <template #name>{{ t('match-statistic.player') }}</template>
              <template #data>{{ statistic.player.lastName }} {{ statistic.player.firstName }}</template>
            </SingleStatistic>

            <SingleStatistic>
              <template #name>{{ t('match-statistic.attendance') }}</template>
              <template #data>
                <div>
                  <img v-if="statistic.attendance" src="../assets/checkbox-checked-icon.png" class="h-18px" />
                  <img v-else src="../assets/checkbox-unchecked-icon.png" class="h-18px" />
                </div>
              </template>
            </SingleStatistic>

            <SingleStatistic>
              <template #name>{{ t('match-statistic.goals-scored') }}</template>
              <template #data v-if="statistic.attendance">{{ statistic.goalsScored }}</template>
            </SingleStatistic>

            <SingleStatistic>
              <template #name>{{ t('match-statistic.yellow-cards') }}</template>
              <template #data v-if="statistic.attendance">{{ statistic.yellowCards }}</template>
            </SingleStatistic>

            <SingleStatistic>
              <template #name>{{ t('match-statistic.red-cards') }}</template>
              <template #data v-if="statistic.attendance">{{ statistic.redCards }}</template>
            </SingleStatistic>

            <SingleStatistic>
              <template #name>{{ t('match-statistic.minutes-played') }}</template>
              <template #data v-if="statistic.attendance">{{ statistic.minutesPlayed }}</template>
            </SingleStatistic>

            <SingleStatistic>
              <template #name>{{ t('match-statistic.remarks') }}</template>
              <template #data>{{ statistic.remarks }}</template>
            </SingleStatistic>

            <div class="self-center justify-self-center col-span-2 block md:(hidden)">
              <img src="../assets/line-icon.png" class="w-full" />
            </div>
          </div>

          <div v-if="matchStatistic.length != 0" class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

            <SingleSummaryStatistic>
              <template #name></template>
              <template #data>{{ t('match-statistic.sum') }}</template>
            </SingleSummaryStatistic>

            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.attendance') }}</template>
              <template #data>78%</template>
            </SingleSummaryStatistic>

            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.goals-scored') }}</template>
              <template #data>34</template>
            </SingleSummaryStatistic>

            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.yellow-cards') }}</template>
              <template #data>7</template>
            </SingleSummaryStatistic>

            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.red-cards') }}</template>
              <template #data>3</template>
            </SingleSummaryStatistic>

            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.minutes-played') }}</template>
              <template #data>1176</template>
            </SingleSummaryStatistic>

            <SingleSummaryStatistic>
              <template #name></template>
              <template #data></template>
            </SingleSummaryStatistic>

            <div class="self-center justify-self-center col-span-2 block md:(hidden)">
              <img src="../assets/line-icon.png" class="w-full" />
            </div>
          </div>

          <div v-if="matchStatistic.length != 0" class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">
            <SingleSummaryStatistic>
              <template #name></template>
              <template class="font-medium" #data>{{ t('match-statistic.average') }}</template>
            </SingleSummaryStatistic>
            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.attendance') }}</template>
              <template #data>78%</template>
            </SingleSummaryStatistic>
            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.goals-scored') }}</template>
              <template #data>34</template>
            </SingleSummaryStatistic>
            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.yellow-cards') }}</template>
              <template #data>7</template>
            </SingleSummaryStatistic>
            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.red-cards') }}</template>
              <template #data>3</template>
            </SingleSummaryStatistic>
            <SingleSummaryStatistic>
              <template #name>{{ t('match-statistic.minutes-played') }}</template>
              <template #data>1176</template>
            </SingleSummaryStatistic>
            <SingleSummaryStatistic>
              <template #name></template>
              <template #data></template>
            </SingleSummaryStatistic>
            <div class="self-center justify-self-center col-span-2 block md:(hidden)">
              <img src="../assets/line-icon.png" class="w-full" />
            </div>
          </div>

          <ErrorMessageInfo v-else>
            {{ t('error-messages.no-players-in-team') }}
          </ErrorMessageInfo>
        </div>

      </div>

    </template>

    <template #footer>
      <SingleButton @click="router.go(-1)">
        <template #buttonName>{{ t('button.back') }}</template>
      </SingleButton>
    </template>

  </MiniWhiteFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>