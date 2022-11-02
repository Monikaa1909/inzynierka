<script setup lang="ts">
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Training } from 'backend/database/schemas/Training'
import { Player } from 'backend/database/schemas/Player'

const { t, availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const attendanceList = ref([] as Omit<AttendanceList[], '_id'>)
const playerAttendance = ref({} as Omit<AttendanceList, '_id'>)
const training = ref({} as Omit<Training, '_id'>)
const playerUrl = ref(``)

const {
	data: attendanceListData,
	isFetching: isAttendanceListFetching,
	error: attendanceListError,
	execute: refechAttendanceList
} = useFetch(`/api/attendanceList/${props.id}`, { initialData: [] }).json<AttendanceList[]>()

const {
	data: trainingData,
	isFetching: isTrainingListFetching,
	error: trainingListError,
	execute: refechTraining
} = useFetch(`/api/training/${props.id}`, { initialData: {}, immediate: false }).json<Training>()

const {
	data: players,
	isFetching: isPlayersFetching,
	error: playersError,
	execute: refechPlayers
} = useFetch(playerUrl, { initialData: [], immediate: false }).json<Player[]>()

whenever(attendanceListData, (data) => {
	attendanceList.value = data
	if (attendanceList.value.length === 0) {
		refechTraining()
	}
})

whenever(trainingData, (data) => {
	training.value = data
	playerUrl.value = `/api/players/team/${data.team._id}`
	console.log('refechPlayers()')
	refechPlayers()
})

whenever(players, (data) => {
	if (data.length > 0) {
		data.forEach(async element => {
			playerAttendance.value.player = element
			playerAttendance.value.training = training as unknown as Training
			const { execute: savePlayerAttendance, error: saveError } = useFetch(`/api/attendanceList`, { immediate: false }).post(playerAttendance)
			await savePlayerAttendance()
			if (saveError.value) {
				alert(t('error-messages.unknow-error'))
				return
			}
			refechAttendanceList()
		})
	}
})

const isFetching = computed(() => {
	return isAttendanceListFetching.value || isPlayersFetching.value || isTrainingListFetching.value
})


const error = computed(() => {
	return attendanceListError.value && playersError.value && trainingListError.value
})


</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<LoadingCircle v-if="isFetching"></LoadingCircle>

				<TraininingAttendanceList v-else-if="attendanceList.length > 0" :id="props.id" :edit="false">
				</TraininingAttendanceList>

				<ErrorMessageInfo v-else-if="!error && players?.length === 0">
					{{ t('error-messages.no-players-in-team') }}
				</ErrorMessageInfo>
				<ErrorMessageInfo v-else></ErrorMessageInfo>
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>