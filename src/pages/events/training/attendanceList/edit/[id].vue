<script setup lang="ts">
const { availableLocales, locale } = useI18n()


const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<TraininingAttendanceList :id="props.id" :edit="true"></TraininingAttendanceList>
			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>