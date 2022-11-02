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

				<AttendanceList :id="props.id" :edit="false"></AttendanceList>
				

			</MyCenterElement>
		</template>
	</BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>