<script setup lang="ts">
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Training } from 'backend/database/schemas/Training'
import { Player } from 'backend/database/schemas/Player'

const token = useStorage('user:token', '')

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales

locale.value = locales[(locales.indexOf(locale.value)) % locales.length]
const router = useRouter()

const props = defineProps<{ id: string, edit?: boolean }>()

const attendanceList = ref([] as Omit<AttendanceList[], '_id'>)
const playerAttendance = ref({} as AttendanceList)
const playerUrl = ref(``)
const isAttendanceList = ref(false)
const messageInfo = ref('error-messages.no-statistics')

const {
	data: training,
	isFetching: isTrainingFetching,
	isFinished: isTrainingFinished,
	error: trainingError,
} = useFetch(`/api/training/${props.id}`, {
	initialData: {},
	async beforeFetch({ url, options, cancel }) {
		const myToken = token.value
		if (!myToken)
			cancel()

		options.headers = {
			...options.headers,
			Authorization: `Bearer ${myToken}`,
		}

		return {
			options,
		}
	}
}).json<Training>()

const {
	data: attendanceListData,
	isFetching: isAttendanceListFetching,
	isFinished: isAttendanceListFinished,
	error: attendanceListError,
	execute: refechAttendanceList
} = useFetch(`/api/attendanceLists/training/${props.id}`, {
	initialData: [], immediate: false,
	async beforeFetch({ url, options, cancel }) {
		const myToken = token.value
		if (!myToken)
			cancel()

		options.headers = {
			...options.headers,
			Authorization: `Bearer ${myToken}`,
		}

		return {
			options,
		}
	}
}).json<AttendanceList[]>()

const {
	data: players,
	isFetching: isPlayersFetching,
	error: playersError,
	execute: refechPlayers
} = useFetch(playerUrl, {
	initialData: [], immediate: false,
	async beforeFetch({ url, options, cancel }) {
		const myToken = token.value
		if (!myToken)
			cancel()

		options.headers = {
			...options.headers,
			Authorization: `Bearer ${myToken}`,
		}

		return {
			options,
		}
	}
}).json<Player[]>()

whenever(isTrainingFinished, (data) => {
	if (data && training.value != null) {
		playerUrl.value = `/api/players/team/${training.value.team._id}`
		refechAttendanceList()
	}
})

whenever(attendanceListData, (data) => {
	attendanceList.value = data
	if (attendanceList.value != null && attendanceList.value.length === 0) {
		isAttendanceList.value = false
		return
	} else {
		isAttendanceList.value = true
	}
})

whenever(players, (data) => {
	if (players.value != null && players.value.length > 0) {
		players.value.forEach(async element => {
			if (!isAttendanceList.value) {
				playerAttendance.value.player = element
				playerAttendance.value.training = training as unknown as Training

				const { execute: savePlayerAttendance, error: saveError } = useFetch(`/api/attendanceList`, {
					immediate: false,
					async beforeFetch({ url, options, cancel }) {
						const myToken = token.value
						if (!myToken)
							cancel()

						options.headers = {
							...options.headers,
							Authorization: `Bearer ${myToken}`,
						}

						return {
							options,
						}
					}
				}).post(playerAttendance)

				await savePlayerAttendance()

				if (saveError.value) {
					alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
				} else return router.push(`/events/training/attendanceList/${props.id}`)
			}

			else {
				if (!isPlayerHasStatistic(element)) {
					playerAttendance.value.player = element
					playerAttendance.value.training = training as unknown as Training

					const { execute: savePlayerAttendance, error: saveError } = useFetch(`/api/attendanceList`, {
						immediate: false,
						async beforeFetch({ url, options, cancel }) {
							const myToken = token.value
							if (!myToken)
								cancel()

							options.headers = {
								...options.headers,
								Authorization: `Bearer ${myToken}`,
							}

							return {
								options,
							}
						}
					}).post(playerAttendance)
					await savePlayerAttendance()

					if (saveError.value) {
						alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
						return
					}
				}
			}
		})

		refechAttendanceList()
	} else
		messageInfo.value = 'error-messages.no-players-in-team'
})

