<script setup lang="ts">
import { requiredField, validateName, validateStartDate, validateEndDate } from '~/validatesFunctions'
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Academy } from 'backend/database/schemas/Academy'

import { DatePicker } from 'v-calendar'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ id: string }>()

const event = ref({} as Omit<Tournament, '_id'>)
const sportsFacilities = ref([] as Omit<SportsFacility[], '_id'>)

const {
	data: sportsFacilitiesData,
	isFetching: isSportsFacilitiesFetching,
	isFinished: isSportsFacilitiesFinished,
	error: sportsFacilitiesError,
} = useFetch(`/api/sportsFacilities/${academy}`, { initialData: [] }).json<SportsFacility[]>()

whenever(sportsFacilitiesData, (data) => {
	sportsFacilities.value = data
	sportsFacilities.value.map(element => element.academy = element.academy._id as unknown as Academy)
})

const {
	data: tournamentData,
	isFetching: isTournamentFetching,
	error: tournamentError,
} = useFetch(`/api/tournament/${props.id}`, { initialData: {} }).json<Tournament>()

const team = ref('')

whenever(tournamentData, (data) => {
	event.value = data
	team.value = data.team.teamName
})

const isFinished = computed(() => {
	return isSportsFacilitiesFinished.value 
})

const isFetching = computed(() => {
	return isSportsFacilitiesFetching.value && isTournamentFetching.value
})

const error = computed(() => {
	return sportsFacilitiesError.value && tournamentError.value 
})

const teamErrorMessage = computed(() => {
	if (!requiredField(event.value.team)) {
		return false
	}
	return t(requiredField(event.value.team))
})

const nameErrorMessage = computed(() => {
	if (requiredField(event.value.tournamentName))
		return false
	else if (!validateName(event.value.tournamentName)) {
		return false
	}
	return t(validateName(event.value.tournamentName))
})

const startDateErrorMessage = computed(() => {
	if (!validateStartDate(event.value.startDate, event.value.endDate)) {
		return false
	}
	return validateStartDate(event.value.startDate, event.value.endDate)
})

const endDateErrorMessage = computed(() => {
	if (!validateEndDate(event.value.endDate, event.value.startDate)) {
		return false
	}
	return validateEndDate(event.value.endDate, event.value.startDate)
})

const { execute: updateTournament, error: updateError } = useFetch(`/api/tournament/${props.id}`, { immediate: false }).post(event)

const onSubmit = async () => {
	if (nameErrorMessage.value || teamErrorMessage.value || startDateErrorMessage.value || endDateErrorMessage.value)
		alert(t('error-messages.validation-error'))
    else {
      event.value.sportsFacility = event.value.sportsFacility?._id as unknown as SportsFacility
      await updateTournament()
			if (updateError.value) {
				alert(t('error-messages.unknow-error'))
				return
			}
		return router.push('/calendar')
	}
}

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">
 
		<SingleInput>
			<template #inputName>{{ t('single-event.type') }}:</template>
			<template #inputValue>
				{{ t('events.lower-case.tournament') }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.name') }}:</template>
			<template #inputValue>
				<input v-model="event.tournamentName" name="opponent" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="nameErrorMessage"> {{ nameErrorMessage }}</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.start-date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="event.startDate" mode="dateTime" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none "
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template #errorMessage v-if="startDateErrorMessage">{{ startDateErrorMessage }}</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.end-date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="event.endDate" mode="dateTime" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none focus:border-blue-500"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template #errorMessage v-if="endDateErrorMessage"> {{ endDateErrorMessage }}</template>
		</SingleInput>

    
		<SingleInput>
			<template #inputName>{{ t('single-event.team') }}:</template>
			<template #inputValue>
				<p>{{ team }}</p>
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName >{{ t('single-event.friendly-match') }}:</template>
			<template #inputValue>
				<button @click="event.friendly = !event.friendly">
					<img v-if="event.friendly" src="../../assets/checkbox-checked-icon.png" class="h-18px" />
					<img v-else src="../../assets/checkbox-unchecked-icon.png" class="h-18px" />
				</button>
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="event.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.object') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.sportsFacility"
						class="flex flex-auto w-full border-1 p-1 w-full border-#143547 shadow-lg">
						<option v-for="sportsFacility in sportsFacilities" :value="sportsFacility">
							{{ sportsFacility.name }}, {{ sportsFacility.street }} {{ sportsFacility.houseNumber }}
						</option>
						<option :value="'newobject'">{{ t('single-event.add-new') }}</option>
					</select>
				</div>
			</template>
		</SingleInput>

		<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
			<SingleButton @click="onSubmit()">
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
