<script setup lang="ts">
import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { useJwt } from '@vueuse/integrations/useJwt'

const props = defineProps<{ id: string }>()

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const academy = 'AP Jagiellonia Białystok'
const eventsFilter = ref('all')

const urlMatchStatistic = computed(() => {
	if (props.id === 'all')
		return `/api/matchStatistics/academy/${payload.value.academy}`
	else
		return `/api/matchStatistics/team/${props.id}`
})

const urlTournamentStatistic = computed(() => {
	if (props.id === 'all')
		return `/api/tournamentStatistics/academy/${payload.value.academy}`
	else
		return `/api/tournamentStatistics/team/${props.id}`
})

const urlTrainingStatistic = computed(() => {
	if (props.id === 'all')
		return `/api/attendanceLists/academy/${payload.value.academy}`
	else
		return `/api/attendanceLists/team/${props.id}`
})

const urlPlayers = computed(() => {
	if (props.id === 'all')
		return `/api/players//${academy}`
	else
		return `/api/players/team/${props.id}`
})

interface PlayerStatistic {
	player: Player,
	attendance: number,
	goalsScored: number,
	yellowCards: number,
	redCards: number,
	minutesPlayed: number,
	events: number
}

const {
	data: matchStatistic,
	isFetching: isMatchStatisticFetching,
	isFinished: isMatchStatisticFinished,
	error: matchStatisticError,
} = useFetch(urlMatchStatistic.value, { initialData: [] }).json<MatchStatistic[]>()

const {
	data: tournamentStatistic,
	isFetching: isTournamentStatisticFetching,
	isFinished: isTournamentStatisticFinished,
	error: tournamentStatisticError,
	execute: refechTournament
} = useFetch(urlTournamentStatistic.value, { initialData: [], immediate: false }).json<TournamentStatistic[]>()

const {
	data: trainingStatistic,
	isFetching: isTrainingStatisticFetching,
	isFinished: isTrainingStatisticFinished,
	error: trainingStatisticError,
	execute: refechTraining
} = useFetch(urlTrainingStatistic.value, { initialData: [], immediate: false }).json<AttendanceList[]>()

const {
	data: players,
	isFetching: isPlayersFetching,
	isFinished: isPlayersFinished,
	error: playersStatisticError,
	execute: refechPlayers
} = useFetch(urlPlayers.value, { initialData: [], immediate: false }).json<Player[]>()

whenever(isMatchStatisticFinished, (data) => {
	if (data)
		refechTournament()
})

whenever(isTournamentStatisticFinished, (data) => {
	if (data)
		refechTraining()
})

whenever(isTrainingStatisticFinished, (data) => {
	if (data)
		refechPlayers()
})

const playersStatistic = computed(() => {
	const newPlayersStatistic = [] as PlayerStatistic[]

	if (players.value) {

		players.value.forEach(element => {
			const playerStatistic = {} as PlayerStatistic

			playerStatistic.player = element
			playerStatistic.attendance = 0
			playerStatistic.goalsScored = 0
			playerStatistic.yellowCards = 0
			playerStatistic.redCards = 0
			playerStatistic.minutesPlayed = 0
			playerStatistic.events = 0

			if (eventsFilter.value === 'matches' || eventsFilter.value === 'all') {
				var matchStatistics = matchStatistic.value?.filter(item => item.player._id === element._id)

				matchStatistics?.forEach(statisticsElement => {
					statisticsElement.attendance ? playerStatistic.attendance += 1 : playerStatistic.attendance = playerStatistic.attendance
					playerStatistic.events += 1
					playerStatistic.goalsScored += statisticsElement.goalsScored ? statisticsElement.goalsScored : 0
					playerStatistic.yellowCards += statisticsElement.yellowCards ? statisticsElement.yellowCards : 0
					playerStatistic.redCards += statisticsElement.redCards ? statisticsElement.redCards : 0
					playerStatistic.minutesPlayed += statisticsElement.minutesPlayed ? statisticsElement.minutesPlayed : 0
				})
			}

			if (eventsFilter.value === 'tournaments' || eventsFilter.value === 'all') {
				var tournamentStatistics = tournamentStatistic.value?.filter(item => item.player._id === element._id)

				tournamentStatistics?.forEach(statisticsElement => {
					statisticsElement.attendance ? playerStatistic.attendance += 1 : playerStatistic.attendance = playerStatistic.attendance
					playerStatistic.events += 1
					playerStatistic.goalsScored += statisticsElement.goalsScored ? statisticsElement.goalsScored : 0
					playerStatistic.yellowCards += statisticsElement.yellowCards ? statisticsElement.yellowCards : 0
					playerStatistic.redCards += statisticsElement.redCards ? statisticsElement.redCards : 0
					playerStatistic.minutesPlayed += statisticsElement.minutesPlayed ? statisticsElement.minutesPlayed : 0
				})
			}

			if (eventsFilter.value === 'trainings' || eventsFilter.value === 'all') {
				var trainingStatistics = trainingStatistic.value?.filter(item => item.player._id === element._id)

				trainingStatistics?.forEach(statisticsElement => {
					statisticsElement.attendance ? playerStatistic.attendance += 1 : playerStatistic.attendance = playerStatistic.attendance
					playerStatistic.events += 1
				})
			}

			newPlayersStatistic.push(playerStatistic)
		})

		return newPlayersStatistic
	}
})

