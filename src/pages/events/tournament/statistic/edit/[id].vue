<script setup lang="ts">
import { validateName, requiredField } from '~/validatesFunctions'

import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { Tournament } from 'backend/database/schemas/Tournament'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const tournamentStatistic = ref([] as TournamentStatistic[])
const playerStatistic = ref({} as TournamentStatistic)
const tournament = ref(<Tournament>({}))

const playerUrl = ref(``)

const {
	data: tournamentData,
	isFetching: isTournamentFetching,
	isFinished: isTournamentFinished,
	error: tournamentError,
} = useFetch(`/api/tournament/${props.id}`, { initialData: {} }).json<Tournament>()

whenever(tournamentData, (data) => {
	tournament.value = data
	tournament.value.startDate = new Date(tournament.value.startDate) as unknown as Date
	tournament.value.endDate = new Date(tournament.value.endDate) as unknown as Date
	playerUrl.value = `/api/players/team/${data.team._id}`
})

const {
	data: tournamentStatisticData,
	isFetching: isTournamentStatisticFetching,
	isFinished: isTournamentStatisticFinished,
	error: tournamentStatisticError,
} = useFetch(`/api/tournamentStatistic/tournament/${props.id}`, { initialData: [] }).json<TournamentStatistic[]>()

whenever(tournamentStatisticData, (data) => {
	tournamentStatistic.value = data
})

const isFinished = computed(() => {
	return isTournamentFinished.value && isTournamentStatisticFinished.value
})

const isFetching = computed(() => {
	return isTournamentFetching.value || isTournamentStatisticFetching.value
})

const error = computed(() => {
	return tournamentError.value && tournamentStatisticError.value
})

const sortedStatistic = computed(() => {
	tournamentStatistic.value.sort(function (a: any, b: any) {
		if (a.player.lastName < b.player.lastName) return -1
		else return 1
	})
	return tournamentStatistic.value
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
	if (nameErrorMessage.value) {
		alert(t('error-messages.validation-error') + ' crewAssistantHelp@gmail.com')
		return
	} else {
		const { execute: updateTournament, error: updateError } = useFetch(`/api/tournament/${tournament.value._id}`, { immediate: false }).post(tournament)
		await updateTournament()
		if (updateError.value) {
			alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
			return
		}

		tournamentStatistic.value.forEach(async element => {
			playerStatistic.value.attendance = element.attendance
			playerStatistic.value.remarks = element.remarks
			if (element.attendance) {
				playerStatistic.value.goalsScored = element.goalsScored ? element.goalsScored : 0
				playerStatistic.value.yellowCards = element.yellowCards ? element.yellowCards : 0
				playerStatistic.value.redCards = element.redCards ? element.redCards : 0
				playerStatistic.value.minutesPlayed = element.minutesPlayed ? element.minutesPlayed : 0
			} else {
				playerStatistic.value.goalsScored = 0
				playerStatistic.value.yellowCards = 0
				playerStatistic.value.redCards = 0
				playerStatistic.value.minutesPlayed = 0
			}

			const { execute: updatePlayerStatistic, error: updateError } = useFetch(`/api/tournamentStatistic/${element._id}`, { immediate: false }).post(playerStatistic)

			await updatePlayerStatistic()
			if (updateError.value) {
				alert(t('error-messages.unknow-error'))
				return
			}
		})
		return router.go(-1)
	}
}

const nameErrorMessage = computed(() => {
	if (requiredField(tournament.value.tournamentName))
		return false
	else if (!validateName(tournament.value.tournamentName)) {
		return false
	}
	return t(validateName(tournament.value.tournamentName))
})

</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>

					<template #icon>
						<img src="../../../../../assets/statistic-icon2.png" class="h-150px" />
					</template>

					<template #attributes>

						<LoadingCircle v-if="isFetching"></LoadingCircle>

						<div v-else-if="isFinished && !error"
							class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

							<div class="flex flex-col gap-2 py-2">
								<div class="flex flex-row gap-2 w-full px-2 items-center">
									<p class="font-medium flex items-center">{{ t('single-event.name') }}: </p>
									<div class="flex flex-col flex-auto w-full">
										<input v-model="tournament.tournamentName" name="lastName" type="input"
											class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
										<p v-if="nameErrorMessage" class="flex text-xs"> {{ nameErrorMessage }}</p>
									</div>
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

								<div v-if="tournamentStatistic.length != 0" v-for="statistic in sortedStatistic"
									v-bind:key="statistic._id" class="h-full w-full grid grid-cols-2 gap-2 md:(grid-cols-7 gap-0)">

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
												<select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.redCards">
													<option :value="0">0</option>
													<option :value="1">1</option>
												</select>
												<p class="text-xs text-red flex text-center" v-if="statistic.yellowCards === 2">
													{{ t('error-messages.red-cards-message') }}
												</p>
											</div>
										</template>
									</SingleStatistic>

									<SingleStatistic>
										<template #name>{{ t('match-statistic.minutes-played') }}</template>
										<template #data v-if="statistic.attendance">
											<select class="flex  border-1 border-#143547 text-xs shadow-lg" v-model="statistic.minutesPlayed">
												<option v-for="number in minutesNumber">{{ number }}
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