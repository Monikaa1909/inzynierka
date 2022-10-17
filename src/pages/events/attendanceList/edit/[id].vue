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
	team: teams.value[0].name,
	sportsFacility: sportsFacilities.value[0].name,
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

const save = () => {
	return router.go(-1)
}

</script>

<template>
	<BackgroundFrame>
		<template v-slot:data>

			<MyCenterElement>
				<template v-slot>
					<MiniWhiteFrame>
						<template v-slot:icon>
							<img src="../../../../assets/attendance-list-icon2.png" class="h-150px" />
						</template>
						<template v-slot:attributes>
							<AttendanceList :id="event.id" :edit="true"></AttendanceList>
						</template>
						<template v-slot:footer>
							<SingleButton @click="save()">
								<template v-slot:buttonName>{{ t('button.save') }}</template>
							</SingleButton>
							<SingleButton @click="router.go(-1)">
								<template v-slot:buttonName>{{ t('button.cancel') }}</template>
							</SingleButton>
						</template>
					</MiniWhiteFrame>
				</template>
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>