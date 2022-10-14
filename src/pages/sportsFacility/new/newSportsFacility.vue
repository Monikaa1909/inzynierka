<script setup lang="ts">

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
							<NewObjectForm></NewObjectForm>
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