<script setup lang="ts">
import { validateFirstName, validateEmail, validatePhoneNumber, validateNationality, requiredField } from '~/validatesFunctions'

import type { Academy } from 'backend/database/schemas/Academy'
import type{ Trainer } from 'backend/database/schemas/Trainer'
import { DatePicker } from 'v-calendar'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ trainerId?: string }>()

const url = computed(() => props.trainerId
	? `/api/trainer/${props.trainerId}`
	: '/api/trainer'
)

const trainer = ref({} as Omit<Trainer, '_id'>)

if (!props.trainerId) {
	trainer.value = {
		firstName: '',
		lastName: '',
		birthdayDate: '',
		nationality: '',
		remarks: '',
		academy: undefined!,
		phoneNumber: '',
		email: ''
	}
}

const {
	data: trainerData,
	isFetching: isTrainerFetching,
	isFinished: isTrainerFinished,
	error: trainerError,
} = useFetch(url, { initialData: {} }).json<Trainer>()

whenever(trainerData, (data) => {
	trainer.value = data
})

const {
	data: academyData,
	isFetching: isAcademyFetching,
	isFinished: isAcademyFinished,
	error: academyError,
} = useFetch(`/api/academy/${academy}`, { initialData: {} }).json<Academy>()

const isFinished = computed(() => {
	console.log(academyData.value)
	return isTrainerFinished.value && isAcademyFinished.value
})

const isFetching = computed(() => {
	return isTrainerFetching.value && isAcademyFetching.value
})

const error = computed(() => {
	return trainerError.value && academyError.value
})

const { execute: saveTrainer, error: saveError } = useFetch(url, { immediate: false }).post(trainer)
const { execute: updateTrainer, error: updateError } = useFetch(url, { immediate: false }).post(trainer)

const onSubmit = async (values: any) => {
	if (firstNameErrorMessage.value || lastNameErrorMessage.value || phoneNumberErrorMessage.value || emailErrorMessage.value
	|| nationalityErrorMessage.value || birthdayDateErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.trainerId) {
			if (academyData.value) {
				trainer.value.academy = academyData.value
				await saveTrainer()
				if (saveError.value) {
					alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
				}
			} else {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
			}

		} else {
			await updateTrainer()
			if (updateError.value) {
				alert(t('error-messages.unknow-error')  + ' crewAssistantHelp@gmail.com')
				return
			}
		}
		return router.push('/trainers/all')
	}
 }

const firstNameErrorMessage = computed(() => {
	if (!validateFirstName(trainer.value.firstName)) {
		return false
	}
	return t(validateFirstName(trainer.value.firstName))
})

const lastNameErrorMessage = computed(() => {
	if (!validateFirstName(trainer.value.lastName)) {
		return false
	}
	return t(validateFirstName(trainer.value.lastName))
})

const phoneNumberErrorMessage = computed(() => {
	if (!validatePhoneNumber(trainer.value.phoneNumber)) {
		return false
	}
	return t(validatePhoneNumber(trainer.value.phoneNumber))
})

const emailErrorMessage = computed(() => {
	if (!validateEmail(trainer.value.email)) {
		return false
	}
	return t(validateEmail(trainer.value.email))
})

const birthdayDateErrorMessage = computed(() => {
	if (!requiredField(trainer.value.birthdayDate)) {
		return false
	}
	return t(requiredField(trainer.value.birthdayDate))
})

const nationalityErrorMessage = computed(() => {
	if (!validateNationality(trainer.value.nationality)) {
		return false
	}
	return t(validateNationality(trainer.value.nationality))
})
</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">

		<SingleInput>
			<template #inputName>{{ t('single-trainer.first-name') }}:</template>
			<template #inputValue>
				<input v-model="trainer.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="firstNameErrorMessage">
				{{ firstNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-trainer.last-name') }}:</template>
			<template #inputValue>
				<input v-model="trainer.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"/>
			</template>
			<template #errorMessage v-if="lastNameErrorMessage">
				{{ lastNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-trainer.birthday-date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="trainer.birthdayDate" format="yyyy-MM-dd" :clearable="false" class="inline-block h-full"
					:locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none border-#143547"
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
			<template #inputName>{{ t('single-trainer.nationality') }}::</template>
			<template #inputValue>
				<input v-model="trainer.nationality" name="nationality" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"  />
			</template>
			<template #errorMessage v-if="nationalityErrorMessage">
				{{ nationalityErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-trainer.phone-number') }}:</template>
			<template #inputValue>
				<input v-model="trainer.phoneNumber" name="phoneNumber" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="phoneNumberErrorMessage">
				{{ phoneNumberErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-trainer.email') }}:</template>
			<template #inputValue>
				<input v-model="trainer.email" name="email" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="emailErrorMessage">
				{{ emailErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-trainer.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="trainer.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
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