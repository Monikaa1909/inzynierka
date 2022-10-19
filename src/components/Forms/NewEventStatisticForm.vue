<script setup lang="ts">

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales

locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
  id: {
    type: String,
    require: true
  },
  eventType: {
    type: String,
    require: true
  }
})

const statistics = ref([
  {
    id: 'matchstatisticsid1',
    player: 'Dominik Kowalski',
    match: props.id,
    attendance: true,
    goalsScored: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid2',
    player: 'Andrzej Kowalski',
    match: props.id,
    attendance: true,
    goalsScored: 5,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 45,
    remarks: ''
  },
  {
    id: 'matchstatisticsid3',
    player: 'Janusz Kowalski',
    match: props.id,
    attendance: true,
    goalsScored: 6,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 11,
    remarks: ''
  },
  {
    id: 'matchstatisticsid4',
    player: 'Wiesław Kowalski',
    match: props.id,
    attendance: false,
    goalsScored: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    remarks: ''
  },
  {
    id: 'matchstatisticsid5',
    player: 'Janusz',
    match: props.id,
    attendance: false,
    goalsScored: 0,
    yellowCards: 1,
    redCards: 1,
    minutesPlayed: 90,
    remarks: ''
  },
  {
    id: 'matchstatisticsid6',
    player: 'Janusz Kowalski',
    match: props.id,
    attendance: true,
    goalsScored: 1,
    yellowCards: 2,
    redCards: 1,
    minutesPlayed: 50,
    remarks: ''
  },
  {
    id: 'matchstatisticsid7',
    player: 'Janusz Kowalski',
    match: props.id,
    attendance: true,
    goalsScored: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 40,
    remarks: ''
  },
])

const sortedStatistic = computed(() => {
  statistics.value.sort(function (a: any, b: any) {
    if (a.player < b.player) return -1
    else return 1
  })
  return statistics.value
})

const match = ref(
  {
    id: 'matchesid1',
    goalsConceded: 2,
    goalsScored: 0,
    duration: 80,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 10, 12, 10, 5),
    team: 'Trampkarz C2',
    sportsFacility: 'Stadion miejski w Białymstoku',
    remarks: 'Zadzwonić potwierdzić boisko'
  },
)

const tournament = ref(
  {
    id: 'tournamentid1',
    startDate: new Date(2022, 10, 12, 10, 5),
    endDate: new Date(2022, 11, 12, 10, 5),
    team: 'Trampkarz C2',
    sportsFacility: 'Stadion miejski w Białymstoku',
    remarks: '',
    description: 'Fajny turniej'
  },
)

var goalsNumber: number[] = []
for (let i = 0; i < 50; i++) {
  goalsNumber[i] = i
}

var minutesNumber: number[] = []
for (let i = 0; i < 120; i++) {
  minutesNumber[i] = i
}

</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div v-if="props.eventType === 'Match'" class="flex flex-row gap-2 w-full px-2">
        <p class="font-medium">{{ t('single-event.result')}}: </p>
        <select class="flex border-1 border-#143547 text-xs shadow-lg" v-model="match.goalsScored">
          <option v-for="number in goalsNumber">{{number}}
          </option>
        </select>
        <p class="font-medium">:</p>
        <select class="flex border-1 border-#143547 text-xs shadow-lg" v-model="match.goalsConceded">
          <option v-for="number in goalsNumber">{{number}}
          </option>
        </select>
      </div>
      <div v-else class="flex flex-row gap-2 w-full px-2">
        <p class="font-medium">{{ t('single-event.description')}}: </p>
        <textarea v-model="tournament.description" type="textarea" placeholder=""
          class="flex w-full border-1 border-#143547 shadow-lg px-1"></textarea>
      </div>
    </div>

    <div class="h-full w-full grid gap-2 px-2">
      <div class="h-full w-full grid grid-cols-7 invisible md:(visible)">
        <div class="self-center justify-self-center font-medium text-xs">
          {{ t('match-statistic.player')}}
        </div>
        <div class="self-center justify-self-center  font-medium text-xs">
          {{ t('match-statistic.attendance') }}
        </div>
        <div class="self-center justify-self-center  font-medium text-xs">
          {{ t('match-statistic.goals-scored') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">
          {{ t('match-statistic.yellow-cards') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">
          {{ t('match-statistic.red-cards') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">
          {{ t('match-statistic.minutes-played') }}
        </div>
        <div class="self-center justify-self-center font-medium text-xs">
          {{ t('match-statistic.remarks') }}
        </div>
      </div>
      <div v-for="statistic in sortedStatistic" v-bind:key="statistic.id"
        class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

        <div class="self-center justify-self-center font-medium text-xs block md:(hidden)">
          {{t('match-statistic.player') }}
        </div>
        <div class="self-center justify-self-center col-span-1 text-xs md:()">{{statistic.player}}
        </div>
        <div class="self-center justify-self-center font-medium text-xs block md:(hidden)">{{
        t('match-statistic.attendance') }}</div>
        <div class="self-center justify-self-center text-xs">
          <button @click="statistic.attendance = !statistic.attendance">
            <img v-if="statistic.attendance" src="../../assets/checkbox-checked-icon.png" class="h-18px" />
            <img v-else src="../../assets/checkbox-unchecked-icon.png" class="h-18px" />
          </button>
        </div>

        <div class="self-center justify-self-center  font-medium text-xs block md:(hidden)">{{
        t('match-statistic.goals-scored') }}</div>
        <div v-if="statistic.attendance" class="self-center justify-self-center font-medium text-xs flex flex-col">
          <select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.goalsScored">
            <option v-for="number in goalsNumber">{{number}}
            </option>
          </select>
        </div>
        <div v-else class="self-center justify-self-center font-medium text-xs flex flex-col"></div>

        <div class="self-center justify-self-center  font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.yellow-cards') }}</div>
        <div v-if="statistic.attendance" class="self-center justify-self-center font-medium text-xs flex flex-col">
          <select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.yellowCards">
            <option :value="0">0</option>
            <option :value="1">1</option>
            <option :value="2">2</option>
          </select>
        </div>
        <div v-else class="self-center justify-self-center font-medium text-xs flex flex-col"></div>

        <div class="self-center justify-self-center font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.red-cards') }}</div>
        <div v-if="statistic.attendance" class="self-center justify-self-center font-medium text-xs flex flex-col">
          <select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.redCards">
            <option :value="0">0</option>
            <option :value="1">1</option>
          </select>
        </div>
        <div v-else class="self-center justify-self-center font-medium text-xs flex flex-col"></div>

        <div class="self-center justify-self-center  font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.minutes-played') }}</div>
        <div v-if="statistic.attendance" class="self-center justify-self-center font-medium text-xs flex flex-col">
          <select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.minutesPlayed">
            <option v-for="number in minutesNumber">{{number}}
            </option>
          </select>
        </div>
        <div v-else class="self-center justify-self-center font-medium text-xs flex flex-col"></div>

        <div class="self-center justify-self-center font-medium text-xs block sm:(hidden)">{{
        t('match-statistic.remarks') }}</div>
        <div class="self-center justify-self-center text-xs">
          <textarea v-model="statistic.remarks" type="textarea" placeholder=""
            class="flex flex-auto w-full border-1 h-18px border-#143547 shadow-lg px-1"></textarea>
        </div>

        <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
          <img src="../../assets/line-icon.png" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

