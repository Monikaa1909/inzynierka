<script setup lang="ts">
import { Training } from 'backend/database/schemas/Training'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const training = ref(<Training>({}))

const {
	data: trainingData,
	isFetching,
	isFinished,
	error,
} = useFetch(`/api/training/${props.id}`, { initialData: {} }).json<Training>()

whenever(trainingData, (data) => {
	training.value = data
	training.value.date = new Date(training.value.date) as unknown as Date
})

const getHour = (date: Date) => {
	if (date.getHours().toLocaleString(locale.value).length == 2)
		return date.getHours().toLocaleString(locale.value)
	else
		return '0' + date.getHours().toLocaleString(locale.value)
}

const getMinutes = (date: Date) => {
	if (date.getMinutes().toLocaleString(locale.value).length == 2)
		return date.getMinutes().toLocaleString(locale.value)
	else
		return '0' + date.getMinutes().toLocaleString(locale.value)
}

const goEditEvent = (eventId: any) => {
	return router.push(`/events/edit/training/${eventId}`)
}

const showAttendanceList = (eventId: any) => {
  return router.push(`/events/training/attendanceList/${eventId}`)
}

const isDeleting = ref(false)
const deletingEventId = ref<any>()

const deleteEvent = (id: string) => {
	isDeleting.value = true
	deletingEventId.value = id
}

const cancelDeleting = () => {
	isDeleting.value = false
}

const confirmDelete = async () => {
	isDeleting.value = false
	await useFetch(`/api/training/${deletingEventId.value}`).delete()
	return router.go(-1)
}
</script>

<template>
	<BackgroundFrame>
		<template #data>

			<DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
			</DeletingMesageDialog>

			<LoadingCircle v-else-if="isFetching"></LoadingCircle>

			<MyCenterElement v-if="isFinished && !isDeleting && !error && training">
				<MiniWhiteFrame>
					<template #nav>
						<button @click="showAttendanceList(props.id)">
							<img src="../../../assets/statistic-icon.png" class="h-24px" />
						</button>
						<button @click="goEditEvent(props.id)">
							<img src="../../../assets/edit-icon.png" class="h-24px" />
						</button>
						<button @click="deleteEvent(props.id)">
							<img src="../../../assets/delete-icon.png" class="h-24px" />
						</button>
					</template>

					<template #icon>
						<img src="../../../assets/training-icon.png" class="h-150px" />
					</template>

					<template #attributes>
						<SingleAttribute>
							<template #attributeName>{{ t('single-event.type') }}:</template>
							<template #attributeValue>{{ t('events.lower-case.tournament') }}</template>
						</SingleAttribute>
					
						<SingleAttribute>
							<template #attributeName>{{ t('single-event.date') }}:</template>
							<template #attributeValue>
								{{ training.date.toLocaleDateString(locale) }}
							</template>
						</SingleAttribute>

						<SingleAttribute>
                <template #attributeName>{{ t('single-event.team') }}:</template>
                <template #attributeValue>{{ training.team.teamName }}</template>
              </SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.hour') }}:</template>
							<template #attributeValue>{{ getHour(training.date) }}:{{ getMinutes(training.date) }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.object') }}:</template>
							<template #attributeValue>{{ training.sportsFacility?.name }}</template>
						</SingleAttribute>

						<SingleAttribute >
							<template #attributeName>{{ t('single-event.remarks') }}:</template>
							<template #attributeValue>{{ training.remarks }}</template>
						</SingleAttribute>
					</template>
					
					<template #footer>
						<SingleButton @click="router.go(-1)">
							<template #buttonName>{{ t('button.back') }}</template>
						</SingleButton>
					</template>
				</MiniWhiteFrame>
			</MyCenterElement>

			<ErrorMessageInfo v-else-if="!isDeleting && isFinished && !training">
				{{ t('error-messages.no-data') }}
			</ErrorMessageInfo>
			<ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>