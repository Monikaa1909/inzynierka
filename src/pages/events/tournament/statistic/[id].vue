<script setup lang="ts">
import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Player } from 'backend/database/schemas/Player'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const playerStatistic = ref({} as TournamentStatistic)
const playerUrl = ref(``)
const isTournamentStatistic = ref(false)
const messageInfo = ref('error-messages.no-statistics')

const {
	data: tournament,
	isFetching: isTournamentFetching,
	isFinished: isTournamentFinished,
	error: tournamentError,
} = useFetch(`/api/tournament/${props.id}`, { initialData: {} }).json<Tournament>()

whenever(isTournamentFinished, (data) => {
	if (data) {
		if (tournament.value != null) {
			tournament.value.startDate = new Date(tournament.value.startDate) as unknown as Date
			tournament.value.endDate = new Date(tournament.value.endDate) as unknown as Date

			playerUrl.value = `/api/players/team/${tournament.value.team._id}`
			refechTournamentStatistic()
		}
	}
})

const {
	data: tournamentStatistic,
	isFetching: isTournamentStatisticFetching,
	isFinished: isTournamentStatisticFinished,
	error: tournamentStatisticError,
	execute: refechTournamentStatistic
} = useFetch(`/api/tournamentStatistic/tournament/${props.id}`, { initialData: [], immediate: false }).json<TournamentStatistic[]>()

const {
	data: players,
	isFetching: isPlayersFetching,
	error: playersError,
	execute: refechPlayers
} = useFetch(playerUrl, { initialData: [], immediate: false }).json<Player[]>()

whenever(tournamentStatistic, (data) => {
	if (tournamentStatistic.value === null || tournamentStatistic.value.length === 0) {
		isTournamentStatistic.value = false
		return
	} else {
		isTournamentStatistic.value = true
		updateSummaryStatistic()
		updateAverageStatisticWithAbsent()
		updateAverageStatisticWithoutAbsent()
		sortType.value = 'playersDown'
	}
})

whenever(players, (data) => {
	console.log(players.value?.length)
	if (players.value != null && players.value.length > 0) {
		players.value.forEach(async element => {
			if (!isTournamentStatistic.value) {
				playerStatistic.value.player = element
				playerStatistic.value.tournament = tournament as unknown as Tournament
				console.log('dodaje statystyke')
				const { execute: savePlayerStatistic, error: saveError } = useFetch(`/api/tournamentStatistic`, { immediate: false }).post(playerStatistic)
				await savePlayerStatistic()
				if (saveError.value) {
					alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
				}
			}

			else {
				if (!isPlayerHasStatistic(element)) {
					playerStatistic.value.player = element
					playerStatistic.value.tournament = tournament as unknown as Tournament

					const { execute: savePlayerStatistic, error: saveError } = useFetch(`/api/tournamentStatistic`, { immediate: false }).post(playerStatistic)
					await savePlayerStatistic()
					if (saveError.value) {
						alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
						return
					}
				}
			}
		})
		console.log('odswiezam staytystyki')
		refechTournamentStatistic()
	} else
		messageInfo.value = 'error-messages.no-players-in-team'
})

const isPlayerHasStatistic = (player: Player) => {
	let isPlayerHas = false
	tournamentStatistic.value?.forEach(element => {
		if (element.player._id === player._id)
			isPlayerHas = true
	})
	return isPlayerHas
}

const isFinished = computed(() => {
	return isTournamentFinished.value && isTournamentStatisticFinished.value
})

const isFetching = computed(() => {
	return isTournamentFetching.value || isTournamentStatisticFetching.value || isPlayersFetching.value
})

const error = computed(() => {
	return tournamentError.value && tournamentStatisticError.value && playersError.value
})

const isHidden = ref(true)
const sortType = ref('all')

function changeSorting(newSortType: any) {
	sortType.value = newSortType
}

const goEditMatchStatistic = (eventId: any) => {
	return router.push(`/events/tournament/statistic/edit/${eventId}`)
}

