<script setup lang="ts">
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { Match } from 'backend/database/schemas/Match'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const matchStatistic = ref([] as MatchStatistic[])
const playerStatistic = ref({} as MatchStatistic)
const match = ref(<Match>({}))

const playerUrl = ref(``)

const {
	data: matchData,
	isFetching: isMatchFetching,
	isFinished: isMatchFinished,
	error: matchError,
} = useFetch(`/api/match/${props.id}`, { initialData: {} }).json<Match>()

whenever(matchData, (data) => {
	match.value = data
	match.value.date = new Date(match.value.date) as unknown as Date
	playerUrl.value = `/api/players/team/${data.team._id}`
})

const {
	data: matchStatisticData,
	isFetching: isMatchStatisticFetching,
	isFinished: isMatchStatisticFinished,
	error: matchStatisticError,
} = useFetch(`/api/matchStatistic/match/${props.id}`, { initialData: [] }).json<MatchStatistic[]>()

whenever(matchStatisticData, (data) => {
	matchStatistic.value = data
})

const isFinished = computed(() => {
	return isMatchFinished.value && isMatchStatisticFinished.value
})

const isFetching = computed(() => {
	return isMatchFetching.value || isMatchStatisticFetching.value
})

const error = computed(() => {
	return matchError.value && matchStatisticError.value
})

const isHidden = ref(true)
const sortType = ref('all')

function changeSorting(newSortType: any) {
	sortType.value = newSortType
}

const sortedStatistic = computed(() => {
	matchStatistic.value.sort(function (a: any, b: any) {
		if (a.player.lastName < b.player.lastName) return -1
		else return 1
	})
	return matchStatistic.value
})

var goalsNumber: number[] = []
for (let i = 0; i < 50; i++) {
	goalsNumber[i] = i
}

var minutesNumber: number[] = []
for (let i = 0; i < 120; i++) {
	minutesNumber[i] = i
}

const onSubmit = async () => {
	if (totalGoals.value != match.value.goalsScored) {
		alert(t('error-messages.goals-error') + ' (' + totalGoals.value + ')')
		return
	}

	const { execute: updateMatch, error: updateError } = useFetch(`/api/match/${match.value._id}`, { immediate: false }).post(match)
	await updateMatch()
	if (updateError.value) {
		alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
		return
	}

	matchStatistic.value.forEach(async element => {
		playerStatistic.value.attendance = element.attendance
		playerStatistic.value.remarks = element.remarks
		if (element.attendance) {
			playerStatistic.value.goalsScored = element.goalsScored ? element.goalsScored : 0
			playerStatistic.value.yellowCards = element.yellowCards ? element.yellowCards : 0
			playerStatistic.value.redCards = element.redCards ? element.redCards : 0
			playerStatistic.value.minutesPlayed = element.minutesPlayed! <= match.value.duration! ? element.minutesPlayed : 0
		} else {
			playerStatistic.value.goalsScored = 0
			playerStatistic.value.yellowCards = 0
			playerStatistic.value.redCards = 0
			playerStatistic.value.minutesPlayed = 0
		}

		const { execute: updatePlayerStatistic, error: updateError } = useFetch(`/api/matchStatistic/${element._id}`, { immediate: false }).post(playerStatistic)

		await updatePlayerStatistic()
		if (updateError.value) {
			alert(t('error-messages.unknow-error'))
			return
		}
	})
	return router.go(-1)
}

const totalGoals = computed(() => {
	let sum = 0
	matchStatistic.value.forEach(element => {
		if (element.attendance)
			sum = Number(sum) + Number(element.goalsScored ? element.goalsScored : 0)
	})

	if (match.value.goalsScored && sum > match.value.goalsScored) match.value.goalsScored = sum

	return sum
})

