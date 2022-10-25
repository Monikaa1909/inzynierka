<script setup lang="ts">

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales

locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
  sortType: {
    type: String,
    requie: false,
    default: 'playersDown'
  },
  statisticType: {
    type: String,
    require: false,
    default: 'all'
  }
})

const statistics = ref([
  {
    id: 'matchstatisticsid1',
    player: 'Robert Lewandowski',
    match: 'statisticid1',
    attendance: '100',
    attendance2: true,
    goalsScored: 32,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid2',
    player: 'Erling Haaland',
    match: 'statisticid2',
    attendance: 70,
    attendance2: true,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid3',
    player: 'Karim Benzema',
    match: 'statisticid3',
    attendance: 90,
    attendance2: true,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid4',
    player: 'Wojciech Szczęsny',
    match: 'statisticid4',
    attendance: 60,
    attendance2: true,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid5',
    player: 'Grzegorz',
    match: 'Krychowiak',
    attendance: 44,
    attendance2: false,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid6',
    player: 'Matthew Cash',
    match: 'statisticid6',
    attendance: 77,
    attendance2: true,
    goalsScored: 1,
    yellowCards: 2,
    redCards: 1,
    minutesPlayed: 50,
    remarks: ''
  },
  {
    id: 'matchstatisticsid7',
    player: 'Leo Messi',
    match: 'statisticid7',
    attendance: 89,
    attendance2: false,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
  {
    id: 'matchstatisticsid8',
    player: 'Kylian Mbappe',
    match: 'statisticid1',
    attendance: 100,
    attendance2: false,
    goalsScored: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid9',
    player: 'Kamil Glik',
    match: 'statisticid2',
    attendance: 70,
    attendance2: true,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid10',
    player: 'Kamil Grosicki',
    match: 'statisticid3',
    attendance: 90,
    attendance2: true,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid11',
    player: 'Marco Reus',
    match: 'statisticid4',
    attendance: 60,
    attendance2: true,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid12',
    player: 'Manuel',
    match: 'Neuer',
    attendance: 44,
    attendance2: true,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid13',
    player: 'Cristiano Ronaldo',
    match: 'statisticid6',
    attendance: 77,
    attendance2: true,
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
    attendance2: true,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
  {
    id: 'matchstatisticsid15',
    player: 'Piotr Zieliński',
    match: 'statisticid1',
    attendance: 100,
    attendance2: true,
    goalsScored: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid16',
    player: 'Neymar',
    match: 'statisticid2',
    attendance: 70,
    attendance2: true,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid17',
    player: 'Paul Pogba',
    match: 'statisticid3',
    attendance: 90,
    attendance2: true,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid18',
    player: 'Sergio Ramos',
    match: 'statisticid4',
    attendance: 60,
    attendance2: true,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid19',
    player: 'Ousmane Dembele',
    match: 'statisticid5',
    attendance: 44,
    attendance2: true,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid20',
    player: 'Antoine Griezmann',
    match: 'statisticid6',
    attendance: 77,
    attendance2: true,
    goalsScored: 1,
    yellowCards: 2,
    redCards: 1,
    minutesPlayed: 50,
    remarks: ''
  },
  {
    id: 'matchstatisticsid21',
    player: 'Zlatan Ibrahimović',
    match: 'statisticid7',
    attendance: 89,
    attendance2: true,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
])

console.log(props.sortType)

const sortedStatistic = computed(() => {
  if (props.statisticType != 'all') {
    statistics.value.forEach(element => {
      if (!element.attendance2) {
        element.goalsScored = 0
        element.yellowCards = 0
        element.redCards = 0
        element.minutesPlayed = 0
      }
    })
  }
  switch (props.sortType) {
    case 'playersUp':
      statistics.value.sort(function (a: any, b: any) {
        if (a.player < b.player) return 1
        else return -1
      })
      return statistics.value
    case 'playersDown':
      statistics.value.sort(function (a: any, b: any) {
        if (a.player < b.player) return -1
        else return 1
      })
      return statistics.value
    case 'attendanceDown':
      statistics.value.sort(function (a: any, b: any) {
        if (a.attendance > b.attendance) return 1
        else return -1
      })
      return statistics.value
    case 'attendanceUp':
      statistics.value.sort(function (a: any, b: any) {
        if (a.attendance > b.attendance) return -1
        else return 1
      })
      return statistics.value
    case 'goalsScoredDown':
      statistics.value.sort(function (a: any, b: any) {
        if (a.goalsScored > b.goalsScored) return 1
        else if (a.goalsScored < b.goalsScored) return -1
        else if (!a.attendance2 && b.attendance2) return -1
        else return 1
      })
      return statistics.value
    case 'goalsScoredUp':
      statistics.value.sort(function (a: any, b: any) {
        if (a.goalsScored > b.goalsScored) return -1
        else if (a.goalsScored < b.goalsScored) return 1
        else if (!a.attendance2 && b.attendance2) return 1
        else return -1
      })
      return statistics.value
    case 'yellowCardsDown':
      statistics.value.sort(function (a: any, b: any) {
        if (a.yellowCards > b.yellowCards) return 1
        else if (a.yellowCards < b.yellowCards) return -1
        else if (!a.attendance2 && b.attendance2) return -1
        else return 1
      })
      return statistics.value
    case 'yellowCardsUp':
      statistics.value.sort(function (a: any, b: any) {
        if (a.yellowCards > b.yellowCards) return -1
        else if (a.yellowCards < b.yellowCards) return 1
        else if (!a.attendance2 && b.attendance2) return 1
        else return -1
      })
      return statistics.value
    case 'redCardsDown':
      statistics.value.sort(function (a: any, b: any) {
        if (a.redCards > b.redCards) return 1
        else if (a.redCards < b.redCards) return -1
        else if (!a.attendance2 && b.attendance2) return -1
        else return 1
      })
      return statistics.value
    case 'redCardsUp':
      statistics.value.sort(function (a: any, b: any) {
        if (a.redCards > b.redCards) return -1
        else if (a.redCards < b.redCards) return 1
        else if (!a.attendance2 && b.attendance2) return 1
        else return -1
      })
      return statistics.value
    case 'minutesPlayedDown':
      statistics.value.sort(function (a: any, b: any) {
        if (a.minutesPlayed > b.minutesPlayed) return 1
        else if (a.minutesPlayed < b.minutesPlayed) return -1
        else if (!a.attendance2 && b.attendance2) return -1
        else return 1
      })
      return statistics.value
    case 'minutesPlayedUp':
      statistics.value.sort(function (a: any, b: any) {
        if (a.minutesPlayed > b.minutesPlayed) return -1
        else if (a.minutesPlayed < b.minutesPlayed) return 1
        else if (!a.attendance2 && b.attendance2) return 1
        else return -1
      })
      return statistics.value
    default :
      return statistics.value
  }
})

</script>

<template>
  <div class="h-full w-full grid gap-2 px-2">
    <div class="h-full w-full grid  invisible md:(visible)"
      :class="[props.statisticType != 'all' ? 'grid-cols-7' : 'grid-cols-6']">
      <StatisticHeader><template v-slot> {{ t('match-statistic.player')}} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.attendance') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.goals-scored') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.yellow-cards') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.red-cards') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.minutes-played') }} </template></StatisticHeader>
      <StatisticHeader v-if="props.statisticType != 'all'"><template v-slot> {{ t('match-statistic.remarks') }}
        </template></StatisticHeader>
    </div>
    <div v-for="statistic in sortedStatistic" v-bind:key="statistic.id" class="h-full w-full grid grid-cols-2 gap-2 "
      :class="[props.statisticType != 'all' ? 'md:(grid-cols-7 gap-0)' : 'md:(grid-cols-6 gap-0)']">
      <SingleStatistic>
        <template v-slot:name>{{ t('match-statistic.player') }}</template>
        <template v-slot:data>{{statistic.player}}</template>
      </SingleStatistic>
      <SingleStatistic v-if="props.statisticType === 'all'">
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>{{statistic.attendance}}%</template>
      </SingleStatistic>
      <SingleStatistic v-else>
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>
          <div>
            <img v-if="statistic.attendance2" src="../../assets/checkbox-checked-icon.png" class="h-18px" />
            <img v-else src="../../assets/checkbox-unchecked-icon.png" class="h-18px" />
          </div>
        </template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.goals-scored') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.goalsScored}}</template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.yellow-cards') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.yellowCards}}</template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.red-cards') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.redCards}}</template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.minutes-played') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.minutesPlayed}}</template>
      </SingleStatistic>
      <SingleStatistic v-if="props.statisticType != 'all'">
        <template v-slot:name>{{t('match-statistic.remarks') }}</template>
        <template v-slot:data>{{statistic.remarks}}</template>
      </SingleStatistic>
      <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
        <img src="../../assets/line-icon.png" class="w-full" />
      </div>
    </div>
    <div v-if="props.statisticType === 'all'" class="h-full w-full grid grid-cols-2 gap-2 "
      :class="[props.statisticType != 'all' ? 'md:(grid-cols-7 gap-0)' : 'md:(grid-cols-6 gap-0)']">
      <SingleSummaryStatistic>
        <template v-slot:name></template>
        <template v-slot:data>{{ t('match-statistic.sum')}}</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>78%</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.goals-scored') }}</template>
        <template v-slot:data>34</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.yellow-cards') }}</template>
        <template v-slot:data>7</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.red-cards') }}</template>
        <template v-slot:data>3</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.minutes-played') }}</template>
        <template v-slot:data>1176</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic v-if="props.statisticType != 'all'">
        <template v-slot:name></template>
        <template v-slot:data></template>
      </SingleSummaryStatistic>
      <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
        <img src="../../assets/line-icon.png" class="w-full" />
      </div>
    </div>
    <div v-if="props.statisticType === 'all'" class="h-full w-full grid grid-cols-2 gap-2"
      :class="[props.statisticType != 'all' ? 'md:(grid-cols-7 gap-0)' : 'md:(grid-cols-6 gap-0)']">
      <SingleSummaryStatistic>
        <template v-slot:name></template>
        <template class="font-medium" v-slot:data>{{ t('match-statistic.average')}}</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>78%</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.goals-scored') }}</template>
        <template v-slot:data>34</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.yellow-cards') }}</template>
        <template v-slot:data>7</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.red-cards') }}</template>
        <template v-slot:data>3</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.minutes-played') }}</template>
        <template v-slot:data>1176</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic v-if="props.statisticType != 'all'">
        <template v-slot:name></template>
        <template v-slot:data></template>
      </SingleSummaryStatistic>
      <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
        <img src="../../assets/line-icon.png" class="w-full" />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

