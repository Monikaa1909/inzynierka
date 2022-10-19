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

const tournament = ref({
	id: 'tournamentsid1',
	name: 'Tymbark',
	startDate: new Date(2022, 10, 12, 16, 0),
	endDate: new Date(2022, 10, 15),
	team: 'Młodzik D1',
	description: 'Bardzo fajny turniej',
	sportsFacility: 'Stadion miejski w Białymstoku',
	remarks: ''
},)

const isHidden = ref(true)
const sortType = ref('all')

function changeSorting(newSortType: any) {
	sortType.value = newSortType
}
const goEditTournamentStatistic = (eventId: any) => {
	return router.push(`/events/statistic/tournament/edit/${eventId}`)
}
</script>

<template>
	<BackgroundFrame>
		<template v-slot:data>
			<MyCenterElement>
				<template v-slot>
					<MiniWhiteFrame>
						<template v-slot:nav>
							<button @click="isHidden = !isHidden">
								<img src="../../../../assets/filter-icon.png" class="h-24px" />
							</button>
							<button @click="goEditTournamentStatistic(props.id)">
								<img src="../../../../assets/edit-icon.png" class="h-24px" />
							</button>
						</template>
						<template v-slot:icon>
							<img src="../../../../assets/statistic-icon2.png" class="h-150px" />
						</template>
						<template v-slot:attributes>
							<StatisticSortOptions :statisticType="'tournament'" @changeSorting="changeSorting" v-if="!isHidden">
							</StatisticSortOptions>
							<div class="flex flex-row gap-2 w-full px-2">
								<p class="font-medium">{{ t('single-event.description')}}: </p>
								<p>{{tournament.description}}</p>
							</div>
							<StatisticTable :sortType="sortType" :statisticType="'tournament'"></StatisticTable>
						</template>
						<template v-slot:footer>
							<SingleButton @click="router.go(-1)">
								<template v-slot:buttonName>{{ t('button.back') }}</template>
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