<script setup lang="ts">
import { Match } from 'backend/database/schemas/Match'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const match = ref(<Match>({}))

const {
	data: matchData,
	isFetching,
	isFinished,
	error,
} = useFetch(`/api/match/${props.id}`, {
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
	},
}).json<Match>()

whenever(matchData, (data) => {
	match.value = data
	match.value.date = new Date(match.value.date) as unknown as Date
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
	return router.push(`/events/match/edit/${eventId}`)
}

const showMatchStatistic = (eventId: any) => {
	return router.push(`/events/match/statistic/${eventId}`)
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
	await useFetch(`/api/matchStatistic/${deletingEventId.value}`, {
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
		},
	}).delete()

	await useFetch(`/api/match/${deletingEventId.value}`, {
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
		},
	}).delete()

	return router.go(-1)
}
</script>

<template>
	<BackgroundFrame v-if="payload">
		<template #data>

			<DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
			</DeletingMessageDialog>

			<LoadingCircle v-else-if="isFetching"></LoadingCircle>

			<MyCenterElement v-if="isFinished && !isDeleting && !error && match">
				<MiniWhiteFrame>
					<template #nav>
						<button @click="showMatchStatistic(props.id)">
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
						<img src="../../../assets/match-icon.png" class="h-150px" />
					</template>

					<template #attributes>
						<SingleAttribute>
							<template #attributeName>{{ t('single-event.type') }}:</template>
							<template #attributeValue>{{ t('events.lower-case.match') }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.date') }}:</template>
							<template #attributeValue>
								{{ match.date.toLocaleDateString(locale) }}
							</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.hour') }}:</template>
							<template #attributeValue>{{ getHour(match.date) }}:{{ getMinutes(match.date) }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.team') }}:</template>
							<template #attributeValue>{{ match.team.teamName }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.object') }}:</template>
							<template #attributeValue>{{ match.sportsFacility?.name }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.opponent') }}:</template>
							<template #attributeValue>{{ match.opponent }}</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.result') }}:</template>
							<template #attributeValue>
								{{ match.goalsScored }} : {{ match.goalsConceded }}
							</template>
						</SingleAttribute>

						<SingleAttribute>
							<template #attributeName>{{ t('single-event.remarks') }}:</template>
							<template #attributeValue>{{ match.remarks }}</template>
						</SingleAttribute>
					</template>

					<template #footer>
						<SingleButton @click="router.go(-1)">
							<template #buttonName>{{ t('button.back') }}</template>
						</SingleButton>
					</template>
				</MiniWhiteFrame>
			</MyCenterElement>

			<ErrorMessageInfo v-else-if="!isDeleting && isFinished && !match">
				{{ t('error-messages.no-data') }}
			</ErrorMessageInfo>
			<ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
		</template>
	</BackgroundFrame>

	<GoSignIn v-else></GoSignIn>
</template>

<route lang="yaml">
meta:
  layout: home
</route>