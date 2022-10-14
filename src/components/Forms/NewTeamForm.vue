<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	teamId: {
		type: String,
		required: false
	}
})

const trainers = ref([
	{
		firstName: 'Jerzy',
		lastName: 'Brzęczek',
		birthdayDate: new Date(1999, 8, 12),
		nationality: 'Poland',
		academy: 'Biebrza Goniądz',
		phoneNumber: '123644334',
		email: 'jbrzeczek@gmail.com',
	},
	{
		firstName: 'Czesław',
		lastName: 'Michniewicz',
		birthdayDate: new Date(1978, 8, 12),
		nationality: 'Poland',
		academy: 'Biebrza Goniądz',
		phoneNumber: '123644334',
		email: 'jbrzeczek@gmail.com',
	},
	{
		firstName: 'Jan',
		lastName: 'Kowalski',
		birthdayDate: new Date(1978, 8, 12),
		nationality: 'Poland',
		academy: 'Biebrza Goniądz',
		phoneNumber: '123644334',
		email: 'jbrzeczek@gmail.com',
	},
])

const team = ref({
	name: 'Junior młodszy',
	startYear: '2009',
	endYear: '2010',
	trainer: 'Jerzy'
})

if (!props.teamId) {
	team.value.name = ''
	team.value.startYear = ''
	team.value.endYear = ''
	team.value.trainer = ''
}

const onSubmit = (values: any) => {

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

const validateStartYear = (value: any) => {
	if (!value) {
		return 'The field with the lower year is required';
	}
	const regex = /^[1-2]{1}[0-9]{3}/i;
	if (!regex.test(value)) {
		return 'The field with the lower year must be a valid number';
	}
	if (team.value.endYear && regex.test(team.value.endYear)) {
		if (value > team.value.endYear)
			return 'The lower year must be smaller than higher year'
	}
	return true;
}

const validateEndYear = (value: any) => {
	if (!value) {
		return 'The field with the higher year is required';
	}
	const regex = /^[1-2]{1}[0-9]{3}/i;
	if (!regex.test(value)) {
		return 'The field with the higher year must be a valid number';
	}
	if (team.value.startYear && regex.test(team.value.startYear)) {
		if (value < team.value.startYear)
			return 'The higher year must be bigger than lower year'
	}
	return true;
}

const trainerErrorMessage = computed(() => {
	if (team.value.trainer === '')
		return 'The team must have a selected trainer'
	else
		return ''
})

const cancel = () => {
	return router.go(-1)
}

</script>

<template>
	<Form @submit="onSubmit" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput>
			<template v-slot:inputName>{{ t('single-team.name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="team.name" name="name" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="name" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-team.years') }}:</template>
			<template v-slot:inputValue>
				<div class="flex w-full flex-row items-center gap-2">
					<Field v-model="team.startYear" name="startYear" type="input"
						class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateStartYear" />
					<p>-</p>
					<Field v-model="team.endYear" name="endYear" type="input"
						class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateEndYear" />
				</div>
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="startYear" />
				<ErrorMessage class="text-xs" name="endYear" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-team.trainer') }}:</template>
			<template v-slot:inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="team.trainer">
						<option v-for="trainer in trainers" :value="trainer.firstName">{{trainer.firstName}} {{trainer.lastName}}
						</option>
					</select>
					<p class="text-xs">{{ trainerErrorMessage }}</p>
				</div>
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