<script setup lang="ts">
import { requiredField, validateEndDate, validateName, validateStartDate } from '~/validatesFunctions'
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Academy } from 'backend/database/schemas/Academy'
import { Match } from 'backend/database/schemas/Match'
import { Team } from 'backend/database/schemas/Team'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const token = useStorage('user:token', '')

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ day?: string }>()

const url = computed(() => {
	if (event.value.type === "Match") return `/api/match`
	else if (event.value.type === "Training") return `/api/training`
	else return `/api/tournament`
})

const {
	data: teams,
	isFetching: isTeamsFetching,
	isFinished: isTeamsFinished,
	error: teamsError,
} = useFetch(`/api/teams`, {
	initialData: [],
	async beforeFetch({ url, options, cancel }) {
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
	},
}).json<Team[]>()

const sportsFacilities = ref([] as Omit<SportsFacility[], '_id'>)

const {
	data: sportsFacilitiesData,
	isFetching: isSportsFacilitiesFetching,
	isFinished: isSportsFacilitiesFinished,
	error: sportsFacilitiesError,
} = useFetch(`/api/sportsFacilities`, {
	initialData: [],
	async beforeFetch({ url, options, cancel }) {
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
	},
}).json<SportsFacility[]>()

whenever(sportsFacilitiesData, (data) => {
	sportsFacilities.value = data
	sportsFacilities.value.map(item => (item.academy = item.academy._id as unknown as Academy))
})

const event = ref({} as {
	type: string,
	startDate: Date,
	endDate: Date,
	team: Team,
	sportsFacility?: SportsFacility,
	opponent?: string,
	friendly?: boolean,
	remarks?: string,
	goalsScored?: number,
	goalsConceded?: number,
	tournamentName?: string
})

event.value.type = 'Training',
	event.value.startDate = props.day ? new Date(props.day) : new Date(),
	event.value.endDate = props.day ? (new Date(props.day)) : new Date(),
	event.value.opponent = '',
	event.value.friendly = false,
	event.value.remarks = '',
	event.value.goalsScored = 0,
	event.value.goalsConceded = 0,
	event.value.tournamentName = ''

const isFinished = computed(() => {
	return isSportsFacilitiesFinished.value && isTeamsFinished.value
})

const isFetching = computed(() => {
	return isSportsFacilitiesFetching.value && isTeamsFetching.value
})

const error = computed(() => {
	return sportsFacilitiesError.value && teamsError.value
})

const teamErrorMessage = computed(() => {
	if (!requiredField(event.value.team)) {
		return false
	}
	return t(requiredField(event.value.team))
})

const nameErrorMessage = computed(() => {
	if (requiredField(event.value.tournamentName))
		return false
	else if (!validateName(event.value.tournamentName)) {
		return false
	}
	return t(validateName(event.value.tournamentName))
})

const opponentErrorMessage = computed(() => {
	if (requiredField(event.value.opponent))
		return false
	else if (!validateName(event.value.opponent)) {
		return false
	}
	return t(validateName(event.value.opponent))
})

const dateErrorMessage = computed(() => {
	if (!requiredField(event.value.startDate)) {
		return false
	}
	return t(requiredField(event.value.startDate))
})

const startDateErrorMessage = computed(() => {
	if (!validateStartDate(event.value.startDate, event.value.endDate)) {
		return false
	}
	return t(validateStartDate(event.value.startDate, event.value.endDate))
})

const endDateErrorMessage = computed(() => {
	if (!validateEndDate(event.value.endDate, event.value.startDate)) {
		return false
	}
	return t(validateEndDate(event.value.endDate, event.value.startDate))
})

const match = ref({} as Omit<Match, '_id'>)
const training = ref({} as Omit<Training, '_id'>)
const tournament = ref({} as Omit<Tournament, '_id'>)

const { execute: saveMatch, error: saveMatchError } = useFetch(url, {
	immediate: false,
	async beforeFetch({ url, options, cancel }) {
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
	},
}).post(match)

const { execute: saveTraining, error: saveTrainingError } = useFetch(url, {
	immediate: false,
	async beforeFetch({ url, options, cancel }) {
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
	},
}).post(training)

const { execute: saveTournament, error: saveTournamentError } = useFetch(url, {
	immediate: false,
	async beforeFetch({ url, options, cancel }) {
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
	},
}).post(tournament)


