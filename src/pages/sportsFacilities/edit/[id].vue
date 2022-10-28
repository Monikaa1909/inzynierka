<script setup lang="ts">

const props = defineProps<{ id: string }>()

</script>

<template>
	<BackgroundFrame>
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>
					<template #icon>
						<img src="../../../assets/object-icon2.png" class=" h-150px" />
					</template>
					<template #attributes>
						<NewSportsFacilityForm :sports-facility-id="props.id"></NewSportsFacilityForm>
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