<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

// const accountType = ref('Academy')
// const accountType = ref('Parent')
const accountType = ref('Trainer')

const trainer = ref({
  id: 'cdsc',
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthdayDate: new Date(1999, 8, 12),
  nationality: 'Poland',
  academy: 'Biebrza Goniądz',
  phoneNumber: '123644334',
  email: 'jbrzeczek@gmail.com',
})
const parent = ref({
  id: 'cdsc',
  firstName: 'Jakub',
  lastName: 'Gruszka',
  phoneNumber: '123455432',
  email: 'mdsdoc@wp.pl'
})
const academy = ref({
  id: 'cdsc',
  name: 'Biebrza Goniądz'
})

const profile = ref({
	id: '',
  name: '',
  firstName: '',
  lastName: '',
  birthdayDate: new Date(),
  nationality: '',
  academy: '',
  phoneNumber: '',
  email: '',
})

if (accountType.value === 'Trainer') {
  profile.value.id = trainer.value.id
  profile.value.firstName = trainer.value.firstName
  profile.value.lastName = trainer.value.lastName
  profile.value.birthdayDate = trainer.value.birthdayDate
  profile.value.nationality = trainer.value.nationality
  profile.value.academy = trainer.value.academy
  profile.value.phoneNumber = trainer.value.phoneNumber
  profile.value.email = trainer.value.email
} else if (accountType.value === 'Parent') {
  profile.value.id = parent.value.id
  profile.value.firstName = parent.value.firstName
  profile.value.lastName = parent.value.lastName
  profile.value.phoneNumber = parent.value.phoneNumber
  profile.value.email = parent.value.email
} else if (accountType.value === 'Academy') {
  profile.value.id = academy.value.id
  profile.value.name = academy.value.name
}

const onSubmit = (values: any) => { }

const validateAcademyName = (value: any) => {
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

</script>

<template>
	<Form @submit="onSubmit" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput v-if="accountType === 'Academy'">
			<template v-slot:inputName>{{ t('your-profile.name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="profile.name" name="academyName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateAcademyName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="academyName" />
			</template>
		</SingleInput>

    <SingleInput v-if="accountType != 'Academy'">
			<template v-slot:inputName>{{ t('your-profile.first-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="profile.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="firstName" />
			</template>
		</SingleInput>
    <SingleInput v-if="accountType != 'Academy'">
			<template v-slot:inputName>{{ t('your-profile.last-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="profile.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="lastName" />
			</template>
		</SingleInput>
		<SingleInput v-if="accountType === 'Trainer'">
			<template v-slot:inputName>{{ t('single-trainer.birthday-date') }}:</template>
			<template v-slot:inputValue>
				<DatePicker v-model="profile.birthdayDate" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white text-gray-700 w-full h-32px py-1 px-2 appearance-none border border-#143547 focus:outline-none focus:border-blue-500"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
		</SingleInput>
		<SingleInput v-if="accountType === 'Trainer'">
			<template v-slot:inputName>{{ t('your-profile.nationality') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="profile.nationality" name="nationality" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateNationality" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="nationality" />
			</template>
		</SingleInput>
		<SingleInput v-if="accountType != 'Academy'">
			<template v-slot:inputName>{{ t('your-profile.phone-number') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="profile.phoneNumber" name="phoneNumber" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validatePhoneNumber" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="phoneNumber" />
			</template>
		</SingleInput>
		<SingleInput v-if="accountType != 'Academy'">
			<template v-slot:inputName>{{ t('your-profile.email') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="profile.email" name="email" type="input"
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
			<SingleButton @click="router.go(-1)">
				<template v-slot:buttonName>{{ t('button.cancel') }}</template>
			</SingleButton>
		</div>
	</Form>
</template>

<route lang="yaml">
meta:
  layout: home
</route>