</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>

					<template #nav>
						<button @click="isHidden = !isHidden">
							<img src="../../../../../assets/filter-icon.png" class="h-24px" />
						</button>
					</template>

					<template #icon>
						<img src="../../../../../assets/statistic-icon2.png" class="h-150px" />
					</template>

					<template #attributes>

						<LoadingCircle v-if="isFetching"></LoadingCircle>

						<div v-else-if="isFinished && !error"
							class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

							<StatisticSortOptions :statisticType="'match'" @changeSorting="changeSorting" v-if="!isHidden">
							</StatisticSortOptions>

							<div class="flex flex-col gap-2">
								<div class="flex flex-row gap-2 w-full px-2">
									<p class="font-medium">{{ t('single-event.result') }}: </p>
									<select class="flex border-1 border-#143547 text-xs shadow-lg" v-model="match.goalsScored">
										<option v-for="number in goalsNumber">{{ number }}
										</option>
									</select>
									<p class="font-medium">:</p>
									<select class="flex border-1 border-#143547 text-xs shadow-lg" v-model="match.goalsConceded">
										<option v-for="number in goalsNumber">{{ number }}
										</option>
									</select>
								</div>
								<div class="flex flex-row gap-2 w-full px-2">
									<p class="font-medium">{{ t('single-event.duration') }}: </p>
									<select class="flex border-1 border-#143547 text-xs shadow-lg" v-model="match.duration">
										<option v-for="number in minutesNumber">{{ number }}
										</option>
									</select>
									<p>{{ t('single-event.minutes') }}</p>
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

								<div v-if="matchStatistic.length != 0" v-for="statistic in sortedStatistic" v-bind:key="statistic._id"
									class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

									<SingleStatistic>
										<template #name>{{ t('match-statistic.player') }}</template>
										<template #data>{{ statistic.player.lastName }} {{ statistic.player.firstName }}</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.attendance') }}</template>
										<template #data>
											<div class="self-center justify-self-center text-xs">
												<button @click="statistic.attendance = !statistic.attendance">
													<img v-if="statistic.attendance" src="../../../../../assets/checkbox-checked-icon.png"
														class="h-18px" />
													<img v-else src="../../../../../assets/checkbox-unchecked-icon.png" class="h-18px" />
												</button>
											</div>
										</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.goals-scored') }}</template>
										<template #data v-if="statistic.attendance">
											<select class="flex self-center justify-self-center border-1 border-#143547 text-xs shadow-lg"
												v-model="statistic.goalsScored">
												<option v-for="number in goalsNumber">{{ number }}
												</option>
											</select>
										</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.yellow-cards') }}</template>
										<template #data v-if="statistic.attendance">
											<select class="flex self-center justify-self-center  border-1 border-#143547 text-xs shadow-lg"
												v-model="statistic.yellowCards">
												<option :value="0">0</option>
												<option :value="1">1</option>
												<option :value="2">2</option>
											</select>
										</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.red-cards') }}</template>
										<template #data v-if="statistic.attendance">
											<div class="w-full flex flex-col">
												<div class="flex justify-center">
													<select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.redCards">
														<option :value="0">0</option>
														<option :value="1">1</option>
													</select>
												</div>
												<p class="text-xs text-red flex text-center flex-wrap"
													v-if="statistic.yellowCards === 2 && statistic.redCards != 1">
													{{ t('error-messages.red-cards-message') }}
												</p>
											</div>
										</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data v-if="statistic.attendance">
											<select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.minutesPlayed">
												<option v-for="number in Number(match.duration)">{{ number }}
												</option>
											</select>
										</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.remarks') }}</template>
										<template #data>
											<textarea v-model="statistic.remarks" type="textarea" placeholder=""
												class="flex flex-auto w-full border-1 h-18px border-#143547 shadow-lg px-1"></textarea>
										</template>
									</SingleStatistic>

									<div class="self-center justify-self-center col-span-2 block md:(hidden)">
										<img src="../../../../../assets/line-icon.png" class="w-full" />
									</div>
								</div>

								<ErrorMessageInfo v-else>
									{{ t('error-messages.no-players-in-team') }}
								</ErrorMessageInfo>
							</div>

						</div>

					</template>

					<template #footer>
						<SingleButton @click="onSubmit()">
							<template v-slot:buttonName>{{ t('button.save') }}</template>
						</SingleButton>
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