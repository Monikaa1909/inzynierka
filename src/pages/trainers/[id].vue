<script setup lang="ts">
import { Trainer } from 'backend/database/schemas/Trainer.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const props = defineProps<{ id: string }>()

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const trainer = ref({} as Omit<Trainer, '_id'>)

const {
  data: trainerData,
  isFinished,
  isFetching,
  error
} = useFetch(`/api/trainer/${props.id}`, { initialData: {} }).json<Trainer>()

whenever(trainerData, (data) => {
  trainer.value = data
  trainer.value.birthdayDate = new Date(data.birthdayDate)
})

const goEditTrainer = (trainerId: any) => {
  return router.push(`/trainers/edit/${trainerId}`)
}

const isDeleting = ref(false)

const deleteTrainer = () => {
  isDeleting.value = true
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  await useFetch(`/api/trainer/${props.id}`).delete()
  return router.go(-1)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>

      <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ trainer.firstName }} {{ trainer.lastName }}
        </template>
      </DeletingMesageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyCenterElement v-if="isFinished && !isDeleting && !error && trainer">
        <MiniWhiteFrame>
          <template #nav>
            <button @click="goEditTrainer(props.id)">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteTrainer">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/trainer-icon2.png" class="h-150px cursor-pointer" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.first-name') }}:</template>
              <template #attributeValue>{{ trainer.firstName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.last-name') }}:</template>
              <template #attributeValue>{{ trainer.lastName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.birthday-date') }}:</template>
              <template #attributeValue>{{ trainer.birthdayDate.toLocaleDateString(locale) }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.nationality') }}:</template>
              <template #attributeValue>{{ trainer.nationality }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.phone-number') }}:</template>
              <template #attributeValue>{{ trainer.phoneNumber }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.email') }}:</template>
              <template #attributeValue>{{ trainer.email }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.remarks') }}:</template>
              <template #attributeValue>{{ trainer.remarks }}</template>
            </SingleAttribute>
          </template>

          <template #footer>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.back') }}</template>
            </SingleButton>
          </template>
        </MiniWhiteFrame>
      </MyCenterElement>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && !trainer">
        {{ t('error-messages.no-data') }}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>