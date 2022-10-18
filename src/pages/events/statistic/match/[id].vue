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

const isHidden = ref(true)
const filterType = ref('all')

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
							<div v-if="!isHidden"
								class="w-full flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
								<button @click="filterType='goalsScored'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
										{{ t('match-statistic.goals-scored') }}
									</p>
								</button>
								<button @click="filterType='yellowCards'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
										{{ t('match-statistic.yellow-cards') }}
									</p>
								</button>
								<button @click="filterType='redCards'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
										{{ t('match-statistic.red-cards') }}
									</p>
								</button>
								<button @click="filterType='minutesPlayed'" class="p-1 w-full rounded-xl">
									<p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
										{{ t('match-statistic.minutes-played') }}
									</p>
								</button>
							</div>
							<EventStatistic :id="props.id" :eventType="'Match'" :sort="filterType"></EventStatistic>
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