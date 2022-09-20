<script setup lang="ts">
import BackgroundFrameGrid from '~/components/BackgroundFrameGrid.vue';
const { t } = useI18n()
const router = useRouter()

const object = {
	name: 'Stadion Miejski w Białymstoku',
	street: 'Słoneczna 1',
	postalCode: '15-323',
	city: 'Białystok',
}


const cancel = () => {
	return router.push('/objects')
}
</script>

<template>
	<BackgroundFrameGrid>
		<template v-slot>
			<MiniWhiteFrame>
				<template v-slot:icon>
					<img src="../../assets/object-icon2.png" class=" h-150px" />
				</template>
				<template v-slot:attributes>
					<SingleInput>
						<template v-slot:inputName>{{ t('single-object.name') }}:</template>
						<template v-slot:inputValue>
							<input
								v-model="object.name"
								placeholder="{{object.name}}"
								class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
							/>
						</template>
					</SingleInput>
					<SingleInput>
						<template v-slot:inputName>{{ t('single-object.street') }}:</template>
						<template v-slot:inputValue>
							<input
								v-model="object.street"
								placeholder="{{object.street}}"
								class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
							/>
						</template>
					</SingleInput>
					<SingleInput>
						<template v-slot:inputName>{{ t('single-object.postal-code') }}:</template>
						<template v-slot:inputValue>
							<input
								v-model="object.postalCode"
								placeholder="{{object.postalCode}}"
								class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
							/>
						</template>
					</SingleInput>
					<SingleInput>
						<template v-slot:inputName>{{ t('single-object.city') }}:</template>
						<template v-slot:inputValue>
							<input
								v-model="object.city"
								placeholder="{{object.city}}"
								class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
							/>
						</template>
					</SingleInput>
				</template>
				<template v-slot:footer>
					<SingleButton>
						<template v-slot:buttonName>{{ t('button.save') }}</template>
					</SingleButton>
					<SingleButton @click="cancel">
						<template v-slot:buttonName>{{ t('button.cancel') }}</template>
					</SingleButton>
				</template>
			</MiniWhiteFrame>
		</template>
	</BackgroundFrameGrid>
</template>

<route lang="yaml">
meta:
  layout: home
</route>