const onSubmit = async () => {
	if (event.value.type === 'Match') {
		if (opponentErrorMessage.value || teamErrorMessage.value || dateErrorMessage.value)
			alert(t('error-messages.validation-error'))
		else {
			match.value = {
				goalsScored: event.value.goalsScored,
				goalsConceded: event.value.goalsConceded,
				opponent: event.value.opponent,
				date: new Date(event.value.startDate),
				team: event.value.team ? event.value.team : 'none' as unknown as Team,
				friendly: event.value.friendly,
				sportsFacility: event.value.sportsFacility,
				remarks: event.value.remarks,
			}
			await saveMatch()
			if (saveMatchError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
			if (props.day) return router.push(`/events/day/${event.value.startDate}`)
			else return router.push('/calendar')
		}

	} else if (event.value.type === 'Training') {
		if (teamErrorMessage.value || dateErrorMessage.value)
			alert(t('error-messages.validation-error'))

		else {
			training.value = {
				date: new Date(event.value.startDate),
				team: event.value.team ? event.value.team : 'none' as unknown as Team,
				sportsFacility: event.value.sportsFacility,
				remarks: event.value.remarks,
			}
			await saveTraining()
			if (saveTrainingError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
			if (props.day) return router.push(`/events/day/${event.value.startDate}`)
			else return router.push('/calendar')
		}

	} else if (event.value.type === 'Tournament') {
		if (nameErrorMessage.value || startDateErrorMessage.value || endDateErrorMessage.value || teamErrorMessage.value)
			alert(t('error-messages.validation-error'))
		else {
			tournament.value = {
				tournamentName: event.value.tournamentName,
				startDate: new Date(event.value.startDate),
				endDate: new Date(event.value.endDate),
				friendly: event.value.friendly,
				team: event.value.team ? event.value.team : 'none' as unknown as Team,
				sportsFacility: event.value.sportsFacility,
				remarks: event.value.remarks,
			}
			await saveTournament()
			if (saveTournamentError.value) {
				alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
				return
			}
			if (props.day) return router.push(`/events/day/${event.value.startDate}`)
			else return router.push('/calendar')
		}
	}
}

</script>

<template>
	<LoadingCircle v-if="isFetching"></LoadingCircle>

	<div v-if="isFinished && !error" class="w-full flex flex-col gap-2 place-content-center">

		<SingleInput>
			<template #inputName>{{ t('single-event.type') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.type" class="flex flex-auto w-full border-1 p-1 border-#143547 shadow-lg">
						<option v-if="locale === 'en'" :value="'Training'">Training</option>
						<option v-else-if="locale === 'pl'" :value="'Training'">Trening</option>
						<option v-if="locale === 'en'" :value="'Tournament'">Tournament</option>
						<option v-else-if="locale === 'pl'" :value="'Tournament'">Turniej</option>
						<option v-if="locale === 'en'" :value="'Match'">Match</option>
						<option v-else-if="locale === 'pl'" :value="'Match'">Mecz</option>
					</select>
				</div>
			</template>
		</SingleInput>

		<SingleInput v-if="event.type === 'Tournament'">
			<template #inputName>{{ t('single-event.name') }}:</template>
			<template #inputValue>
				<input v-model="event.tournamentName" name="opponent" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="nameErrorMessage"> {{ nameErrorMessage }}</template>
		</SingleInput>

		<SingleInput v-if="event.type === 'Tournament'">
			<template #inputName>{{ t('single-event.start-date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="event.startDate" mode="dateTime" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none "
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template #errorMessage v-if="startDateErrorMessage">{{ startDateErrorMessage }}</template>
		</SingleInput>

		<SingleInput v-else>
			<template #inputName>{{ t('single-event.date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="event.startDate" mode="dateTime" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none "
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template #errorMessage v-if="dateErrorMessage"> {{ dateErrorMessage }}</template>
		</SingleInput>

		<SingleInput v-if="event.type === 'Tournament'">
			<template #inputName>{{ t('single-event.end-date') }}:</template>
			<template #inputValue>
				<DatePicker v-model="event.endDate" mode="dateTime" format="yyyy-MM-dd" :clearable="false"
					class="inline-block h-full" :locale='locale'>
					<template v-slot="{ inputValue, togglePopover }">
						<div class="flex items-center">
							<button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
								<img src="../../assets/calendar-button.png" class="h-32px " />
							</button>
							<input :value="inputValue"
								class="bg-white border-#143547 text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none focus:border-blue-500"
								readonly />
						</div>
					</template>
				</DatePicker>
			</template>
			<template #errorMessage v-if="endDateErrorMessage"> {{ endDateErrorMessage }}</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.team') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.team" class="flex flex-auto w-full border-1 p-1 border-#143547 shadow-lg">
						<option v-for="team in teams" :value="team._id">{{ team.teamName }}</option>
					</select>
				</div>
			</template>
			<template #errorMessage v-if="teamErrorMessage">
				{{ teamErrorMessage }}
			</template>
		</SingleInput>

		<SingleInput v-if="event.type === 'Match'">
			<template #inputName>{{ t('single-event.opponent') }}:</template>
			<template #inputValue>
				<input v-model="event.opponent" name="opponent" type="input"
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
			</template>
			<template #errorMessage v-if="opponentErrorMessage"> {{ opponentErrorMessage }} </template>
		</SingleInput>

		<SingleInput v-if="event.type !== 'Training'">
			<template #inputName v-if="event.type === 'Match'">{{ t('single-event.friendly-match') }}:</template>
			<template #inputName v-else-if="event.type === 'Tournament'">{{
				t('single-event.friendly-tournament')}}:</template>
			<template #inputValue>
				<button @click="event.friendly = !event.friendly">
					<img v-if="event.friendly" src="../../assets/checkbox-checked-icon.png" class="h-18px" />
					<img v-else src="../../assets/checkbox-unchecked-icon.png" class="h-18px" />
				</button>
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.remarks') }}:</template>
			<template #inputValue>
				<textarea v-model="event.remarks" type="textarea" placeholder=""
					class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
			</template>
		</SingleInput>

		<SingleInput>
			<template #inputName>{{ t('single-event.object') }}:</template>
			<template #inputValue>
				<div class="fles flex-auto w-full flex-col">
					<select v-model="event.sportsFacility"
						class="flex flex-auto w-full border-1 p-1 w-full border-#143547 shadow-lg">
						<option v-for="sportsFacility in sportsFacilities" :value="sportsFacility">
							{{ sportsFacility.name }}, {{ sportsFacility.street }} {{ sportsFacility.houseNumber }}
						</option>
						<option :value="null">{{ t('single-event.no-sports-facility') }}</option>
					</select>
				</div>
			</template>
		</SingleInput>

		<div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
			<SingleButton @click="onSubmit()">
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