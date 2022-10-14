<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const teams = ref([
	{
		name: 'team1',
		years: 'years1',
		numberOfPlayers: 'players1',
		averageAge: 'average age1',
		players: [
			{
				name: 'Leo',
				surname: 'Messi',
			},
		],
	},
	{
		name: 'team2',
		years: 'years2',
		numberOfPlayers: 'players2',
		averageAge: 'average age2',
	},
	{
		name: 'team3',
		years: 'years3',
		numberOfPlayers: 'players3',
		averageAge: 'average age3',
	},
	{
		name: 'team4',
		years: 'years4',
		numberOfPlayers: 'players4',
		averageAge: 'average age4',
	},
	{
		name: 'team5',
		years: 'years5',
		numberOfPlayers: 'players5',
		averageAge: 'average age5',
	},
	{
		name: 'team6',
		years: 'years6',
		numberOfPlayers: 'players6',
		averageAge: 'average age6',
	},
])

const objects = ref([
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

const event = ref({
	type: "Training",
	date: new Date(),
	startDate: new Date(),
	endDate: new Date(),
	team: teams.value[0].name,
	object: objects.value[0].name,
	newObject: '',
	ifNewObject: computed(() => {
		if (event.value.object !== 'newobject') {
			event.value.newObject = ' '
			return false
		}
		else
			return true
	}),
	opponent: '',
})

</script>
    
<template>
	<BackgroundFrame>
		<template v-slot:data>
			<MyCenterElement>
				<template v-slot>
					<MiniWhiteFrame>
						<template v-slot:icon>
							<img src="../../../assets/calendar-icon2.png" class=" h-150px" />
						</template>

						<template v-slot:attributes>
							<NewEventForm></NewEventForm>
							
							<!-- 
								<SingleInput v-if="event.type !== 'Tournament'">
								<template v-slot:inputName>{{ t('single-event.date')}}:</template>
								<template v-slot:inputValue>
									<DatePicker v-model="event.date" mode="dateTime" :clearable="false"
										class="inline-block h-full min-w-full" :locale="locale">
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
								<template v-slot:inputName>{{ t('single-event.start-date')}}:</template>
								<template v-slot:inputValue>
									<DatePicker v-model="event.startDate" mode="dateTime" :clearable="false"
										class="inline-block h-full min-w-full" :locale="locale">
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
									<DatePicker v-model="event.startDate" mode="dateTime" :clearable="false"
										class="inline-block h-full min-w-full" :locale="locale">
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
									<select v-model="event.team" class="flex flex-auto w-full border-1 p-1 border-#143547 shadow-lg">
										<option v-for="team in teams" :value="team.name">{{team.name}}</option>
									</select>
								</template>
							</SingleInput>

							<SingleInput>
								<template v-slot:inputName>{{ t('single-event.object')}}:</template>
								<template v-slot:inputValue>
									<select v-model="event.object"
										class="flex flex-auto w-full border-1 p-1 w-full border-#143547 shadow-lg">
										<option v-for="object in objects" :value="object.name">{{object.name}}</option>
										<option :value="'newobject'">{{ t('single-event.add-new')}}</option>
									</select>
								</template>
							</SingleInput>
							<SingleInput v-if="event.object === 'newobject'">
								<template v-slot:inputName>{{ t('single-event.new-object')}}:</template>
								<template v-slot:inputValue>
									<input v-model="event.newObject"
										class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
								</template>
							</SingleInput>

							<SingleInput v-if="event.type === 'Match'">
								<template v-slot:inputName>{{ t('single-event.opponent')}}:</template>
								<template v-slot:inputValue>
									<input v-model="event.opponent" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
								</template>
							</SingleInput> -->
						</template>

					</MiniWhiteFrame>
				</template>
			</MyCenterElement>
		</template>
	</BackgroundFrame>>
</template>
    
<route lang="yaml">
meta:
  layout: home
</route>