const sortedStatistic = computed(() => {
	if (tournamentStatistic.value != null && tournamentStatistic.value.length > 0) {
		tournamentStatistic.value.forEach(element => {
			if (!element.attendance) {
				element.goalsScored = 0
				element.yellowCards = 0
				element.redCards = 0
				element.minutesPlayed = 0
			}
		})

		switch (sortType.value) {
			case 'playersUp':
				console.log('playersUp')
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.player.lastName < b.player.lastName) return 1
					else return -1
				})
				return tournamentStatistic.value
			case 'playersDown':
				console.log('playersDown')
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.player.lastName < b.player.lastName) return -1
					else return 1
				})
				return tournamentStatistic.value
			case 'attendanceDown':

				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.attendance > b.attendance) return 1
					else return -1
				})
				return tournamentStatistic.value
			case 'attendanceUp':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.attendance > b.attendance) return -1
					else return 1
				})
				return tournamentStatistic.value
			case 'goalsScoredDown':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.goalsScored > b.goalsScored) return 1
					else if (a.goalsScored < b.goalsScored) return -1
					else if (!a.attendance && b.attendance) return -1
					else return 1
				})
				return tournamentStatistic.value
			case 'goalsScoredUp':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.goalsScored > b.goalsScored) return -1
					else if (a.goalsScored < b.goalsScored) return 1
					else if (!a.attendance && b.attendance) return 1
					else return -1
				})
				return tournamentStatistic.value
			case 'yellowCardsDown':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.yellowCards > b.yellowCards) return 1
					else if (a.yellowCards < b.yellowCards) return -1
					else if (!a.attendance && b.attendance) return -1
					else return 1
				})
				return tournamentStatistic.value
			case 'yellowCardsUp':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.yellowCards > b.yellowCards) return -1
					else if (a.yellowCards < b.yellowCards) return 1
					else if (!a.attendance && b.attendance) return 1
					else return -1
				})
				return tournamentStatistic.value
			case 'redCardsDown':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.redCards > b.redCards) return 1
					else if (a.redCards < b.redCards) return -1
					else if (!a.attendance && b.attendance) return -1
					else return 1
				})
				return tournamentStatistic.value
			case 'redCardsUp':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.redCards > b.redCards) return -1
					else if (a.redCards < b.redCards) return 1
					else if (!a.attendance && b.attendance) return 1
					else return -1
				})
				return tournamentStatistic.value
			case 'minutesPlayedDown':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.minutesPlayed > b.minutesPlayed) return 1
					else if (a.minutesPlayed < b.minutesPlayed) return -1
					else if (!a.attendance && b.attendance) return -1
					else return 1
				})
				return tournamentStatistic.value
			case 'minutesPlayedUp':
				tournamentStatistic.value.sort(function (a: any, b: any) {
					if (a.minutesPlayed > b.minutesPlayed) return -1
					else if (a.minutesPlayed < b.minutesPlayed) return 1
					else if (!a.attendance && b.attendance) return 1
					else return -1
				})
				return tournamentStatistic.value
			default:
				return tournamentStatistic.value
		}
	}
	return tournamentStatistic.value
})

interface Statistic {
	attendance: number,
	goalsScored: number,
	yellowCards: number,
	redCards: number,
	minutesPlayed: number,
}

const summaryStatistic = ref({} as Statistic)
const averageStatisticWithAbsent = ref({} as Statistic)
const averageStatisticWithoutAbsent = ref({} as Statistic)

const updateSummaryStatistic = () => {
	summaryStatistic.value.attendance = 0
	summaryStatistic.value.goalsScored = 0
	summaryStatistic.value.yellowCards = 0
	summaryStatistic.value.redCards = 0
	summaryStatistic.value.minutesPlayed = 0

	if (tournamentStatistic.value != null && tournamentStatistic.value.length > 0) {
		tournamentStatistic.value.forEach(element => {
			if (element.attendance)
				summaryStatistic.value.attendance += 1
			summaryStatistic.value.goalsScored += element.goalsScored ? element.goalsScored : 0
			summaryStatistic.value.yellowCards += element.yellowCards ? element.yellowCards : 0
			summaryStatistic.value.redCards += element.redCards ? element.redCards : 0
			summaryStatistic.value.minutesPlayed += element.minutesPlayed ? element.minutesPlayed : 0
		})
	}
}

const updateAverageStatisticWithAbsent = () => {
	averageStatisticWithAbsent.value.attendance = 0
	averageStatisticWithAbsent.value.goalsScored = 0
	averageStatisticWithAbsent.value.yellowCards = 0
	averageStatisticWithAbsent.value.redCards = 0
	averageStatisticWithAbsent.value.minutesPlayed = 0

	if (tournamentStatistic.value != null && tournamentStatistic.value.length > 0) {
		tournamentStatistic.value.forEach(element => {
			if (element.attendance)
				averageStatisticWithAbsent.value.attendance += 1
			averageStatisticWithAbsent.value.goalsScored += element.goalsScored ? element.goalsScored : 0
			averageStatisticWithAbsent.value.yellowCards += element.yellowCards ? element.yellowCards : 0
			averageStatisticWithAbsent.value.redCards += element.redCards ? element.redCards : 0
			averageStatisticWithAbsent.value.minutesPlayed += element.minutesPlayed ? element.minutesPlayed : 0
		})

		averageStatisticWithAbsent.value.attendance /= tournamentStatistic.value.length * 0.01
		averageStatisticWithAbsent.value.goalsScored /= tournamentStatistic.value.length
		averageStatisticWithAbsent.value.yellowCards /= tournamentStatistic.value.length
		averageStatisticWithAbsent.value.redCards /= tournamentStatistic.value.length
		averageStatisticWithAbsent.value.minutesPlayed /= tournamentStatistic.value.length

		averageStatisticWithAbsent.value.goalsScored = Number(averageStatisticWithAbsent.value.goalsScored.toFixed(2))
		averageStatisticWithAbsent.value.yellowCards = Number(averageStatisticWithAbsent.value.yellowCards.toFixed(2))
		averageStatisticWithAbsent.value.redCards = Number(averageStatisticWithAbsent.value.redCards.toFixed(2))
		averageStatisticWithAbsent.value.minutesPlayed = Number(averageStatisticWithAbsent.value.minutesPlayed.toFixed(2))
	}
}

