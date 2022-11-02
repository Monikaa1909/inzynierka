<script setup lang="ts">
import { AttendanceList } from 'backend/database/schemas/AttendanceList'

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]
const router = useRouter()

const props = defineProps<{ id: string, edit?: boolean }>()

const attendanceList = ref([] as Omit<AttendanceList[], '_id'>)
const playerAttendance = ref({} as AttendanceList)

const {
	data: attendanceListData,
	isFetching: isAttendanceListFetching,
	isFinished: isAttendanceListFinished,
	error: attendanceListError,
} = useFetch(`/api/attendanceList/${props.id}`, { initialData: [] }).json<AttendanceList[]>()

whenever(attendanceListData, (data) => {
	attendanceList.value = data
})

const playerAttendanceId = ref('')

const {
	data: playerAttendanceData,
	isFetching: isPlayerAttendanceFetching,
	error: playerAttendanceError,
	execute: refetchPlayerAttendance
} = useFetch(`/api/attendanceList/${playerAttendanceId.value}`, { initialData: {}, immediate: false }).json<AttendanceList>()

const isFinished = computed(() => {
	return isAttendanceListFinished.value
})

const isFetching = computed(() => {
	return isAttendanceListFetching.value || isPlayerAttendanceFetching.value
})

const error = computed(() => {
	return attendanceListError.value && playerAttendanceError.value
})

const onSubmit = async () => {

	if (props.edit) {
		attendanceList.value.forEach(async element => {
			playerAttendanceId.value = element._id
			refetchPlayerAttendance()
			whenever(playerAttendanceData, (data) => {
				playerAttendance.value = data
			})

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

			<div v-if="isFinished && !error" v-for="playerAttendance in attendanceList" v-bind:key="playerAttendance._id"
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
					<p>{{ playerAttendance.player.firstName }}</p>
					<p>{{ playerAttendance.player.lastName }}</p>
				</div>
				<div class="w-auto flex flex-row gap-2 items-center">
					<p class=" flex text-sm" v-if="!props.edit && playerAttendance.remarks">({{ playerAttendance.remarks }})</p>
					<textarea v-else-if="props.edit" v-model="playerAttendance.remarks"
						class="flex flex-auto w-full text-xs border-1 border-#143547 h-24px shadow-lg"></textarea>
				</div>
			</div>

			<ErrorMessageInfo v-else-if="error"></ErrorMessageInfo>
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

