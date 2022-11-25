<script setup lang="ts">
import { validateFirstName, validateEmail, validatePhoneNumber, validateLogin } from '~/validatesFunctions'
import { Parent } from 'backend/database/schemas/Parent.user'
import { Academy } from 'backend/database/schemas/Academy'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const props = defineProps<{ parentId?: string }>()

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const url = computed(() => props.parentId
	? `/api/parent/${props.parentId}`
	: '/api/auth/register/parent'
)

const parent = ref({} as Omit<Parent, '_id'>)

if (!props.parentId) {
	parent.value = {
		firstName: '',
		lastName: '',
		remarks: '',
		academy: undefined!,
		phoneNumber: '',
		email: '',
		login: '',
	}
}

const {
	data: parentData,
	isFetching: isParentFetching,
	isFinished: isParentFinished,
	error: parentError,
} = useFetch(url, {
	initialData: {}, async beforeFetch({ url, options, cancel }) {
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
	}
}).json<Parent>()

whenever(parentData, (data) => {
	parent.value = data
})

const {
	data: academyData,
	isFetching: isAcademyFetching,
	isFinished: isAcademyFinished,
	error: academyError,
} = useFetch(`/api/academy/${payload.value?.academy}`, {
	initialData: {}, async beforeFetch({ url, options, cancel }) {
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
	}
}).json<Academy>()

const isFinished = computed(() => {
	return isParentFinished.value && isAcademyFinished.value
})

const isFetching = computed(() => {
	return isParentFetching.value && isAcademyFetching.value
})

const error = computed(() => {
	return parentError.value && academyError.value
})

const newParent = computed(() => ({
	login: parent.value.login,
	email: parent.value.email,
	academy: academyData.value,
	lastName: parent.value.lastName,
	firstName: parent.value.firstName,
	phoneNumber: parent.value.phoneNumber,
	remarks: parent.value.remarks
}))

const successfullyAdded = ref(false)

const { execute: saveParent, error: saveError, data: password } = useFetch(url, {
	immediate: false, async beforeFetch({ url, options, cancel }) {
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
	}
}).post(newParent)

const { execute: updateParent, error: updateError } = useFetch(url, {
	immediate: false, async beforeFetch({ url, options, cancel }) {
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
	}
}).post(parent)

const onSubmit = async (values: any) => {
	if (firstNameErrorMessage.value || lastNameErrorMessage.value || phoneNumberErrorMessage.value || emailErrorMessage.value || loginErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.parentId) {
			if (academyData.value) {
				parent.value.academy = academyData.value._id as unknown as Academy
				await saveParent()
				if (saveError.value) {
					alert(t('error-messages.register-parent') + ' crewAssistantHelp@gmail.com')
					return
				}
				else successfullyAdded.value = true
			} else {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}

		} else {
			await updateParent()
			if (updateError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
			return router.push('/parents/all')
		}
	}
}

const firstNameErrorMessage = computed(() => {
	if (!validateFirstName(parent.value.firstName)) {
		return false
	}
	return t(validateFirstName(parent.value.firstName))
})

const loginErrorMessage = computed(() => {
	if (!validateLogin(parent.value.login)) {
		return false
	}
	return t(validateLogin(parent.value.login))
})

const lastNameErrorMessage = computed(() => {
	if (!validateFirstName(parent.value.lastName)) {
		return false
	}
	return t(validateFirstName(parent.value.lastName))
})

const phoneNumberErrorMessage = computed(() => {
	if (!validatePhoneNumber(parent.value.phoneNumber)) {
		return false
	}
	return t(validatePhoneNumber(parent.value.phoneNumber))
})

const emailErrorMessage = computed(() => {
	if (!validateEmail(parent.value.email)) {
		return false
	}
	return t(validateEmail(parent.value.email))
})

const confirmRegisterInfo = async () => {
	return router.push('/parents/all')
}

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<MessageInfo @confirmRegisterInfo="confirmRegisterInfo" v-if="successfullyAdded">
		<template #info>
			<div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">

				<!-- wersja z wysłaniem hasła na maila: -->
				<!-- <p class="text-center">{{ t('info.parent-registered') }}</p>
			<p class="font-medium text-center">{{ t('info.on-email') }}:</p>
			<p class="font-medium text-center">{{ newParent.email }}</p> -->

				<!-- wersja z wyświetleniem danych do logowania: -->
				<p class="text-center">{{ t('info.parent-registered') }}</p>
				<p class="text-center">{{ t('info.login-details') }}:</p>
				<div class="w-full flex flex-row gap-4 place-content-center">
					<p>{{ t('login.login') }}:</p>
					<p class="font-medium">{{ parent.login }}</p>
				</div>
				<div class="w-full flex flex-row gap-2 place-content-center">
					<p>{{ t('login.password') }}:</p>
					<p class="font-medium">{{ password }}</p>
				</div>
				<p class="font-bold text-center">{{ t('info.remember-credentials') }}</p>

			</div>
		</template>

	</MessageInfo>

	<div v-else-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput>
			<template #inputName>{{ t('single-parent.first-name') }}:</template>
			<template #inputValue>
				<input v-model="parent.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template v-if="firstNameErrorMessage" #errorMessage>
				{{ firstNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-parent.last-name') }}:</template>
			<template #inputValue>
				<input v-model="parent.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="lastNameErrorMessage">
				{{ lastNameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-parent.phone-number') }}:</template>
			<template #inputValue>
				<input v-model="parent.phoneNumber" name="phoneNumber" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="phoneNumberErrorMessage">
				{{ phoneNumberErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-parent.email') }}:</template>
			<template #inputValue>
				<input v-model="parent.email" name="email" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="emailErrorMessage">
				{{ emailErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-parent.login') }}:</template>
			<template #inputValue>
				<input v-model="parent.login" name="login" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="loginErrorMessage">
				{{ loginErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-parent.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="parent.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
			</template>
		</SingleInput>

		<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
			<SingleButton @click="onSubmit">
				<template #buttonName v-if="!props.parentId">{{ t('button.register-parent') }}</template>
				<template #buttonName v-else>{{ t('button.save') }}</template>
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