const updateAverageStatisticWithoutAbsent = () => {
	averageStatisticWithoutAbsent.value.attendance = 0
	averageStatisticWithoutAbsent.value.goalsScored = 0
	averageStatisticWithoutAbsent.value.yellowCards = 0
	averageStatisticWithoutAbsent.value.redCards = 0
	averageStatisticWithoutAbsent.value.minutesPlayed = 0

	let numberOfAbsent = 0

	if (tournamentStatistic.value != null && tournamentStatistic.value.length > 0) {
		tournamentStatistic.value.forEach(element => {
			if (element.attendance) {
				numberOfAbsent += 1
				averageStatisticWithoutAbsent.value.attendance += 1
			}
			averageStatisticWithoutAbsent.value.goalsScored += element.goalsScored ? element.goalsScored : 0
			averageStatisticWithoutAbsent.value.yellowCards += element.yellowCards ? element.yellowCards : 0
			averageStatisticWithoutAbsent.value.redCards += element.redCards ? element.redCards : 0
			averageStatisticWithoutAbsent.value.minutesPlayed += element.minutesPlayed ? element.minutesPlayed : 0
		})

		if (numberOfAbsent > 0) {
			averageStatisticWithoutAbsent.value.attendance /= numberOfAbsent * 0.01
			averageStatisticWithoutAbsent.value.goalsScored /= numberOfAbsent
			averageStatisticWithoutAbsent.value.yellowCards /= numberOfAbsent
			averageStatisticWithoutAbsent.value.redCards /= numberOfAbsent
			averageStatisticWithoutAbsent.value.minutesPlayed /= numberOfAbsent
		}

		averageStatisticWithoutAbsent.value.goalsScored = Number(averageStatisticWithoutAbsent.value.goalsScored.toFixed(2))
		averageStatisticWithoutAbsent.value.yellowCards = Number(averageStatisticWithoutAbsent.value.yellowCards.toFixed(2))
		averageStatisticWithoutAbsent.value.redCards = Number(averageStatisticWithoutAbsent.value.redCards.toFixed(2))
		averageStatisticWithoutAbsent.value.minutesPlayed = Number(averageStatisticWithoutAbsent.value.minutesPlayed.toFixed(2))
	}
}

</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>

					<template #nav>
						<button @click="refechPlayers()">Refresh</button>
						<button @click="isHidden = !isHidden">
							<img src="../../../../assets/filter-icon.png" class="h-24px" />
						</button>
						<button @click="goEditMatchStatistic(props.id)">
							<img src="../../../../assets/edit-icon.png" class="h-24px" />
						</button>
					</template>

					<template #icon>
						<img src="../../../../assets/statistic-icon2.png" class="h-150px" />
					</template>

					<template #attributes>

						<LoadingCircle v-if="isFetching || !isTournamentFinished || !isTournamentStatisticFinished"></LoadingCircle>

						<div v-else-if="isFinished && !error"
							class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

							<StatisticSortOptions :statisticType="'match'" @changeSorting="changeSorting" v-if="!isHidden">
							</StatisticSortOptions>

							<div class="flex flex-col gap-2">
								<div class="flex flex-row gap-2 w-full px-2">
									<p class="font-medium">{{ t('single-event.name') }}: </p>
									<p>{{ tournament?.tournamentName }}</p>
								</div>
							</div>

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

								<div v-if="isTournamentStatistic && tournamentStatistic?.length != 0" v-for="statistic in sortedStatistic"
									v-bind:key="statistic._id" class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleStatistic>
										<template #name>{{ t('match-statistic.player') }}</template>
										<template #data>{{ statistic.player.lastName }} {{ statistic.player.firstName }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>
											<div>
												<img v-if="statistic.attendance" src="../../../../assets/checkbox-checked-icon.png"
													class="h-18px" />
												<img v-else src="../../../../assets/checkbox-unchecked-icon.png" class="h-18px" />
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
										<img src="../../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

								<div v-if="isTournamentStatistic && tournamentStatistic?.length != 0"
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
								</div>

								<div v-if="isTournamentStatistic && tournamentStatistic?.length != 0"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleSummaryStatistic>
										<template #name></template>
										<template class="font-medium" #data>
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
								</div>

								<div v-if="isTournamentStatistic && tournamentStatistic?.length != 0"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data>
											<p class="font-medium text-center">{{ t('match-statistic.average') }}</p>
											<p class="text-center">({{ t('match-statistic.not-including-absent') }})</p>
										</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data></template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.goals-scored') }}</template>
										<template #data>{{ averageStatisticWithoutAbsent.goalsScored }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.yellow-cards') }}</template>
										<template #data>{{ averageStatisticWithoutAbsent.yellowCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.red-cards') }}</template>
										<template #data>{{ averageStatisticWithoutAbsent.redCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data>{{ averageStatisticWithoutAbsent.minutesPlayed }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data></template>
									</SingleSummaryStatistic>

									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

								<ErrorMessageInfo v-else-if="!isTournamentStatistic">
									{{t(messageInfo)}}
								</ErrorMessageInfo>
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