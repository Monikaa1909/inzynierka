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

const match = ref({
	id: 'matchesid1',
	goalsConceded: 2,
	goalsScored: 0,
	opponent: 'Biebrza Goniądz',
	duration: 90,
	date: new Date(2022, 10, 12, 10, 5),
	team: 'Trampkarz C2',
	sportsFacility: 'Stadion miejski w Białymstoku',
	remarks: 'Zadzwonić potwierdzić boisko'
},)

const isHidden = ref(true)
const sortType = ref('all')

function changeSorting(newSortType: any) {
	sortType.value = newSortType
}

const goEditMatchStatistic = (eventId: any) => {
	return router.push(`/events/statistic/match/edit/${eventId}`)
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
							<button @click="goEditMatchStatistic(props.id)">
								<img src="../../../../assets/edit-icon.png" class="h-24px" />
							</button>
						</template>
						<template v-slot:icon>
							<img src="../../../../assets/statistic-icon2.png" class="h-150px" />
						</template>
						<template v-slot:attributes>
							<StatisticSortOptions :statisticType="'match'" @changeSorting="changeSorting" v-if="!isHidden">
							</StatisticSortOptions>
							<div class="flex flex-col gap-2">
								<div class="flex flex-row gap-2 w-full px-2">
									<p class="font-medium">{{ t('single-event.result')}}: </p>
									<p>{{match.goalsScored}}:{{match.goalsConceded}}</p>
								</div>
								<div class="flex flex-row gap-2 w-full px-2">
									<p class="font-medium">{{ t('single-event.duration')}}: </p>
									<p>{{match.duration}} {{t('single-event.minutes')}}</p>
								</div>
							</div>
							<StatisticTable :sortType="sortType" :statisticType="'match'"></StatisticTable>
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