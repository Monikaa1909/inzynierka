<script setup lang="ts">
import { validateStartYear, validateEndYear, validateName } from '~/validatesFunctions'
import { useJwt } from '@vueuse/integrations/useJwt'

import type { Academy } from 'backend/database/schemas/Academy'
import type { Trainer } from 'backend/database/schemas/Trainer.user'
import type { Team } from 'backend/database/schemas/Team'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const token = useStorage('user:token', '')
const { payload } = useJwt(() => token.value ?? '')

const props = defineProps<{ teamId?: string }>()

const url = computed(() => props.teamId
	? `/api/team/${props.teamId}`
	: '/api/team'
)

const team = ref({} as Omit<Team, '_id'>)
const trainers = ref([] as Omit<Trainer[], '_id'>)

if (!props.teamId) {
	team.value = {
		teamName: '',
		startYear: undefined!,
		endYear: undefined!,
		trainer: undefined,
		academy: undefined!
	}
}

const {
	data: teamData,
	isFetching: isTeamFetching,
	isFinished: isTeamFinished,
	error: teamError,
} = useFetch(url, { initialData: {} }).json<Team>()

whenever(teamData, (data) => {
	team.value = data
})

const {
	data: trainersData,
	isFetching: isTrainersFetching,
	isFinished: isTrainersFinished,
	error: trainersError,
} = useFetch(`/api/trainers/academy/${payload.value.academy}`, { initialData: [] }).json<Trainer[]>()

const {
	data: academyData,
	isFetching: isAcademyFetching,
	isFinished: isAcademyFinished,
	error: academyError,
} = useFetch(`/api/academy/${payload.value.academy}`, { initialData: {} }).json<Academy>()

whenever(trainersData, (data) => {
	trainers.value = data
	trainers.value.map(element => element.academy = element.academy._id as unknown as Academy)
})

const isFinished = computed(() => {
	return isTeamFinished.value && isTrainersFinished.value && isAcademyFinished.value
})

const isFetching = computed(() => {
	return isTeamFetching.value && isTrainersFetching.value && isAcademyFetching.value
})

const error = computed(() => {
	return teamError.value && trainersError.value && academyError
})

const { execute: saveTeam, error: saveError } = useFetch(url, { immediate: false }).post(team)
const { execute: updateTeam, error: updateError } = useFetch(url, { immediate: false }).post(team)

const onSubmit = async (values: any) => {
	if (teamNameErrorMessage.value || startYearErrorMessage.value || endYearErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.teamId) {
			if (academyData.value) {
				team.value.academy = academyData.value
				if (team.value.trainer === undefined)
				await saveTeam()
				if (saveError.value) {
					alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
				}
			}
		} else {
			await updateTeam()
			if (updateError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
		}
		return router.push('/teams/all')
	}
}

const teamNameErrorMessage = computed(() => {
	if (!validateName(team.value.teamName)) {
		return false
	}
	return t(validateName(team.value.teamName))
})

const startYearErrorMessage = computed(() => {
	if (!validateStartYear(team.value.startYear, team.value.endYear)) {
		return false
	}
	return t(validateStartYear(team.value.startYear, team.value.endYear))
})

const endYearErrorMessage = computed(() => {
	if (!validateEndYear(team.value.endYear, team.value.startYear)) {
		return false
	}
	return t(validateEndYear(team.value.endYear, team.value.startYear))
})

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>
	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">

		<SingleInput>
			<template #inputName>{{ t('single-team.name') }}:</template>
			<template #inputValue>
				<input v-model="team.teamName" name="name" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="teamNameErrorMessage">
				{{ teamNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-team.years') }}:</template>
			<template #inputValue>
				<div class="flex w-full flex-row items-center gap-2">
					<input v-model="team.startYear" name="startYear" type="input"
						class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
					<p>-</p>
					<input v-model="team.endYear" name="endYear" type="input"
						class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
				</div>
			</template>
			<template #errorMessage v-if="startYearErrorMessage || endYearErrorMessage">
				<p v-if="startYearErrorMessage">{{ startYearErrorMessage }}</p>
				<p v-if="endYearErrorMessage">{{ endYearErrorMessage }}</p>
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-team.trainer') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="team.trainer">
						<option v-for="trainer in trainers" :value="trainer">{{ trainer.firstName }} {{ trainer.lastName
						}}
						</option>
						<option :value="null">{{ t('single-team.no-trainer') }}</option>
					</select>
				</div>
			</template>
		</SingleInput>
		<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
			<SingleButton @click="onSubmit">
				<template #buttonName>{{ t('button.save') }}</template>
			</SingleButton>
			<SingleButton @click="router.go(-1)">
				<template #buttonName>{{ t('button.cancel') }}</template>
			</SingleButton>
		</div>
	</div>

	<ErrorMessageInfo v-else-if="error"></ErrorMessageInfo>

</template>

<route lang="yaml">
meta:
  layout: home
</route>