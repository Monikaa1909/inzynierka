<script setup lang="ts">
import { requiredField, validateFirstName, validateNationality } from '~/validatesFunctions'
import { DatePicker } from 'v-calendar'

import type { Trainer } from 'backend/database/schemas/Trainer'
import type { Academy } from 'backend/database/schemas/Academy'
import type { Player } from 'backend/database/schemas/Player'
import type { Parent } from 'backend/database/schemas/Parent'
import type { Team } from 'backend/database/schemas/Team'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ playerId?: string, teamId?: string }>()

const url = computed(() => props.playerId
	? `/api/player/${props.playerId}`
	: '/api/player'
)

const player = ref({} as Omit<Player, '_id'>)
const parents = ref([] as Omit<Parent[], '_id'>)
const teams = ref([] as Omit<Team[], '_id'>)

if (!props.playerId) {
	player.value = {
		firstName: '',
		lastName: '',
		birthdayDate: '',
		nationality: '',
		validityOfMedicalExaminations: '',
		remarks: '',
		team: undefined!,
		parent: undefined
	}
}

const {
	data: playerData,
	isFetching: isPlayersFetching,
	isFinished: isPlayerFinished,
	error: playerError,
} = useFetch(url, { initialData: {} }).json<Player>()

whenever(playerData, (data) => {
	player.value = data
})

const {
	data: teamsData,
	isFetching: isTeamsFetching,
	isFinished: isTeamsFinished,
	error: teamsError,
} = useFetch(`/api/teams/${academy}`, { initialData: [] }).json<Team[]>()

const {
	data: parentsData,
	isFetching: isParentsFetching,
	error: parentsError,
	isFinished: isParentsFinished,
} = useFetch(`/api/parents/${academy}`, { initialData: [] }).json<Parent[]>()

whenever(parentsData, (data) => {
	parents.value = data
	parents.value.map(element => element.academy = element.academy._id as unknown as Academy)
})

whenever(teamsData, (data) => {
	teams.value = data
	if (!props.playerId && props.teamId != 'all') {
		teams.value.forEach(element => {
			if (element._id === props.teamId) {
				player.value.team = element
			}
		});
	}
	teams.value.map(element => element.trainer = element.trainer._id as unknown as Trainer)
})

const isFinished = computed(() => {
	return isPlayerFinished.value && isTeamsFinished.value && isParentsFinished.value
})

const isFetching = computed(() => {
	return isPlayersFetching.value && isTeamsFetching.value && isParentsFetching.value
})

const error = computed(() => {
	return playerError.value && teamsError.value && parentsError.value
})

const { execute: savePlayer, error: saveError } = useFetch(url, { immediate: false }).post(player)
const { execute: updatePlayer, error: updateError } = useFetch(url, { immediate: false }).post(player)

const onSubmit = async () => {
	if (firstNameErrorMessage.value || lastNameErrorMessage.value || birthdayDateErrorMessage.value || nationalityErrorMessage.value
		|| validityOfMedicalExaminationsErrorMessage.value || teamErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.playerId) {
			await savePlayer()
			if (saveError.value) {
				alert(t('error-messages.unknow-error'))
				return
			}
		} else {
			await updatePlayer()
			if (updateError.value) {
				alert(t('error-messages.unknow-error'))
				return
			}
		}
		
		if (props.teamId) return router.push(`/players/team/${props.teamId}`)
		else return router.push('/players/team/all')
	}
}

const firstNameErrorMessage = computed(() => {
	if (!validateFirstName(player.value.firstName)) {
		return false
	}
	return t(validateFirstName(player.value.firstName))
})

const lastNameErrorMessage = computed(() => {
	if (!validateFirstName(player.value.lastName)) {
		return false
	}
	return t(validateFirstName(player.value.lastName))
})

const birthdayDateErrorMessage = computed(() => {
	if (!requiredField(player.value.birthdayDate)) {
		return false
	}
	return t(requiredField(player.value.birthdayDate))
})

const nationalityErrorMessage = computed(() => {
	if (!validateNationality(player.value.nationality)) {
		return false
	}
	return t(validateNationality(player.value.nationality))
})

const validityOfMedicalExaminationsErrorMessage = computed(() => {
	if (!requiredField(player.value.validityOfMedicalExaminations)) {
		return false
	}
	return t(requiredField(player.value.validityOfMedicalExaminations))
})

const teamErrorMessage = computed(() => {
	if (!requiredField(player.value.team)) {
		return false
	}
	return t(requiredField(player.value.team))
})

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput>
			<template #inputName>{{ t('single-player.first-name') }}:</template>
			<template #inputValue>
				<input v-model="player.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template v-if="firstNameErrorMessage" #errorMessage>
				{{ firstNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-player.last-name') }}:</template>
			<template #inputValue>
				<input v-model="player.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template v-if="lastNameErrorMessage" #errorMessage>
				{{ lastNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-player.birthday-date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="player.birthdayDate" format="yyyy-MM-dd" :clearable="false" class="inline-block h-full"
					:locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex  items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template v-if="birthdayDateErrorMessage" #errorMessage>
				{{ birthdayDateErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-player.nationality') }}:</template>
			<template #inputValue>
				<input v-model="player.nationality" name="nationality" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template v-if="nationalityErrorMessage" #errorMessage>
				{{ nationalityErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-player.validity-of-medical-examinations') }}:</template>
			<template #inputValue>
				<DatePicker v-model="player.validityOfMedicalExaminations" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template v-if="validityOfMedicalExaminationsErrorMessage" #errorMessage>
				{{ validityOfMedicalExaminationsErrorMessage }}
			</template>

		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-player.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="player.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
			</template>
		</SingleInput>

		<SingleInput v-if="!props.playerId && props.teamId != 'all'">
			<template #inputName>{{ t('single-player.team') }}:</template>
			<template #inputValue>{{ player.team.teamName }}</template>
		</SingleInput>

		<SingleInput v-else >
			<template #inputName>{{ t('single-player.team') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="player.team">
						<option v-for="team in teams" :value="team">{{ team.teamName }}
						</option>
					</select>
				</div>
			</template>
			<template v-if="teamErrorMessage" #errorMessage>
				{{ teamErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-player.parent') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="player.parent">
						<option v-for="parent in parents" :value="parent">{{ parent.lastName }} {{ parent.firstName }}
						</option>
					</select>
				</div>
			</template>
		</SingleInput>

		<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
			<SingleButton @click="onSubmit()">
				<template v-slot:buttonName>{{ t('button.save') }}</template>
			</SingleButton>
			<SingleButton @click="router.go(-1)">
				<template v-slot:buttonName>{{ t('button.cancel') }}</template>
			</SingleButton>
		</div>
	</div>

	<ErrorMessageInfo v-else-if="error"></ErrorMessageInfo>

</template>

<route lang="yaml">
meta:
  layout: home
</route>