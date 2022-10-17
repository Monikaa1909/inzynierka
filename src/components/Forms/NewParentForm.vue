<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	parentId: {
		type: String,
		required: false
	}
})

const parent = ref({
	id: 'cdsc',
	firstName: 'Jerzy',
	lastName: 'Brzęczek',
	phoneNumber: '123644334',
	email: 'jbrzeczek@gmail.com',
	remarks: 'jakieś tam uwagi'
})

if (!props.parentId) {
	parent.value.firstName = ''
	parent.value.lastName = ''
	parent.value.phoneNumber = ''
	parent.value.email = ''
	parent.value.remarks = ''
}

const onSubmit = (values: any) => {}

const validateName = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (regex2.test(value) || !regex1.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'This field must be a valid name';
	}
	return true;
}

const validatePhoneNumber = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
	if (!regex.test(value)) {
		return 'This field must be a valid number';
	}
	return true;
}

const validateEmail = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if (!regex.test(value)) {
		return 'This field must be a valid postal code';
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
			<template v-slot:inputName>{{ t('single-parent.first-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="parent.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="firstName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-parent.last-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="parent.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="lastName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-parent.phone-number') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="parent.phoneNumber" name="phoneNumber" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validatePhoneNumber" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="phoneNumber" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-parent.email') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="parent.email" name="email" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateEmail" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="email" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-parent.remarks') }}:</template>
			<template v-slot:inputValue>
				<textarea v-model="parent.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
			</template>
		</SingleInput>
		<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
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