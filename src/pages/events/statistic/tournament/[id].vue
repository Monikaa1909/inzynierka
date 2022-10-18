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
							<button @click="goEditTournamentStatistic(props.id)">
								<img src="../../../../assets/edit-icon.png" class="h-24px" />
							</button>
						</template>
						<template v-slot:icon>
							<img src="../../../../assets/statistic-icon2.png" class="h-150px" />
						</template>
						<template v-slot:attributes>
							<MatchStatistic :id="props.id" :eventType="'Tournament'"></MatchStatistic>
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