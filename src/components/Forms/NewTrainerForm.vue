<script setup lang="ts">
import { validateFirstName, validateEmail, validatePhoneNumber, validateNationality, requiredField, validateLogin } from '~/validatesFunctions'
import { Trainer } from 'backend/database/schemas/Trainer.user'
import { Academy } from 'backend/database/schemas/Academy'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { DatePicker } from 'v-calendar'

const props = defineProps<{ trainerId?: string }>()

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const url = computed(() => props.trainerId
	? `/api/trainer/${props.trainerId}`
	: 'api/auth/register/trainer'
)

const trainer = ref({} as Omit<Trainer, '_id'>)

if (!props.trainerId) {
	trainer.value = {
		firstName: '',
		lastName: '',
		birthdayDate: new Date(),
		nationality: '',
		remarks: '',
		academy: undefined!,
		phoneNumber: '',
		email: '',
		login: '',
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
} = useFetch(`/api/academy/${payload.value.academy}`, { initialData: {} }).json<Academy>()

const isFinished = computed(() => {
	return isTrainerFinished.value && isAcademyFinished.value
})

const isFetching = computed(() => {
	return isTrainerFetching.value && isAcademyFetching.value
})

const error = computed(() => {
	return trainerError.value && academyError.value
})

const newTrainer = computed(() => ({
	login: trainer.value.login,
	email: trainer.value.email,
	academy: academyData.value,
	lastName: trainer.value.lastName,
	firstName: trainer.value.firstName,
	nationality: trainer.value.nationality,
	birthdayDate: trainer.value.birthdayDate,
	phoneNumber: trainer.value.phoneNumber,
	remarks: trainer.value.remarks
}))

const successfullyAdded = ref(false)

const { execute: updateTrainer, error: updateError } = useFetch(url, { immediate: false }).post(trainer)
const { execute: saveTrainer, error: saveError } = useFetch(`/api/auth/register/trainer`, { immediate: false }).post(newTrainer)

const onSubmit = async (values: any) => {
	if (firstNameErrorMessage.value || lastNameErrorMessage.value || phoneNumberErrorMessage.value || emailErrorMessage.value
		|| nationalityErrorMessage.value || birthdayDateErrorMessage.value || loginErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.trainerId) {
			if (academyData.value) {
				trainer.value.academy = academyData.value._id as unknown as Academy
				await saveTrainer()
				successfullyAdded.value = true
				if (saveError.value) {
					alert(t('error-messages.register-trainer') + ' crewAssistantHelp@gmail.com')
					return
				}
			} else {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}

		} else {
			await updateTrainer()
			if (updateError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
			return router.push('/trainers/all')
		}
		// return router.push('/trainers/all')
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

const loginErrorMessage = computed(() => {
	if (!validateLogin(trainer.value.login)) {
		return false
	}
	return t(validateLogin(trainer.value.login))
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

const confirmRegisterInfo = async () => {
	return router.push('/trainers/all')
}

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>
	<MessageInfo @confirmRegisterInfo="confirmRegisterInfo" v-if="successfullyAdded">
		<div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
			<p class="text-center">{{ t('info.trainer-registered') }}</p>
			<p class="font-medium text-center">{{ t('info.on-email') }}:</p>
			<p class="font-medium text-center">{{ newTrainer.email }}</p>
		</div>
	</MessageInfo>
	<div v-else-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">

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
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
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
			<template #inputName>{{ t('single-trainer.nationality') }}:</template>
			<template #inputValue>
				<input v-model="trainer.nationality" name="nationality" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
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
				<input v-if="!props.trainerId" v-model="trainer.email" name="email" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
				<p v-else>{{ trainer.email }}</p>
			</template>
			<template #errorMessage v-if="emailErrorMessage">
				{{ emailErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-trainer.login') }}:</template>
			<template #inputValue>
				<input v-if="!props.trainerId" v-model="trainer.login" name="email" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
				<p v-else>{{ trainer.login }}</p>
			</template>
			<template #errorMessage v-if="loginErrorMessage">
				{{ loginErrorMessage }}
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
				<template #buttonName>{{ t('button.register-trainer') }}</template>
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