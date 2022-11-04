<script setup lang="ts">
import { validateName, validateNumber, validateCity, validatePostalCode } from '~/validatesFunctions'

import type { Academy } from 'backend/database/schemas/Academy'
import type { SportsFacility } from 'backend/database/schemas/SportsFacility'

const { t } = useI18n()
const router = useRouter()

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ sportsFacilityId?: string }>()

const url = computed(() => props.sportsFacilityId
	? `/api/sportsFacility/${props.sportsFacilityId}`
	: '/api/sportsFacility'
)

const sportsFacility = ref({} as Omit<SportsFacility, '_id'>)

if (!props.sportsFacilityId) {
	sportsFacility.value = {
		name: '',
		street: '',
		houseNumber: '',
		postalCode: '',
		remarks: '',
		academy: undefined!,
		city: '',
	}
}

const {
	data: sportsFacilityData,
	isFetching: isSportsFacilityFetching,
	isFinished: isSportsFacilityFinished,
	error: sportsFacilityError,
} = useFetch(url, { initialData: {} }).json<SportsFacility>()

whenever(sportsFacilityData, (data) => {
	sportsFacility.value = data
})

const {
	data: academyData,
	isFetching: isAcademyFetching,
	isFinished: isAcademyFinished,
	error: academyError,
} = useFetch(`/api/academy/${academy}`, { initialData: {} }).json<Academy>()

const isFinished = computed(() => {
	return isSportsFacilityFinished.value && isAcademyFinished.value
})

const isFetching = computed(() => {
	return isSportsFacilityFetching.value && isAcademyFetching.value
})

const error = computed(() => {
	return sportsFacilityError.value && academyError.value
})

const { execute: saveSportsFacility, error: saveError } = useFetch(url, { immediate: false }).post(sportsFacility)
const { execute: updateSportsFacility, error: updateError } = useFetch(url, { immediate: false }).post(sportsFacility)

const onSubmit = async (values: any) => { 
	if (nameErrorMessage.value || streetErrorMessage.value || houseNumberErrorMessage.value || postalCodeErrorMessage.value
	|| cityErrorMessage.value) {
		alert(t('error-messages.validation-error'))
	} else {
		if (!props.sportsFacilityId) {
			if (academyData.value) {
				sportsFacility.value.academy = academyData.value
				await saveSportsFacility()
				if (saveError.value) {
					alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
				}
			} else {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
					return
			}

		} else {
			await updateSportsFacility()
			if (updateError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
		}
		return router.push('/sportsFacilities/all')
	}
}

const nameErrorMessage = computed(() => {
	if (!validateName(sportsFacility.value.name)) {
		return false
	}
	return t(validateName(sportsFacility.value.name))
})

const streetErrorMessage = computed(() => {
	if (!validateName(sportsFacility.value.street)) {
		return false
	}
	return t(validateName(sportsFacility.value.street))
})

const houseNumberErrorMessage = computed(() => {
	if (!validateNumber(sportsFacility.value.houseNumber)) {
		return false
	}
	return t(validateNumber(sportsFacility.value.houseNumber))
})

const postalCodeErrorMessage = computed(() => {
	if (!validatePostalCode(sportsFacility.value.postalCode)) {
		return false
	}
	return t(validatePostalCode(sportsFacility.value.postalCode))
})

const cityErrorMessage = computed(() => {
	if (!validateCity(sportsFacility.value.city)) {
		return false
	}
	return t(validateCity(sportsFacility.value.city))
})

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">

		<SingleInput>
			<template #inputName>{{ t('single-object.name') }}:</template>
			<template #inputValue>
				<input v-model="sportsFacility.name" name="objectName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"/>
			</template>
			<template #errorMessage v-if="nameErrorMessage">
				{{ nameErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-object.street') }}:</template>
			<template #inputValue>
				<input v-model="sportsFacility.street" name="street" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"/>
			</template>
			<template #errorMessage v-if="streetErrorMessage">
				{{ streetErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-object.number') }}:</template>
			<template #inputValue>
				<input v-model="sportsFacility.houseNumber" name="number" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"/>
			</template>
			<template #errorMessage v-if="houseNumberErrorMessage">
				{{ houseNumberErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-object.postal-code') }}:</template>
			<template #inputValue>
				<input v-model="sportsFacility.postalCode" name="postalCode" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"/>
			</template>
			<template #errorMessage v-if="postalCodeErrorMessage">
				{{ postalCodeErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-object.city') }}:</template>
			<template #inputValue>
				<input v-model="sportsFacility.city" name="city" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"/>
			</template>
			<template #errorMessage v-if="cityErrorMessage">
				{{ cityErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-object.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="sportsFacility.remarks" type="textarea" placeholder=""
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