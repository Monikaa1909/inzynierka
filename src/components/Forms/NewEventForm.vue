<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	day: {
		type: String,
		required: false
	}
})

const event = ref({
	id: 'dsfv',
	type: '',
	startDate: new Date(1999, 8, 12),
	endDate: new Date(2022, 12, 12),
	sportsFacility: 'Stadion Miejski w Białymstoku',
	team: 'cdsc1',
	opponent: 'AP Wigry Suwałki',
	ifNewSportsFacility: computed(() => {
		if (event.value.sportsFacility !== 'newobject') {
			return false
		}
		else
			return true
	}),
})

if (!props.day) {
	event.value.type = ''
	event.value.sportsFacility = ''
	event.value.startDate = new Date()
	event.value.endDate = new Date()
	event.value.team = ''
	event.value.opponent = ''
}

const sportsFacility = ref({
	name: '',
	street: '',
	houseNumber: '',
	postalCode: '',
	city: '',
})

const teams = ref([
	{
		id: 'cdsc1',
		name: 'team1',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc2',
		name: 'team1',
		startYear: 'years1',
		endYear: 'players1',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'cdsc3',
		name: 'team1',
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

const sportsFacilities = ref([
	{
		name: 'Stadion Miejski w Białymstoku',
		street: 'Słoneczna 1',
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		name: 'Stadion2',
		street: 'Słoneczna 1',
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		name: 'Stadion3',
		street: 'Słoneczna 1',
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		name: 'Stadion Miejski w Białymstoku',
		street: 'Słoneczna 1',
		postalCode: '15-323',
		city: 'Białystok',
	}
])

const onSubmit = (values: any) => { }

const validateOpponent = (value: any) => {
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

const typeErrorMessage = computed(() => {
	if (event.value.type === '')
		return 'The event must have a selected type'
	else
		return ''
})

const teamErrorMessage = computed(() => {
	if (event.value.team === '')
		return 'The event must have a selected team'
	else
		return ''
})

const sportsFacilityErrorMessage = computed(() => {
	if (event.value.sportsFacility === '' || event.value.sportsFacility === 'newobject')
		return 'The event must have a selected sports facility'
	else
		return ''
})

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
			<template v-slot:inputName>{{ t('single-event.type')}}:</template>
			<template v-slot:inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.type" class="flex flex-auto w-full border-1 p-1 border-#143547 shadow-lg">
						<option v-if="locale === 'en'" :value="'Training'">Training</option>
						<option v-else-if="locale === 'pl'" :value="'Training'">Trening</option>
						<option v-if="locale === 'en'" :value="'Tournament'">Tournament</option>
						<option v-else-if="locale === 'pl'" :value="'Tournament'">Turniej</option>
						<option v-if="locale === 'en'" :value="'Match'">Match</option>
						<option v-else-if="locale === 'pl'" :value="'Match'">Mecz</option>
					</select>
					<p class="text-xs">{{ typeErrorMessage }}</p>
				</div>
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-event.date')}}:</template>
			<template v-slot:inputValue>
				<DatePicker v-model="event.startDate" mode="dateTime" :clearable="false" class="inline-block h-full min-w-full"
					:locale="locale">
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
		<SingleInput v-if="event.type === 'Tournament'">
			<template v-slot:inputName>{{ t('single-event.end-date')}}:</template>
			<template v-slot:inputValue>
				<DatePicker v-model="event.endDate" mode="dateTime" :clearable="false" class="inline-block h-full min-w-full"
					:locale="locale">
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
			<template v-slot:inputName>{{ t('single-event.team')}}:</template>
			<template v-slot:inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.team" class="flex flex-auto w-full border-1 p-1 border-#143547 shadow-lg">
						<option v-for="team in teams" :value="team.id">{{team.name}}</option>
					</select>
					<p class="text-xs">{{ teamErrorMessage }}</p>
				</div>
			</template>
		</SingleInput>
		<SingleInput v-if="event.type === 'Match'">
			<template v-slot:inputName>{{ t('single-event.opponent')}}:</template>
			<template v-slot:inputValue>
				<Field v-model="event.opponent" name="opponent" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" :rules="validateOpponent" />
			</template>
			<template v-slot:errorMessage>
				<ErrorMessage class="text-xs" name="opponent" />
			</template>
		</SingleInput>
		<SingleInput>
			<template v-slot:inputName>{{ t('single-event.object')}}:</template>
			<template v-slot:inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.sportsFacility"
						class="flex flex-auto w-full border-1 p-1 w-full border-#143547 shadow-lg">
						<option v-for="sportsFacility in sportsFacilities" :value="sportsFacility.name">
							{{sportsFacility.name}}
						</option>
						<option :value="'newobject'">{{ t('single-event.add-new')}}</option>
					</select>
					<p class="text-xs">{{ sportsFacilityErrorMessage }}</p>
				</div>
			</template>
		</SingleInput>
		<div v-if="event.sportsFacility === 'newobject'" class=" w-full p-4">
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
				<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
					<button class="bg-#143547 p-1 text-sm text-#FFFFFF flex flex-row justify-center items-center sm:(px-8)">{{
					t('button.save-object') }}</button>
					<button @click="event.sportsFacility=''"
						class="bg-#143547 p-1 text-sm text-#FFFFFF flex flex-row justify-center items-center sm:(px-8)">{{
						t('button.cancel') }}</button>
				</div>
			</Form>
		</div>

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