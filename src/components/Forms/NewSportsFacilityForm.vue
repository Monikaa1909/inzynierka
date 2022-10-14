<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
const { t } = useI18n()
const router = useRouter()

const props = defineProps({
	sportsFacilityId: {
		type: String,
		required: false
	}
})

const sportsFacility = ref({
	name: 'Stadion Miejski w Białymstoku',
	street: 'Słoneczna',
	houseNumber: '1',
	postalCode: '15-323',
	city: 'Białystok',
})

if (!props.sportsFacilityId) {
	sportsFacility.value.name = ''
	sportsFacility.value.street = ''
	sportsFacility.value.houseNumber = ''
	sportsFacility.value.postalCode = ''
	sportsFacility.value.city = ''
}

const onSubmit = (values: any) => { }

const validateName = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9-\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (regex2.test(value) || !regex1.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'This field must be a valid name';
	}
	return true;
}

const validateNumber = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[0-9]+$/i;
	if (!regex.test(value)) {
		return 'This field must be a valid number';
	}
	return true;
}

const validatePostalCode = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[0-9]{2}-[0-9]{3}$/;
	if (!regex.test(value)) {
		return 'This field must be a valid postal code';
	}
	return true;
}

const validateCity = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ-\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (!regex.test(value) || regex2.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'This field must be a valid city name (numbers and special characters are not allowed)';
	}
	return true;
}

const cancel = () => {
	return router.go(-1)
}

</script>

<template>
	<Form @submit="onSubmit" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput>
			<template v-slot:inputName>{{ t('single-object.name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="sportsFacility.name" name="objectName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="objectName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-object.street') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="sportsFacility.street" name="street" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="street" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-object.number') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="sportsFacility.houseNumber" name="number" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateNumber" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="number" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-object.postal-code') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="sportsFacility.postalCode" name="postalCode" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validatePostalCode" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="postalCode" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-object.city') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="sportsFacility.city" name="city" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateCity" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="city" />
			</template>
		</SingleInput>
		<div
			class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
			<SingleButton>
				<template v-slot:buttonName>{{ t('button.save') }}</template>
			</SingleButton>
			<SingleButton @click="cancel()">
				<template v-slot:buttonName>{{ t('button.cancel') }}</template>
			</SingleButton>
		</div>
	</Form>
</template>

<route lang="yaml">
meta:
  layout: home
</route>