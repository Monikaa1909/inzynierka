<script setup lang="ts">
import 'v-calendar/dist/style.css';
const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

</script>
    
<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>
					<template #icon>
						<img src="../../../../assets/calendar-icon2.png" class=" h-150px" />
					</template>
					<template #attributes>
						<NewEventForm :id="props.id" :type="'Training'"></NewEventForm>
					</template>
				</MiniWhiteFrame>
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>
    
<route lang="yaml">
meta:
  layout: home
</route>