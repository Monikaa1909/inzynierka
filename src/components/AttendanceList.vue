<script setup lang="ts">
const { availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const attendanceList = ref([
	{
		id: 'attendancelistid1',
		player: 'Janusz Kowalski',
		training: 'trainingid1',
		attendance: true,
		remarks: ''
	},
	{
		id: 'attendancelistid2',
		player: 'Robert Lewandowski',
		training: 'trainingid1',
		attendance: true,
		remarks: ''
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
	<div class="w-full border flex flex-col gap-2">
		<!-- <div v-for="player in attendanceList" v-bind:key="player.id" class="border w-full flex flex-row gap-2 ">
			<input type="checkbox" v-model="player.attendance" class="h-24px bg-#D8A22E border border-#D8A22E"/>
			<p>{{player.player}}</p>
		</div> -->


	</div>
</template>

<style>
.label-checkbox {
  margin-right: 0.87rem;
  margin-left: auto;
  border: 1px solid #4273DE;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #4273DE;
}

.check-day {
  
}

.checked {
  background: #42de4f;
  color: #fff;
}

.checked::before {
  content: "✔";
}</style>
<route lang="yaml">
meta:
  layout: home
</route>