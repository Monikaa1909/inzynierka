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

const attendanceList = ref([
	{
		id: 'attendancelistid1',
		player: 'Janusz Kowalski',
		training: props.id,
		attendance: true,
		remarks: ''
	},
	{
		id: 'attendancelistid2',
		player: 'Robert Lewandowski',
		training: 'trainingid1',
		attendance: true,
		remarks: 'Spóźnienie 15 minut'
	},
	{
		id: 'attendancelistid3',
		player: 'Grzegorz Krychowiak',
		training: 'trainingid1',
		attendance: true,
		remarks: ''
	},
	{
		id: 'attendancelistid4',
		player: 'Zbigniew Boniek',
		training: 'trainingid1',
		attendance: false,
		remarks: ''
	},
	{
		id: 'attendancelistid5',
		player: 'Wojciech Szczęsny',
		training: 'trainingid1',
		attendance: false,
		remarks: ''
	},
	{
		id: 'attendancelistid6',
		player: 'Arkadiusz Milik',
		training: 'trainingid1',
		attendance: true,
		remarks: ''
	},
	{
		id: 'attendancelistid7',
		player: 'Piotr Zieliński',
		training: 'trainingid1',
		attendance: true,
		remarks: ''
	},
])

</script>

<template>
	<div v-for="player in attendanceList" v-bind:key="player.id"
		class="w-full  flex flex-row gap-4 place-content-between">
		<div class="w-auto flex flex-row gap-2">
			<button v-if="props.edit" @click="player.attendance = !player.attendance">
				<img v-if="!player.attendance" src="../assets/checkbox-checked-icon.png" class="h-24px" />
				<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-24px" />
			</button>
			<div v-else>
				<img v-if="!player.attendance" src="../assets/checkbox-checked-icon.png" class="h-24px" />
				<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-24px" />
			</div>
			<p>{{player.player}}</p>
		</div>
		<div class="w-auto flex flex-row gap-2 items-center">
			<p class=" flex text-sm" v-if="!props.edit && player.remarks">({{player.remarks}})</p>
			<input v-else-if="props.edit" v-model="player.remarks"
				class="flex flex-auto w-full  text-sm border-1 border-#143547 p-1 shadow-lg" />
		</div>
	</div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

