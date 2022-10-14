<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	trainerId: {
		type: String,
		required: false
	}
})

const trainer = {
	firstName: 'Jerzy',
	lastName: 'Brzęczek',
	birthdayDate: new Date(1999, 8, 12),
	nationality: 'Poland',
	academy: 'Biebrza Goniądz',
	phoneNumber: '123644334',
	email: 'jbrzeczek@gmail.com',
}

if (!props.trainerId) {
	trainer.firstName = ''
	trainer.lastName = ''
	trainer.birthdayDate = new Date()
	trainer.nationality = ''
	trainer.academy = ''
	trainer.phoneNumber = ''
	trainer.email = ''
}

const onSubmit = (values: any) => {
	console.log(values, null, 2);
}

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

const validateNationality = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ-\s]+$/i;
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
	return router.push('/trainers')
}

</script>

<template>
	<Form @submit="onSubmit" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput>
			<template v-slot:inputName>{{ t('single-trainer.first-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="trainer.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="firstName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-trainer.last-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="trainer.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="lastName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-trainer.birthday-date') }}:</template>
			<template v-slot:inputValue>
				<DatePicker v-model="trainer.birthdayDate" format="yyyy-MM-dd" :clearable="false" class="inline-block h-full"
					:locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="p-2 bg-#143547 border border-#143547 hover:bg-#143547-200 text-white"
								@click="togglePopover()">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current">
									<path
										d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
								</svg>
							</button>
							<input :value="inputValue"
								class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border focus:outline-none focus:border-blue-500"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-trainer.nationality') }}::</template>
			<template v-slot:inputValue>
				<Field v-model="trainer.nationality" name="nationality" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateNationality" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="nationality" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-trainer.phone-number') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="trainer.phoneNumber" name="phoneNumber" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validatePhoneNumber" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="phoneNumber" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-trainer.email') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="trainer.email" name="email" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateEmail" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="email" />
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