const isPlayerHasStatistic = (player: Player) => {
	let isPlayerHas = false
	attendanceList.value?.forEach(element => {
		if (element.player._id === player._id)
			isPlayerHas = true
	})
	return isPlayerHas
}

const isFinished = computed(() => {
	return isAttendanceListFinished.value
})

const isFetching = computed(() => {
	return isAttendanceListFetching.value || isPlayersFetching.value || isTrainingFetching.value
})

const error = computed(() => {
	return attendanceListError.value && trainingError.value && playersError.value
})

const onSubmit = async () => {

	if (props.edit) {
		attendanceList.value.forEach(async element => {
			playerAttendance.value.attendance = element.attendance
			playerAttendance.value.remarks = element.remarks

			const { execute: updatePlayerAttendance, error: updateError } = useFetch(`/api/attendanceList/${element._id}`, {
				immediate: false,
				async beforeFetch({ url, options, cancel }) {
					const myToken = token.value
					if (!myToken)
						cancel()

					options.headers = {
						...options.headers,
						Authorization: `Bearer ${myToken}`,
					}

					return {
						options,
					}
				}
			}).post(playerAttendance)

			await updatePlayerAttendance()
			if (updateError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
		})
	}
	return router.go(-1)
}

const goEditAttendanceList = (eventId: any) => {
	return router.push(`/events/training/attendanceList/edit/${eventId}`)
}

</script>

<template>

	<MiniWhiteFrame>

		<template #nav v-if="!props.edit">
			<button @click="refechPlayers()">
				<img src="../assets/refresh-icon.png" class="h-24px" />
			</button>
			<button @click="goEditAttendanceList(props.id)">
				<img src="../assets/edit-icon.png" class="h-24px" />
			</button>
		</template>

		<template #icon>
			<img src="../assets/attendance-list-icon.png" class="h-150px" />
		</template>

		<template #attributes>

			<LoadingCircle v-if="isFetching"></LoadingCircle>

			<div v-else-if="isFinished && !error && isAttendanceList" v-for="playerAttendance in attendanceList"
				v-bind:key="playerAttendance._id"
				class="w-full flex flex-col gap-4 place-content-between sm:(flex-row place-content-between)">

				<div class="w-auto flex flex-col gap-2 justify-center sm:(flex-row)">

					<button v-if="props.edit" @click="playerAttendance.attendance = !playerAttendance.attendance"
						class="flex w-full justify-center">
						<img v-if="playerAttendance.attendance" src="../assets/checkbox-checked-icon.png" class="h-18px" />
						<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-18px" />
					</button>

					<div v-else class="flex w-full justify-center">
						<img v-if="playerAttendance.attendance" src="../assets/checkbox-checked-icon.png" class="h-18px" />
						<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-18px" />
					</div>

					<p class=" w-full  items-center text-center">{{ playerAttendance.player.firstName }}</p>
					<p class=" w-full items-center  text-center">{{ playerAttendance.player.lastName }}</p>
				</div>

				<div class="w-auto flex flex-row gap-2 items-center">
					<p class=" flex text-sm" v-if="!props.edit && playerAttendance.remarks">({{ playerAttendance.remarks }})</p>
					<textarea v-else-if="props.edit" v-model="playerAttendance.remarks"
						class="flex flex-auto w-full text-xs border-1 border-#143547 h-24px shadow-lg"></textarea>
				</div>

				<div class="self-center justify-self-center col-span-2 block sm:(hidden)">
					<img src="../assets/line-icon.png" class="w-full" />
				</div>
			</div>

			<ErrorMessageInfo v-else-if="!isAttendanceList">{{ t(messageInfo) }}</ErrorMessageInfo>
			<ErrorMessageInfo v-else>{{ t('error-messages.no-players-in-team') }}</ErrorMessageInfo>

		</template>

		<template #footer>
			<SingleButton v-if="props.edit" @click="onSubmit()">
				<template #buttonName>{{ t('button.save') }}</template>
			</SingleButton>
			<SingleButton v-if="props.edit" @click="router.go(-1)">
				<template #buttonName>{{ t('button.cancel') }}</template>
			</SingleButton>
			<SingleButton v-else @click="router.go(-1)">
				<template #buttonName>{{ t('button.back') }}</template>
			</SingleButton>
		</template>

	</MiniWhiteFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

