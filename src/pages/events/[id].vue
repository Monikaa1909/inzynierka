<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
	id: {
		type: String,
		require: true
	}
})

const teams = ref([
	{
		id: 'idteam1',
		name: 'Młodzik D1',
		startYear: '2011',
		endYear: '2012',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'idteam2',
		name: 'Młodzik D2',
		startYear: '2010',
		endYear: '2011',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'idteam3',
		name: 'Trampkarz C1',
		startYear: '2009',
		endYear: '2010',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'idteam4',
		name: 'Trampkarz C2',
		startYear: '2008',
		endYear: '2009',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'idteam5',
		name: 'Junior Młodszy B1',
		startYear: '2006',
		endYear: '2007',
		trainer: 'Jerzy Brzęczek'
	},
	{
		id: 'idteam6',
		name: 'Junior Młodszy B2',
		startYear: '2007',
		endYear: '2008',
		trainer: 'Jerzy Brzęczek'
	},
])

const sportsFacilities = ref([
	{
		id: 'sportsFacilitiesid1',
		name: 'Stadion Miejski w Białymstoku',
		street: 'Słoneczna',
		houseNumber: 1,
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		id: 'sportsFacilitiesid2',
		name: 'Orlik na Kwiatowej',
		street: 'Kwiatowa',
		houseNumber: 13,
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		id: 'sportsFacilitiesid3',
		name: 'Stadion Miejski "Zwierzyniec"',
		street: 'Zwierzyniecka',
		houseNumber: 16,
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		id: 'sportsFacilitiesid4',
		name: 'Orlik szkolny',
		street: 'Kolorowa',
		houseNumber: 1,
		postalCode: '15-323',
		city: 'Białystok',
	},
	{
		id: 'sportsFacilitiesid5',
		name: 'Stadion Miejski na Zielonej',
		street: 'Zielona',
		houseNumber: 5,
		postalCode: '15-323',
		city: 'Białystok',
	}
])

const event = ref({
	id: props.id,
	type: "Training",
	startDate: new Date(),
	endDate: new Date(),
	team: teams.value[0].id,
	sportsFacility: sportsFacilities.value[0].id,
	opponent: 'AP Wigry Suwałki',
	ifNewSportsFacility: computed(() => {
		if (event.value.sportsFacility !== 'newobject') {
			return false
		}
		else
			return true
	}),
	remarks: '',
	get hour(): string {
		if (this.startDate.getHours().toLocaleString(locale.value).length == 2)
			return this.startDate.getHours().toLocaleString(locale.value)
		else
			return '0' + this.startDate.getHours().toLocaleString(locale.value)
	},
	get minutes(): string {
		if (this.startDate.getMinutes().toLocaleString(locale.value).length == 2)
			return this.startDate.getMinutes().toLocaleString(locale.value)
		else
			return '0' + this.startDate.getMinutes().toLocaleString(locale.value)
	}
})

const goEditEvent = (eventId: any) => {
	return router.push(`/events/edit/${eventId}`)
}

</script>

<template>
	<BackgroundFrame>
		<template v-slot:data>

			<MyCenterElement>
				<template v-slot>
					<MiniWhiteFrame v-bind:key="event.id">
						<template v-slot:nav>
							<button>
								<img src="../../assets/attendance-list-icon.png" class="h-24px" />
							</button>
							<button>
								<img src="../../assets/statistic-icon.png" class="h-24px" />
							</button>
							<button @click="goEditEvent(event.id)">
								<img src="../../assets/edit-icon.png" class="h-24px" />
							</button>
							<button>
								<img src="../../assets/delete-icon.png" class="h-24px" />
							</button>
						</template>
						<template v-slot:icon>
							<img v-if="event.type == 'Match'" src="../../assets/calendar-icon-purple.png" class="h-150px" />
							<img v-else-if="event.type == 'Tournament'" src="../../assets/calendar-icon-purple-light.png"
								class="h-150px" />
							<img v-else-if="event.type == 'Training'" src="../../assets/calendar-icon-green.png" class="h-150px" />
						</template>
						<template v-slot:attributes>
							<SingleAttribute>
								<template v-slot:attributeName>{{ t('single-event.type') }}:</template>
								<template v-slot:attributeValue>{{ event.type }}</template>
							</SingleAttribute>
							<SingleAttribute v-if="event.type !== 'Tournament'">
								<template v-slot:attributeName>{{ t('single-event.date') }}:</template>
								<template v-slot:attributeValue>
									{{ event.startDate.toLocaleDateString(locale) }}
								</template>
							</SingleAttribute>
							<SingleAttribute v-if="event.type === 'Tournament'">
								<template v-slot:attributeName>{{ t('single-event.start-date') }}:</template>
								<template v-slot:attributeValue>
									{{ event.startDate.toLocaleDateString(locale) }}
								</template>
							</SingleAttribute>
							<SingleAttribute v-if="event.type === 'Tournament'">
								<template v-slot:attributeName>{{ t('single-event.end-date') }}:</template>
								<template v-slot:attributeValue>
									{{ event.endDate.toLocaleDateString(locale) }}
								</template>
							</SingleAttribute>
							<SingleAttribute>
								<template v-slot:attributeName>{{ t('single-event.hour') }}:</template>
								<template v-slot:attributeValue>{{ event.hour }}:{{ event.minutes
								}}</template>
							</SingleAttribute>
							<SingleAttribute>
								<template v-slot:attributeName>{{ t('single-event.team') }}:</template>
								<template v-slot:attributeValue>{{ event.team }}</template>
							</SingleAttribute>
							<SingleAttribute>
								<template v-slot:attributeName>{{ t('single-event.object') }}:</template>
								<template v-slot:attributeValue>{{ event.sportsFacility }}</template>
							</SingleAttribute>
							<SingleAttribute v-if="event.type === 'Match'">
								<template v-slot:attributeName>{{ t('single-event.opponent') }}:</template>
								<template v-slot:attributeValue>
									{{ event.opponent }}
								</template>
							</SingleAttribute>
							<SingleAttribute v-if="event.remarks != ''">
								<template v-slot:attributeName>{{ t('single-event.remarks') }}:</template>
								<template v-slot:attributeValue>{{ event.remarks }}</template>
							</SingleAttribute>
						</template>
						<template v-slot:footer>
							<AttendanceList></AttendanceList>
						</template>
					</MiniWhiteFrame>

					<!-- <MiniWhiteFrame v-bind:key="event.id">
						<template v-slot:attributes>
							
						</template>
					</MiniWhiteFrame> -->
				</template>
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>