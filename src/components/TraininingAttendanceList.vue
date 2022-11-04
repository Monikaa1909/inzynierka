<script setup lang="ts">
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Training } from 'backend/database/schemas/Training'
import { Player } from 'backend/database/schemas/Player'

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]
const router = useRouter()

const props = defineProps<{ id: string, edit?: boolean }>()

const attendanceList = ref([] as Omit<AttendanceList[], '_id'>)
const playerAttendance = ref({} as AttendanceList)
const playerUrl = ref(``)

const {
	data: attendanceListData,
	isFetching: isAttendanceListFetching,
	isFinished: isAttendanceListFinished,
	error: attendanceListError,
	execute: refechAttendanceList
} = useFetch(`/api/attendanceList/training/${props.id}`, { initialData: [] }).json<AttendanceList[]>()

const {
	data: training,
	isFetching: isTrainingFetching,
	isFinished: isTrainingFinished,
	error: trainingListError,
	execute: refechTraining
} = useFetch(`/api/training/${props.id}`, { initialData: {}, immediate: false }).json<Training>()

const {
	data: players,
	isFetching: isPlayersFetching,
	isFinished: isPlayersFinished,
	error: playersError,
	execute: refechPlayers
} = useFetch(playerUrl, { initialData: [], immediate: false }).json<Player[]>()

whenever(attendanceListData, (data) => {
	attendanceList.value = data
	if (attendanceList.value != null && attendanceList.value.length === 0) {
		console.log('brak listy, tworzenie ')
		refechTraining()
	}
})

whenever(isTrainingFinished, (data) => {
	if (data && training.value != null) {
		playerUrl.value = `/api/players/team/${training.value.team._id}`
		refechPlayers()
	}
})

whenever(isPlayersFinished, (data) => {
	if (data && players.value != null && players.value.length > 0) {
		players.value.forEach(async element => {

			playerAttendance.value.player = element
			playerAttendance.value.training = training as unknown as Training

			const { execute: savePlayerAttendance, error: saveError } = useFetch(`/api/attendanceList`, { immediate: false }).post(playerAttendance)
			await savePlayerAttendance()
			
			if (saveError.value) {
				alert(t('error-messages.unknow-error'))
				return
			}
		})
		refechAttendanceList()
	}
})

const isFinished = computed(() => {
	return isAttendanceListFinished.value
})

const isFetching = computed(() => {
	return isAttendanceListFetching.value || isPlayersFetching.value || isTrainingFetching.value
})

const error = computed(() => {
	return attendanceListError.value && trainingListError.value && playersError.value
})

const onSubmit = async () => {

	if (props.edit) {
		attendanceList.value.forEach(async element => {
			playerAttendance.value.attendance = element.attendance
			playerAttendance.value.remarks = element.remarks

			const { execute: updatePlayerAttendance, error: updateError } = useFetch(`/api/attendanceList/${element._id}`, { immediate: false }).post(playerAttendance)

			await updatePlayerAttendance()
			if (updateError.value) {
				alert(t('error-messages.unknow-error'))
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
			<button @click="goEditAttendanceList(props.id)">
				<img src="../assets/edit-icon.png" class="h-24px" />
			</button>
		</template>

		<template #icon>
			<img src="../assets/attendance-list-icon2.png" class="h-150px" />
		</template>

		<template #attributes>

			<LoadingCircle v-if="isFetching"></LoadingCircle>

			<ErrorMessageInfo v-else-if="!error && isFinished && players?.length === 0 && attendanceList.length === 0">
				{{ t('error-messages.no-players-in-team') }}
			</ErrorMessageInfo>

			<div v-else-if="isFinished && !error" v-for="playerAttendance in attendanceList" v-bind:key="playerAttendance._id"
				class="w-full  flex flex-row gap-4 place-content-between">
				<div class="w-auto flex flex-row gap-2">
					<button v-if="props.edit" @click="playerAttendance.attendance = !playerAttendance.attendance">
						<img v-if="playerAttendance.attendance" src="../assets/checkbox-checked-icon.png" class="h-18px" />
						<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-18px" />
					</button>
					<div v-else>
						<img v-if="playerAttendance.attendance" src="../assets/checkbox-checked-icon.png" class="h-18px" />
						<img v-else src="../assets/checkbox-unchecked-icon.png" class="h-18px" />
					</div>
					<p class="flex items-center">{{ playerAttendance.player.firstName }}</p>
					<p class="flex items-center">{{ playerAttendance.player.lastName }}</p>
				</div>
				<div class="w-auto flex flex-row gap-2 items-center">
					<p class=" flex text-sm" v-if="!props.edit && playerAttendance.remarks">({{ playerAttendance.remarks }})</p>
					<textarea v-else-if="props.edit" v-model="playerAttendance.remarks"
						class="flex flex-auto w-full text-xs border-1 border-#143547 h-24px shadow-lg"></textarea>
				</div>
			</div>

			<ErrorMessageInfo v-else></ErrorMessageInfo>

		</template>

		<template #footer>
			<SingleButton v-if="props.edit" @click="onSubmit()">
				<template v-slot:buttonName>{{ t('button.save') }}</template>
			</SingleButton>
			<SingleButton @click="router.go(-1)">
				<template v-slot:buttonName>{{ t('button.cancel') }}</template>
			</SingleButton>
		</template>

	</MiniWhiteFrame>

</template>

<route lang="yaml">
meta:
  layout: home
</route>

