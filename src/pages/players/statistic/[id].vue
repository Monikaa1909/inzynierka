<script setup lang="ts">
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { Player } from 'backend/database/schemas/Player'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ id: string }>()

const urlMatchStatistic = computed(() => {
	if (props.id === 'all')
		return `/api/matchStatistic/academy/${academy}`
	else
		return `/api/matchStatistic/team/${props.id}`
})

const urlPlayers = computed(() => {
	if (props.id === 'all')
		return `/api/players//${academy}`
	else
		return `/api/players/team/${props.id}`
})

const playersStatistic = ref([] as MatchStatistic[])
// const playerStatistic = ref({} as MatchStatistic)

const {
	data: matchStatistic,
	isFetching: isMatchStatisticFetching,
	isFinished: isMatchStatisticFinished,
	error: matchStatisticError,
} = useFetch(urlMatchStatistic.value, { initialData: [] }).json<MatchStatistic[]>()

const {
	data: players,
	isFetching: isPlayersFetching,
	isFinished: isPlayersFinished,
	error: playersStatisticError,
	execute: refechPlayers
} = useFetch(urlPlayers.value, { initialData: [], immediate: false }).json<Player[]>()

whenever(matchStatistic, (data) => {
	if (data.length === 0) {
		alert('Brak statystyk z meczu w bazie')
	} if (players.value?.length === 0)
		refechPlayers()
	else {

	}
})

const isFinished = computed(() => {
	return isMatchStatisticFinished.value && isPlayersFinished.value
})

const isFetching = computed(() => {
	return isMatchStatisticFetching.value || isPlayersFetching.value
})

const error = computed(() => {
	return matchStatisticError.value && playersStatisticError.value
})

const isHidden = ref(true)

const sortType = ref('playersDown')
function changeSorting(newSortType: any) {
  sortType.value = newSortType
}

const sortedStatistic = computed(() => {
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
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>

					<template #nav>
						<button @click="isHidden = !isHidden">
							<img src="../../../assets/filter-icon.png" class="h-24px" />
						</button>
					</template>

					<template #icon>
						<img src="../../../assets/statistic-icon2.png" class="h-150px" />
					</template>

					<template #attributes>
						<LoadingCircle v-if="isFetching"></LoadingCircle>

						<div v-else-if="isFinished && !error"
							class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

							<StatisticSortOptions :statisticType="'match'" @changeSorting="changeSorting" v-if="!isHidden">
							</StatisticSortOptions>

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

								<div v-if="matchStatistic!.length != 0" v-for="statistic in sortedStatistic" v-bind:key="statistic._id"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleStatistic>
										<template #name>{{ t('match-statistic.player') }}</template>
										<template #data>{{ statistic.player.lastName }} {{ statistic.player.firstName }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>
											<div>
												<img v-if="statistic.attendance" src="../../../assets/checkbox-checked-icon.png"
													class="h-18px" />
												<img v-else src="../../../assets/checkbox-unchecked-icon.png" class="h-18px" />
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
										<img src="../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

								<!-- <div v-if="matchStatistic.length != 0"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data>{{ t('match-statistic.sum') }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>{{ summaryStatistic.attendance }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.goals-scored') }}</template>
										<template #data>{{ summaryStatistic.goalsScored }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.yellow-cards') }}</template>
										<template #data>{{ summaryStatistic.yellowCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.red-cards') }}</template>
										<template #data>{{ summaryStatistic.redCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data>{{ summaryStatistic.minutesPlayed }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data></template>
									</SingleSummaryStatistic>

									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../../assets/line-icon.png" class="w-full" />
									</div>
								</div> -->

								<!-- <div v-if="matchStatistic.length != 0"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data>
											<p class="font-medium text-center">{{ t('match-statistic.average') }}</p>
											<p class="text-center">({{ t('match-statistic.including-absent') }})</p>
										</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>{{ averageStatisticWithAbsent.attendance }}%</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.goals-scored') }}</template>
										<template #data>{{ averageStatisticWithAbsent.goalsScored }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.yellow-cards') }}</template>
										<template #data>{{ averageStatisticWithAbsent.yellowCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.red-cards') }}</template>
										<template #data>{{ averageStatisticWithAbsent.redCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data>{{ averageStatisticWithAbsent.minutesPlayed }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data></template>
									</SingleSummaryStatistic>

									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../../assets/line-icon.png" class="w-full" />
									</div>
								</div> -->

				

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
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>