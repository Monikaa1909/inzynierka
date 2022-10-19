<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
	statisticType : {
    type: String,
    require: false,
    default: 'players'
  }
})

</script>

<template>
  <div
      class="w-full flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
      <button v-if="props.statisticType === 'players'"
      @click="$emit('changeSorting', 'attendance')"
        class="p-1 w-full rounded-xl">
        <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
          {{ t('match-statistic.attendance') }}
        </p>
      </button>
      <button @click="$emit('changeSorting', 'goalsScored')" class="p-1 w-full rounded-xl">
        <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
          {{ t('match-statistic.goals-scored') }}
        </p>
      </button>
      <button @click="$emit('changeSorting', 'yellowCards')" class="p-1 w-full rounded-xl">
        <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
          {{ t('match-statistic.yellow-cards') }}
        </p>
      </button>
      <button @click="$emit('changeSorting', 'redCards')" class="p-1 w-full rounded-xl">
        <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
          {{ t('match-statistic.red-cards') }}
        </p>
      </button>
      <button @click="$emit('changeSorting', 'minutesPlayed')" class="p-1 w-full rounded-xl">
        <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
          {{ t('match-statistic.minutes-played') }}
        </p>
      </button>
      <button @click="$emit('changeSorting', 'all')" class="p-1 w-full rounded-xl">
        <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
          {{ t('match-statistic.clear') }}
        </p>
      </button>
  </div>
 
</template>

<route lang="yaml">
meta:
  layout: home
</route>

