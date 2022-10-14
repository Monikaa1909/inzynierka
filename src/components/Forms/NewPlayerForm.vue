<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	playerId: {
		type: String,
		required: false
	}
})

const player = ref({
	id: 'dsfv',
	firstName: 'Jerzy',
	lastName: 'Brzęczek',
	birthdayDate: new Date(1999, 8, 12),
	nationality: 'Poland',
	remarks: '',
	team: 'Młodzik',
	validityOfMedicalExaminations: new Date(2022, 12, 12),
	parent: "cdsca1"
})

if (!props.playerId) {
	player.value.firstName = ''
	player.value.lastName = ''
	player.value.birthdayDate = new Date()
	player.value.nationality = ''
	player.value.validityOfMedicalExaminations = new Date()
	player.value.remarks = ''
	player.value.team = ''
	player.value.parent = ''
}

const teams = ref([
	{
		id: 'cdsc1',
		name: 'Młodzik',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc2',
		name: 'Trampkarz',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc3',
		name: 'Junior młodszy',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc4',
		name: 'team1',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc5',
		name: 'team1',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc6',
		name: 'team1',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
])

const parents = ref([
	{
		id: 'cdsca1',
		firstName: 'Jakub',
		lastName: 'Gruszka',
		phoneNumber: '123455432',
		email: 'mdsdoc@wp.pl'
	},
	{
		id: 'cdsc2',
		firstName: 'Jerzy',
		lastName: 'Gruszka',
		phoneNumber: '123455432',
		email: 'mdsdoc@wp.pl'
	},
	{
		id: 'cdsc3',
		firstName: 'Wiesław',
		lastName: 'Gruszka',
		phoneNumber: '123455432',
		email: 'mdsdoc@wp.pl'
	},
	{
		id: 'cdsc4',
		firstName: 'Bogumił',
		lastName: 'Gruszka',
		phoneNumber: '123455432',
		email: 'mdsdoc@wp.pl'
	},
	{
		id: 'cdsc5',
		firstName: 'Jakub',
		lastName: 'Gruszka',
		phoneNumber: '123455432',
		email: 'mdsdoc@wp.pl'
	},
])

const onSubmit = (values: any) => { }

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

const teamErrorMessage = computed(() => {
	if (player.value.team === '')
		return 'The player must have a selected team'
	else
		return ''
})

// const parentErrorMessage = computed(() => {
// 	if (player.value.parent === '')
// 		return 'The player must have a selected parent'
// 	else
// 		return ''
// })

const cancel = () => {
	return router.go(-1)
}

</script>

<template>
	<Form @submit="onSubmit" class="w-full flex flex-col gap-2 place-content-center">
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.first-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="player.firstName" name="firstName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="firstName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.last-name') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="player.lastName" name="lastName" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateName" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="lastName" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.birthday-date') }}:</template>
			<template v-slot:inputValue>
				<DatePicker v-model="player.birthdayDate" format="yyyy-MM-dd" :clearable="false" class="inline-block h-full"
					:locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none focus:border-blue-500"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.nationality') }}:</template>
			<template v-slot:inputValue>
				<Field v-model="player.nationality" name="nationality" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateNationality" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="nationality" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.validity-of-medical-examinations') }}:</template>
			<template v-slot:inputValue>
				<DatePicker v-model="player.validityOfMedicalExaminations" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none focus:border-blue-500"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.remarks') }}:</template>
			<template v-slot:inputValue>
				<textarea v-model="player.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
			</template>
		</SingleInput>

		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.team') }}:</template>
			<template v-slot:inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="player.team">
						<option v-for="team in teams" :value="team.name">{{team.name}}
						</option>
					</select>
					<p class="text-xs">{{ teamErrorMessage }}</p>
				</div>
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-player.parent') }}:</template>
			<template v-slot:inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="player.parent">
						<option v-for="parent in parents" :value="parent.id">{{parent.firstName}} {{parent.lastName}}
						</option>
					</select>
					<!-- <p class="text-xs">{{ parentErrorMessage }}</p> -->
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