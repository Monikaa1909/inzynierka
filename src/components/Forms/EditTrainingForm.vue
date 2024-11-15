<script setup lang="ts">
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { Training } from 'backend/database/schemas/Training'
import { Academy } from 'backend/database/schemas/Academy'
import { requiredField } from '~/validatesFunctions'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const token = useStorage('user:token', '')

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const event = ref({} as Omit<Training, '_id'>)
const sportsFacilities = ref([] as Omit<SportsFacility[], '_id'>)

const {
	data: sportsFacilitiesData,
	isFetching: isSportsFacilitiesFetching,
	isFinished: isSportsFacilitiesFinished,
	error: sportsFacilitiesError,
} = useFetch(`/api/sportsFacilities`, { initialData: [],
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
 }).json<SportsFacility[]>()

whenever(sportsFacilitiesData, (data) => {
	sportsFacilities.value = data
	sportsFacilities.value.map(element => element.academy = element.academy._id as unknown as Academy)
})

const {
	data: trainingData,
	isFetching: isTrainingFetching,
	error: trainingError,
} = useFetch(`/api/training/${props.id}`, { initialData: {},
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
 }).json<Training>()

const team = ref('')

whenever(trainingData, (data) => {
	event.value = data
	team.value = data.team.teamName
})

const isFinished = computed(() => {
	return isSportsFacilitiesFinished.value 
})

const isFetching = computed(() => {
	return isSportsFacilitiesFetching.value && isTrainingFetching.value
})

const error = computed(() => {
	return sportsFacilitiesError.value && trainingError.value 
})

const teamErrorMessage = computed(() => {
	if (!requiredField(event.value.team)) {
		return false
	}
	return t(requiredField(event.value.team))
})

const dateErrorMessage = computed(() => {
	if (!requiredField(event.value.date)) {
		return false
	}
	return t(requiredField(event.value.date))
})

const { execute: updateTraining, error: updateError } = useFetch(`/api/training/${props.id}`, { immediate: false,
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
 }).post(event)

const onSubmit = async () => {
	if (teamErrorMessage.value || dateErrorMessage.value)
		alert(t('error-messages.validation-error'))
    else {
      if (event.value.sportsFacility) event.value.sportsFacility = event.value.sportsFacility?._id as unknown as SportsFacility
      await updateTraining()
			if (updateError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
		return router.go(-1)
	}
}

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">
 
		<SingleInput>
			<template #inputName>{{ t('single-event.type') }}:</template>
			<template #inputValue>
				{{ t('events.lower-case.training') }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="event.date" mode="dateTime" format="yyyy-MM-dd" :clearable="false"
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
			<template #errorMessage v-if="dateErrorMessage"> {{ dateErrorMessage }}</template>
		</SingleInput>

    
		<SingleInput>
			<template #inputName>{{ t('single-event.team') }}:</template>
			<template #inputValue>
				<p>{{ team }}</p>
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
				{{event.sportsFacility}}
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.sportsFacility"
						class="flex flex-auto w-full border-1 p-1 w-full border-#143547 shadow-lg">
						<option v-for="sportsFacility in sportsFacilities" :value="sportsFacility">
							{{ sportsFacility.name }}, {{ sportsFacility.street }} {{ sportsFacility.houseNumber }}
						</option>
						<option :value="null">{{ t('single-event.no-sports-facility') }}</option>
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