const isFinished = computed(() => {
	return isMatchStatisticFinished.value && isPlayersFinished.value && isTournamentStatisticFinished.value && isTrainingStatisticFinished.value
})

const isFetching = computed(() => {
	return isMatchStatisticFetching.value || isPlayersFetching.value || isTournamentStatisticFetching.value || isTrainingStatisticFetching.value
})

const error = computed(() => {
	return matchStatisticError.value && playersStatisticError.value && tournamentStatisticError.value && trainingStatisticError.value
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
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.player.lastName < b.player.lastName) return 1
				else return -1
			})
			return playersStatistic.value

		case 'playersDown':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.player.lastName < b.player.lastName) return -1
				else return 1
			})
			return playersStatistic.value

		case 'attendanceDown':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (b.events === 0) return 1
				else if (Number((a.attendance / a.events).toFixed(4)) > Number((b.attendance / b.events).toFixed(4))) return 1
				else if (Number((a.attendance / a.events).toFixed(4)) === Number((b.attendance / b.events).toFixed(4))) {
					if (a.attendance > b.attendance) return 1
					else return -1
				}
				else return -1
			})
			return playersStatistic.value
		case 'attendanceUp':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (b.events === 0) return -1
				else if (Number((a.attendance / a.events).toFixed(4)) > Number((b.attendance / b.events).toFixed(4))) return -1
				else if (Number((a.attendance / a.events).toFixed(4)) === Number((b.attendance / b.events).toFixed(4))) 
					if (a.attendance > b.attendance) return -1
					else return 1
				else return 1
			})
			return playersStatistic.value
		case 'goalsScoredDown':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.goalsScored > b.goalsScored) return 1
				else if (a.goalsScored < b.goalsScored) return -1
				else if (!a.attendance && b.attendance) return -1
				else return 1
			})
			return playersStatistic.value
		case 'goalsScoredUp':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.goalsScored > b.goalsScored) return -1
				else if (a.goalsScored < b.goalsScored) return 1
				else if (!a.attendance && b.attendance) return 1
				else return -1
			})
			return playersStatistic.value
		case 'yellowCardsDown':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.yellowCards > b.yellowCards) return 1
				else if (a.yellowCards < b.yellowCards) return -1
				else if (!a.attendance && b.attendance) return -1
				else return 1
			})
			return playersStatistic.value
		case 'yellowCardsUp':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.yellowCards > b.yellowCards) return -1
				else if (a.yellowCards < b.yellowCards) return 1
				else if (!a.attendance && b.attendance) return 1
				else return -1
			})
			return playersStatistic.value
		case 'redCardsDown':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.redCards > b.redCards) return 1
				else if (a.redCards < b.redCards) return -1
				else if (!a.attendance && b.attendance) return -1
				else return 1
			})
			return playersStatistic.value
		case 'redCardsUp':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.redCards > b.redCards) return -1
				else if (a.redCards < b.redCards) return 1
				else if (!a.attendance && b.attendance) return 1
				else return -1
			})
			return playersStatistic.value
		case 'minutesPlayedDown':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.minutesPlayed > b.minutesPlayed) return 1
				else if (a.minutesPlayed < b.minutesPlayed) return -1
				else if (!a.attendance && b.attendance) return -1
				else return 1
			})
			return playersStatistic.value
		case 'minutesPlayedUp':
			playersStatistic.value?.sort(function (a: any, b: any) {
				if (a.minutesPlayed > b.minutesPlayed) return -1
				else if (a.minutesPlayed < b.minutesPlayed) return 1
				else if (!a.attendance && b.attendance) return 1
				else return -1
			})
			return playersStatistic.value
		default:
			return playersStatistic.value
	}
})

interface Statistic {
	attendance: number,
	goalsScored: number,
	yellowCards: number,
	redCards: number,
	minutesPlayed: number,
	events: number
}

const averageStatistic = computed(() => {
	const newAverageStatistic = {} as Statistic

	newAverageStatistic.attendance = 0
	newAverageStatistic.goalsScored = 0
	newAverageStatistic.yellowCards = 0
	newAverageStatistic.redCards = 0
	newAverageStatistic.minutesPlayed = 0
	newAverageStatistic.events = 0

	if (playersStatistic.value && playersStatistic.value.length > 0) {
		console.log('playersStatistic.value playersStatistic.value.lenght ' + playersStatistic.value + ' ' + playersStatistic.value.length)
		playersStatistic.value.forEach(element => {
			newAverageStatistic.events += element.events
			newAverageStatistic.attendance += element.attendance
			newAverageStatistic.goalsScored += element.goalsScored
			newAverageStatistic.yellowCards += element.yellowCards
			newAverageStatistic.redCards += element.redCards
			newAverageStatistic.minutesPlayed += element.minutesPlayed
		})

		if (newAverageStatistic.events > 0)
			newAverageStatistic.attendance /= newAverageStatistic.events * 0.01
		newAverageStatistic.goalsScored /= playersStatistic.value.length
		newAverageStatistic.yellowCards /= playersStatistic.value.length
		newAverageStatistic.redCards /= playersStatistic.value.length
		newAverageStatistic.minutesPlayed /= playersStatistic.value.length

		newAverageStatistic.attendance = Number(newAverageStatistic.attendance.toFixed(2))
		newAverageStatistic.goalsScored = Number(newAverageStatistic.goalsScored.toFixed(2))
		newAverageStatistic.yellowCards = Number(newAverageStatistic.yellowCards.toFixed(2))
		newAverageStatistic.redCards = Number(newAverageStatistic.redCards.toFixed(2))
		newAverageStatistic.minutesPlayed = Number(newAverageStatistic.minutesPlayed.toFixed(2))
	}

	return newAverageStatistic
})

