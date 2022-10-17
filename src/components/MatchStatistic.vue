<script setup lang="ts">
const { availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	id: {
		type: String,
		require: true
	},
	edit: {
		type: Boolean,
		require: true
	}
})

const matchStatistics = ref([
	{
		id: 'matchstatisticsid1',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid2',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid3',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid4',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid5',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid6',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid7',
		player: 'Janusz Kowalski',
		match: props.id,
		goalsScored: 0,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
])

</script>

<template>
	<div v-for="matchStatistic in matchStatistics" v-bind:key="matchStatistic.id"
		class="w-full  flex flex-row gap-4 place-content-between">
		<!-- <div class="w-auto flex flex-row gap-2">
			<button v-if="props.edit" @click="matchStatistic.attendance = !matchStatistic.attendance">
				<img v-if="!matchStatistic.attendance" src="../assets/checkbox-checked.png" class="h-24px" />
				<img v-else src="../assets/checkbox-unchecked.png" class="h-24px" />
			</button>
			<div v-else>
				<img v-if="!matchStatistic.attendance" src="../assets/checkbox-checked.png" class="h-24px" />
				<img v-else src="../assets/checkbox-unchecked.png" class="h-24px" />
			</div>
			<p>{{matchStatistic.player}}</p>
		</div>
		<div class="w-auto flex flex-row gap-2 items-center">
			<p class=" flex text-sm" v-if="!props.edit && matchStatistic.remarks">({{matchStatistic.remarks}})</p>
			<input v-else-if="props.edit" v-model="matchStatistic.remarks"
				class="flex flex-auto w-full  text-sm border-1 border-#143547 p-1 shadow-lg" />
		</div> -->
	</div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

