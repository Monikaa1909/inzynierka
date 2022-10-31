<script setup lang="ts">
import { Tournament } from 'backend/database/schemas/Tournament'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const tournament = ref(<Tournament>({}))

const {
	data: tournamentData,
	isFetching,
	isFinished,
	error,
} = useFetch(`/api/tournament/${props.id}`, { initialData: {} }).json<Tournament>()

whenever(tournamentData, (data) => {
	tournament.value = data
	tournament.value.startDate = new Date(tournament.value.startDate) as unknown as Date
	tournament.value.endDate = new Date(tournament.value.endDate) as unknown as Date
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
	return router.push(`/events/edit/${eventId}`)
}

const showTournamentStatistic = (eventId: any) => {
  return router.push(`/events/statistic/tournament/${eventId}`)
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
	await useFetch(`/api/tournament/${deletingEventId.value}`).delete()
	return router.go(-1)
}
</script>

<template>
	<BackgroundFrame>
		<template #data>

			<DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
			</DeletingMesageDialog>

			<LoadingCircle v-else-if="isFetching"></LoadingCircle>

			<MyCenterElement v-if="isFinished && !isDeleting && !error && tournament">
				<MiniWhiteFrame>
					<template #nav>
						<button @click="showTournamentStatistic(props.id)">
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
						<img src="../../../assets/tournament-icon.png" class="h-150px" />
					</template>

					<template #attributes>
						<SingleAttribute>
							<template #attributeName>{{ t('single-event.type') }}:</template>
							<template #attributeValue>{{ t('events.lower-case.tournament') }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.name') }}:</template>
							<template #attributeValue>
								{{ tournament.tournamentName }}
							</template>
						</SingleAttribute>

						<SingleAttribute v-if="tournament.friendly">
							<template #attributeName>{{ t('single-event.type-of-tournament')}}:</template>
							<template #attributeValue>
								{{ t('single-event.friendly') }}
							</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.start-date') }}:</template>
							<template #attributeValue>
								{{ tournament.startDate.toLocaleDateString(locale) }}
							</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.hour') }}:</template>
							<template #attributeValue>{{ getHour(tournament.startDate) }}:{{ getMinutes(tournament.startDate) }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.end-date') }}:</template>
							<template #attributeValue>{{ tournament.endDate.toLocaleDateString(locale) }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.team') }}:</template>
							<template #attributeValue>{{ tournament.team.teamName }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.object') }}:</template>
							<template #attributeValue>{{ tournament.sportsFacility?.name }}</template>
						</SingleAttribute>

						<SingleAttribute >
							<template #attributeName>{{ t('single-event.remarks') }}:</template>
							<template #attributeValue>{{ tournament.remarks }}</template>
						</SingleAttribute>
					</template>
					
					<template #footer>
						<SingleButton @click="router.go(-1)">
							<template #buttonName>{{ t('button.back') }}</template>
						</SingleButton>
					</template>
				</MiniWhiteFrame>
			</MyCenterElement>

			<ErrorMessageInfo v-else-if="!isDeleting && isFinished && !tournament">
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