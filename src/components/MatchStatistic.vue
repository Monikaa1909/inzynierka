<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	id: {
		type: String,
		require: true
	},
	edit: {
		type: Boolean,
		require: false,
		default: false
	}
})

const matchStatistics = ref([
	{
		id: 'matchstatisticsid1',
		player: 'Janusz Kowalski',
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
		player: 'Janusz Kowalski',
		match: props.id,
		attendance: true,
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
		attendance: true,
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
		attendance: false,
		goalsScored: 2,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
	{
		id: 'matchstatisticsid5',
		player: 'Janusz',
		match: props.id,
		attendance: false,
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
		attendance: true,
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
		attendance: true,
		goalsScored: 0,
		yellowCards: 1,
		redCards: 0,
		minutesPlayed: 90,
		remarks: ''
	},
])

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
</script>

<template>
	<div class="w-full flex flex-col gap-4">
		<div class="flex flex-col w-full ">
			<div class="flex flex-row gap-2 w-full px-2">
				<p class="font-medium">{{ t('single-event.result')}}: </p>
				<p>{{match.goalsScored}}:{{match.goalsConceded}}</p>
			</div>
			<div class="flex flex-row gap-2 w-full px-2">
				<p class="font-medium">{{ t('single-event.duration')}}: </p>
				<p>{{match.duration}} {{t('single-event.minutes')}}</p>
			</div>
		</div>
		<div class="h-full w-full grid gap-2 px-2">
			<div class="h-full w-full grid grid-cols-7 invisible md:(visible)">
				<div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.player')
				}}
				</div>
				<div class="self-center justify-self-center  font-medium text-xs">{{ t('match-statistic.attendance') }}
				</div>
				<div class="self-center justify-self-center  font-medium text-xs">{{ t('match-statistic.goals-scored') }}
				</div>
				<div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.yellow-cards') }}
				</div>
				<div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.red-cards') }}</div>
				<div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.minutes-played') }}
				</div>
				<div class="self-center justify-self-center font-medium text-xs">{{ t('match-statistic.remarks') }}</div>
			</div>
			<div v-for="matchStatistic in matchStatistics" v-bind:key="matchStatistic.id"
				class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">
				<div class="self-center justify-self-center font-medium text-xs block md:(hidden)">{{
				t('match-statistic.player') }}</div>
				<div class="self-center justify-self-center col-span-1 text-xs md:()">{{matchStatistic.player}}
				</div>
				<div class="self-center justify-self-center font-medium text-xs block md:(hidden)">{{
				t('match-statistic.attendance') }}</div>
				<div class="self-center justify-self-center text-xs">
					<button v-if="props.edit" @click="matchStatistic.attendance = !matchStatistic.attendance">
						<img v-if="!matchStatistic.attendance" src="../assets/checkbox-checked-icon.png" class="h-24px" />
						<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-24px" />
					</button>
					<div v-else>
						<img v-if="!matchStatistic.attendance" src="../assets/checkbox-checked-icon.png" class="h-24px" />
						<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-24px" />
					</div>
				</div>
				<div class="self-center justify-self-center  font-medium text-xs block md:(hidden)">{{
				t('match-statistic.goals-scored') }}</div>
				<div class="self-center justify-self-center  text-xs">{{matchStatistic.goalsScored}}</div>
				<div class="self-center justify-self-center  font-medium text-xs block sm:(hidden)">{{
				t('match-statistic.yellow-cards') }}</div>
				<div class="self-center justify-self-center text-xs">{{matchStatistic.yellowCards}}</div>
				<div class="self-center justify-self-center font-medium text-xs block sm:(hidden)">{{
				t('match-statistic.red-cards') }}</div>
				<div class="self-center justify-self-center text-xs">{{matchStatistic.redCards}}</div>
				<div class="self-center justify-self-center  font-medium text-xs block sm:(hidden)">{{
				t('match-statistic.minutes-played') }}</div>
				<div class="self-center justify-self-center  text-xs">{{matchStatistic.minutesPlayed}}</div>
				<div class="self-center justify-self-center font-medium text-xs block sm:(hidden)">{{
				t('match-statistic.remarks') }}</div>
				<div class="self-center justify-self-center text-xs">{{matchStatistic.remarks}}</div>
				<div class="self-center justify-self-center col-span-2 block sm:(hidden)">
					<img src="../assets/line-icon.png" class="w-full" />
				</div>
			</div>
		</div>
	</div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

