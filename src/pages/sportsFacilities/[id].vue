<script setup lang="ts">
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const props = defineProps<{ id: string }>()

const { t } = useI18n()
const router = useRouter()

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const {
  data: sportsFacility,
  isFinished,
  isFetching,
  error
} = useFetch(`/api/sportsFacility/${props.id}`, { initialData: {} }).json<SportsFacility>()

const goEditObject = (objectId: any) => {
  return router.push(`/sportsFacilities/edit/${objectId}`)
}

const isDeleting = ref(false)

const deleteSportsFacility = () => {
  isDeleting.value = true
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  await useFetch(`/api/sportsFacility/${props.id}`).delete()
  return router.go(-1)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>

      <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ sportsFacility?.name }}
        </template>
      </DeletingMesageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyCenterElement v-if="isFinished && !isDeleting && !error && sportsFacility">
        
        <MiniWhiteFrame>
          <template #nav>
            <button @click="goEditObject(sportsFacility?._id)">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteSportsFacility()">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/object-icon2.png" class=" h-150px" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-object.name') }}:</template>
              <template #attributeValue>{{ sportsFacility?.name }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.street') }}:</template>
              <template #attributeValue>{{ sportsFacility?.street }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.number') }}:</template>
              <template #attributeValue>{{ sportsFacility?.houseNumber }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.postal-code') }}:</template>
              <template #attributeValue>{{ sportsFacility?.postalCode }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.city') }}:</template>
              <template #attributeValue>{{ sportsFacility?.city }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.remarks') }}:</template>
              <template #attributeValue>{{ sportsFacility?.remarks }}</template>
            </SingleAttribute>

          </template>
          <template v-slot:footer>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.back') }}</template>
            </SingleButton>
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