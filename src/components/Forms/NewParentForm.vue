<script setup lang="ts">
import { validateFirstName, validateEmail, validatePhoneNumber } from '~/validatesFunctions'

import type { Academy } from 'backend/database/schemas/Academy'
import type { Parent } from 'backend/database/schemas/Parent'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ parentId?: string }>()

const url = computed(() => props.parentId
	? `/api/parent/${props.parentId}`
	: '/api/parent'
)

const parent = ref({} as Omit<Parent, '_id'>)

if (!props.parentId) {
	parent.value = {
		firstName: '',
		lastName: '',
		remarks: '',
		academy: undefined!,
		phoneNumber: '',
		email: ''
	}
}

const {
	data: parentData,
	isFetching: isParentFetching,
	isFinished: isParentFinished,
	error: parentError,
} = useFetch(url, { initialData: {} }).json<Parent>()

whenever(parentData, (data) => {
	parent.value = data
})

const {
	data: academyData,
	isFetching: isAcademyFetching,
	isFinished: isAcademyFinished,
	error: academyError,
} = useFetch(`/api/academy/${academy}`, { initialData: {} }).json<Academy>()

const isFinished = computed(() => {
	console.log(academyData.value)
	return isParentFinished.value && isAcademyFinished.value
})

const isFetching = computed(() => {
	return isParentFetching.value && isAcademyFetching.value
})

const error = computed(() => {
	return parentError.value && academyError.value
})

const { execute: saveParent, error: saveError } = useFetch(url, { immediate: false }).post(parent)
const { execute: updateParent, error: updateError } = useFetch(url, { immediate: false }).post(parent)

const onSubmit = async (values: any) => {
	if (firstNameErrorMessage.value || lastNameErrorMessage.value || phoneNumberErrorMessage.value || emailErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.parentId) {
			if (academyData.value) {
				parent.value.academy = academyData.value
				await saveParent()
				if (saveError.value) {
					alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
				}
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
		}
		return router.push('/parents/all')
	}
}

const firstNameErrorMessage = computed(() => {
	if (!validateFirstName(parent.value.firstName)) {
		return false
	}
	return t(validateFirstName(parent.value.firstName))
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

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">
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
			<template #inputName>{{ t('single-parent.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="parent.remarks" type="textarea" placeholder=""
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