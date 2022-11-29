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
				<TraininingAttendanceList :id="props.id" :edit="true"></TraininingAttendanceList>
			</MyCenterElement>
		</template>
	</BackgroundFrame>

	<GoSignIn v-else></GoSignIn>
</template>

<route lang="yaml">
meta:
  layout: home
</route>