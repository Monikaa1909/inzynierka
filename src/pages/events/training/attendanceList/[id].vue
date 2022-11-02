<script setup lang="ts">
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Training } from 'backend/database/schemas/Training'
import { Player } from 'backend/database/schemas/Player'

const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const {
	data: attendanceList,
	isFetching: isAttendanceListFetching,
	isFinished: isAttendanceListFinished,
	error: attendanceListError,
	execute: refechAttendanceList
} = useFetch(`/api/attendanceList/${props.id}`, { initialData: [] }).json<AttendanceList[]>()

const {
	data: trainingData,
	isFetching: isTrainingListFetching,
	isFinished: isTrainingListFinished,
	error: trainingListError,
	execute: refechTraining
} = useFetch(`/api/training/${props.id}`, { initialData: {}, immediate: false }).json<Training>()

const playerUrl = ref(``)

const {
	data: players,
	isFetching: isPlayersFetching,
	isFinished: isPlayersFinished,
	error: playersError,
	execute: refechPlayers
} = useFetch(playerUrl, { initialData: [], immediate: false }).json<Player[]>()

whenever(attendanceList, (data) => {
	if (data.length === 0) {
		refechTraining()
	}
})

const training = ref({} as Omit<Training, '_id'>)

whenever(trainingData, (data) => {
	training.value = data
	playerUrl.value = `/api/players/team/${data.team._id}`
	refechPlayers()
})

const playerAttendance = ref({} as Omit<AttendanceList, '_id'>)
whenever(players, (data) => {
	console.log(data.length)
	data.forEach(async element => {
		console.log(element.firstName)
		playerAttendance.value.player = element
		playerAttendance.value.training = training as unknown as Training
		const { execute: savePlayerAttendance, error: saveError } = useFetch(`/api/attendanceList`, { immediate: false }).post(playerAttendance)

		await savePlayerAttendance()
		if (saveError.value) {
			alert('sdvfdsv')
			return
		}


	})


	refechAttendanceList()
})



</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<TraininingAttendanceList v-if="attendanceList.length > 0" :id="props.id" :edit="false">
				</TraininingAttendanceList>
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>