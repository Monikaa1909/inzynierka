<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  statisticType: {
    type: String,
    require: false,
    default: 'players'
  }
})

const sorting = ref({
  goalsScored: false,
  yellowCards: false,
  redCards: false,
  minutesPlayed: false,
  attendance: false,
  players: true
})

</script>

<template>
  <div class="w-full flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
    <button v-if="!sorting.players" @click="$emit('changeSorting', 'playersDown'), sorting.players = !sorting.players"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.players') }} ↓
      </p>
    </button>
    <button v-else @click="$emit('changeSorting', 'playersUp'), sorting.players = !sorting.players"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.players') }} ↑
      </p>
    </button>
    <button v-if="props.statisticType === 'players' && !sorting.attendance"
      @click="$emit('changeSorting', 'attendanceDown'), sorting.attendance = !sorting.attendance"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.attendance') }} ↓
      </p>
    </button>
    <button v-else-if="props.statisticType === 'players' && sorting.attendance"
      @click="$emit('changeSorting', 'attendanceUp'), sorting.attendance = !sorting.attendance"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.attendance') }} ↑
      </p>
    </button>
    <button v-if="!sorting.goalsScored"
      @click="$emit('changeSorting', 'goalsScoredDown'), sorting.goalsScored = !sorting.goalsScored"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.goals-scored') }} ↓
      </p>
    </button>
    <button v-else @click="$emit('changeSorting', 'goalsScoredUp'), sorting.goalsScored = !sorting.goalsScored"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.goals-scored') }} ↑
      </p>
    </button>
    <button v-if="!sorting.yellowCards"
      @click="$emit('changeSorting', 'yellowCardsDown'), sorting.yellowCards = !sorting.yellowCards"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.yellow-cards') }} ↓
      </p>
    </button>
    <button v-else @click="$emit('changeSorting', 'yellowCardsUp'), sorting.yellowCards = !sorting.yellowCards"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.yellow-cards') }} ↑
      </p>
    </button>
    <button v-if="!sorting.redCards"
      @click="$emit('changeSorting', 'redCardsDown'), sorting.redCards = !sorting.redCards"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.red-cards') }} ↓
      </p>
    </button>
    <button v-else @click="$emit('changeSorting', 'redCardsUp'), sorting.redCards = !sorting.redCards"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.red-cards') }} ↑
      </p>
    </button>
    <button v-if="!sorting.minutesPlayed"
      @click="$emit('changeSorting', 'minutesPlayedDown'), sorting.minutesPlayed = !sorting.minutesPlayed"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.minutes-played') }} ↓
      </p>
    </button>
    <button v-else @click="$emit('changeSorting', 'minutesPlayedUp'), sorting.minutesPlayed = !sorting.minutesPlayed"
      class="p-1 w-full rounded-xl">
      <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
        {{ t('match-statistic.minutes-played') }} ↑
      </p>
    </button>
  </div>

</template>

<route lang="yaml">
meta:
  layout: home
</route>

