<script setup lang="ts">

const sportsFacility = {
	name: 'Stadion Miejski w Białymstoku',
	street: 'Słoneczna',
	houseNumber: 1,
	postalCode: '15-323',
	city: 'Białystok',
}

</script>

<template>
	<BackgroundFrame>
		<template v-slot:data>
			<MyCenterElement>
				<template v-slot>
					<MiniWhiteFrame>
						<template v-slot:icon>
							<img src="../../../assets/object-icon2.png" class=" h-150px" />
						</template>
						<template v-slot:attributes>
							<NewObjectForm :sports-facility-id="sportsFacility.name"></NewObjectForm>
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