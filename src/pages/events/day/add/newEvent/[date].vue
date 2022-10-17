<script setup lang="ts">
import 'v-calendar/dist/style.css';
const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps({
  date: String,
})

</script>
    
<template>
	<BackgroundFrame>
		<template v-slot:data>
			<MyCenterElement>
				<template v-slot>
					<MiniWhiteFrame>
						<template v-slot:icon>
							<img src="../../../../../assets/calendar-icon2.png" class=" h-150px" />
						</template>
						<template v-slot:attributes>
							<NewEventForm :day="props.date"></NewEventForm>
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