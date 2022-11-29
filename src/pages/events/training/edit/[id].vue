<script setup lang="ts">
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const props = defineProps<{ id: string }>()

</script>
    
<template>
	<BackgroundFrame v-if="payload">
		<template #data>
			<MyCenterElement>
				<MiniWhiteFrame>
					<template #icon>
						<img src="../../../../assets/calendar-icon2.png" class=" h-150px" />
					</template>
					<template #attributes>
						<EditTrainingForm :id="props.id"></EditTrainingForm>
					</template>
				</MiniWhiteFrame>
			</MyCenterElement>
		</template>
	</BackgroundFrame>

	<GoSignIn v-else></GoSignIn>
</template>
    
<route lang="yaml">
meta:
  layout: home
</route>