const summaryStatistic = computed(() => {
	const newSummaryStatistic = {} as Statistic

	newSummaryStatistic.attendance = 0
	newSummaryStatistic.goalsScored = 0
	newSummaryStatistic.yellowCards = 0
	newSummaryStatistic.redCards = 0
	newSummaryStatistic.minutesPlayed = 0
	newSummaryStatistic.events = 0

	if (playersStatistic.value) {
		playersStatistic.value.forEach(element => {
			newSummaryStatistic.attendance += element.attendance
			newSummaryStatistic.events += element.events
			newSummaryStatistic.goalsScored += element.goalsScored
			newSummaryStatistic.yellowCards += element.yellowCards
			newSummaryStatistic.redCards += element.redCards
			newSummaryStatistic.minutesPlayed += element.minutesPlayed
		})
	}
	return newSummaryStatistic
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

							<StatisticSortOptions :statisticType="'players'" @changeSorting="changeSorting" v-if="!isHidden">
							</StatisticSortOptions>

							<div v-if="!isHidden"
								class="w-full  flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
								<button @click="eventsFilter = 'trainings'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
										:class="[eventsFilter === 'trainings' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
										{{ t('button.trainings') }}
									</p>
								</button>
								<button @click="eventsFilter = 'matches'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
										:class="[eventsFilter === 'matches' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
										{{ t('button.matches') }}
									</p>
								</button>
								<button @click="eventsFilter = 'tournaments'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
										:class="[eventsFilter === 'tournaments' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
										{{ t('button.tournaments') }}
									</p>
								</button>
								<button @click="eventsFilter = 'all'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
										:class="[eventsFilter === 'all' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
										{{ t('button.all') }}
									</p>
								</button>
							</div>

							<div class="h-full w-full grid gap-2 px-2">

								<div class="h-full w-full grid  invisible md:(visible) grid-cols-6">
									<StatisticHeader> {{ t('match-statistic.player') }} </StatisticHeader>
									<StatisticHeader> {{ t('match-statistic.attendance') }} </StatisticHeader>
									<StatisticHeader> {{ t('match-statistic.goals-scored') }} </StatisticHeader>
									<StatisticHeader> {{ t('match-statistic.yellow-cards') }} </StatisticHeader>
									<StatisticHeader> {{ t('match-statistic.red-cards') }}</StatisticHeader>
									<StatisticHeader> {{ t('match-statistic.minutes-played') }} </StatisticHeader>
								</div>

								<div v-if="playersStatistic" v-for="statistic in sortedStatistic" v-bind:key="statistic.player._id"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-6 gap-0)">

									<SingleStatistic>
										<template #name>{{ t('match-statistic.player') }}</template>
										<template #data>{{ statistic.player.lastName }} {{ statistic.player.firstName }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>{{ statistic.attendance}}/{{statistic.events}}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.goals-scored') }}</template>
										<template #data>{{ statistic.goalsScored }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.yellow-cards') }}</template>
										<template #data>{{ statistic.yellowCards }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.red-cards') }}</template>
										<template #data>{{ statistic.redCards }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data>{{ statistic.minutesPlayed }}</template>
									</SingleStatistic>


									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

								<div v-if="playersStatistic && playersStatistic.length > 0"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-6 gap-0)">

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data>{{ t('match-statistic.sum') }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>{{ summaryStatistic.attendance }}/{{ summaryStatistic.events }}</template>
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

									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

								<div v-if="playersStatistic && playersStatistic.length > 0"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-6 gap-0)">

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data>
											<p class="font-medium text-center">{{ t('match-statistic.average') }}</p>
										</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>{{ averageStatistic.attendance }}%</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.goals-scored') }}</template>
										<template #data>{{ averageStatistic.goalsScored }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.yellow-cards') }}</template>
										<template #data>{{ averageStatistic.yellowCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.red-cards') }}</template>
										<template #data>{{ averageStatistic.redCards }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data>{{ averageStatistic.minutesPlayed }}</template>
									</SingleSummaryStatistic>

									<SingleSummaryStatistic>
										<template #name></template>
										<template #data></template>
									</SingleSummaryStatistic>

									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

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