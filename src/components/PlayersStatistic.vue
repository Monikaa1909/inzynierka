<script setup lang="ts">

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales

locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
  isHidden: {
    type: Boolean,
    requie: false
  }
})

const statistics = ref([
  {
    id: 'matchstatisticsid1',
    player: 'Dominik Kowalski',
    match: 'statisticid1',
    attendance: 100,
    goalsScored: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid2',
    player: 'Andrzej Kowalski',
    match: 'statisticid2',
    attendance: 70,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid3',
    player: 'Janusz Kowalski',
    match: 'statisticid3',
    attendance: 90,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid4',
    player: 'Wiesław Kowalski',
    match: 'statisticid4',
    attendance: 60,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid5',
    player: 'Janusz',
    match: 'statisticid5',
    attendance: 44,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid6',
    player: 'Janusz Kowalski',
    match: 'statisticid6',
    attendance: 77,
    goalsScored: 1,
    yellowCards: 2,
    redCards: 1,
    minutesPlayed: 50,
    remarks: ''
  },
  {
    id: 'matchstatisticsid7',
    player: 'Janusz Kowalski',
    match: 'statisticid7',
    attendance: 89,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
  {
    id: 'matchstatisticsid8',
    player: 'Dominik Kowalski',
    match: 'statisticid1',
    attendance: 100,
    goalsScored: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid9',
    player: 'Andrzej Kowalski',
    match: 'statisticid2',
    attendance: 70,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid10',
    player: 'Janusz Kowalski',
    match: 'statisticid3',
    attendance: 90,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid11',
    player: 'Wiesław Kowalski',
    match: 'statisticid4',
    attendance: 60,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid12',
    player: 'Janusz',
    match: 'statisticid5',
    attendance: 44,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid13',
    player: 'Janusz Kowalski',
    match: 'statisticid6',
    attendance: 77,
    goalsScored: 1,
    yellowCards: 2,
    redCards: 1,
    minutesPlayed: 50,
    remarks: ''
  },
  {
    id: 'matchstatisticsid14',
    player: 'Janusz Kowalski',
    match: 'statisticid7',
    attendance: 89,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
  {
    id: 'matchstatisticsid15',
    player: 'Dominik Kowalski',
    match: 'statisticid1',
    attendance: 100,
    goalsScored: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid16',
    player: 'Andrzej Kowalski',
    match: 'statisticid2',
    attendance: 70,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid17',
    player: 'Janusz Kowalski',
    match: 'statisticid3',
    attendance: 90,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid18',
    player: 'Wiesław Kowalski',
    match: 'statisticid4',
    attendance: 60,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid19',
    player: 'Janusz',
    match: 'statisticid5',
    attendance: 44,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid20',
    player: 'Janusz Kowalski',
    match: 'statisticid6',
    attendance: 77,
    goalsScored: 1,
    yellowCards: 2,
    redCards: 1,
    minutesPlayed: 50,
    remarks: ''
  },
  {
    id: 'matchstatisticsid21',
    player: 'Janusz Kowalski',
    match: 'statisticid7',
    attendance: 89,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
])

const sortedStatistic = computed(() => {
  console.log(sortType.value)
  switch (sortType.value) {
    case 'all':
      statistics.value.sort(function (a: any, b: any) {
        if (a.player < b.player) return -1
        else return 1
      })
      return statistics.value
    case 'attendance':
      statistics.value.sort(function (a: any, b: any) {
        if (a.attendance > b.attendance) return -1
        else return 1
      })
      return statistics.value
    case 'goalsScored':
      statistics.value.sort(function (a: any, b: any) {
        if (a.goalsScored > b.goalsScored) return -1
        else return 1
      })
      return statistics.value
    case 'yellowCards':
      statistics.value.sort(function (a: any, b: any) {
        if (a.yellowCards > b.yellowCards) return -1
        else return 1
      })
      return statistics.value
    case 'redCards':
      statistics.value.sort(function (a: any, b: any) {
        if (a.redCards > b.redCards) return -1
        else return 1
      })
      return statistics.value
    case 'minutesPlayed':
      statistics.value.sort(function (a: any, b: any) {
        if (a.minutesPlayed > b.minutesPlayed) return -1
        else return 1
      })
      return statistics.value
  }
})

const sortType = ref('all')
function changeSorting(newSortType: any) {
  sortType.value = newSortType
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <StatisticSortOptions @changeSorting="changeSorting" v-if="!props.isHidden" ></StatisticSortOptions>
    <div class="h-full w-full grid gap-2 px-2 border">
      <div class="h-full w-full grid grid-cols-6 invisible md:(visible)">
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.player')
        }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.attendance') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.goals-scored') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.yellow-cards') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.red-cards') }}</div>
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.minutes-played') }}
        </div>
      </div>
      <div v-for="statistic in sortedStatistic" v-bind:key="statistic.id"
        class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-6 gap-0)">
        <div class="self-center justify-self-center font-medium text-xs block md:(hidden)">{{
        t('match-statistic.player') }}</div>
        <div class="self-center justify-self-center col-span-1 text-xs md:()">{{statistic.player}}
        </div>
        <div class="self-center justify-self-center font-medium text-xs block md:(hidden)">{{
        t('match-statistic.attendance') }}</div>
        <div class="self-center justify-self-center text-xs">{{statistic.attendance}}%</div>
        <div class="self-center justify-self-center  font-medium text-xs block md:(hidden)">{{
        t('match-statistic.goals-scored') }}</div>
        <div class="self-center justify-self-center text-xs">{{statistic.goalsScored}}</div>
        <div class="self-center justify-self-center  font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.yellow-cards') }}</div>
        <div class="self-center justify-self-center text-xs">{{statistic.yellowCards}}</div>
        <div class="self-center justify-self-center font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.red-cards') }}</div>
        <div class="self-center justify-self-center text-xs">{{statistic.redCards}}</div>
        <div class="self-center justify-self-center  font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.minutes-played') }}</div>
        <div class="self-center justify-self-center  text-xs">{{statistic.minutesPlayed}}
        </div>
        <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
          <img src="../assets/line-icon.png" class="w-full" />
        </div>
      </div>
      <div class="h-full w-full grid grid-cols-6 invisible md:(visible)">
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.sum')}}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">
        </div>
        <div class="self-center justify-self-center font-medium text-xs">20
        </div>
        <div class="self-center justify-self-center font-medium text-xs">13
        </div>
        <div class="self-center justify-self-center font-medium text-xs">4</div>
        <div class="self-center justify-self-center font-medium text-xs">1167
        </div>
      </div>
      <div class="h-full w-full grid grid-cols-6 invisible md:(visible)">
        <div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.average')}}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">86%
        </div>
        <div class="self-center justify-self-center font-medium text-xs">2.5
        </div>
        <div class="self-center justify-self-center font-medium text-xs">1
        </div>
        <div class="self-center justify-self-center font-medium text-xs">0</div>
        <div class="self-center justify-self-center font-medium text-xs">76
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

