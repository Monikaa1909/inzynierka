<script setup lang="ts">
import type { Trainer } from 'backend/database/schemas/Trainer.user';
import { useJwt } from '@vueuse/integrations/useJwt'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const token = useStorage('user:token', '')
const { payload } = useJwt(() => token.value ?? '')

const goEditTrainer = (trainerId: any) => {
  return router.push(`/trainers/edit/${trainerId}`)
}

function goToTrainer(trainerId: any) {
  return router.push(`/trainers/${trainerId}`)
}

const {
  data: trainers,
  isFetching,
  isFinished,
  error,
  execute: refechTrainers
} = useFetch(`/api/trainers/academy/${payload.value.academy}`, { initialData: [] }).json<Trainer[]>()

const isDeleting = ref(false)
const deletingTrainer = ref<Trainer>()

const deleteTrainer = (trainer: Trainer) => {
  isDeleting.value = true
  deletingTrainer.value = trainer
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  await useFetch(`/api/trainer/${deletingTrainer.value?._id}`).delete()
  refechTrainers()
}

</script>

<template>
  <BackgroundFrame>

    <template #nav>
      <router-link to="/trainers/add/newTrainer" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-trainer') }}</p>
      </router-link>
    </template>

    <template #data>

      <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem> 
          {{deletingTrainer?.firstName}} {{deletingTrainer?.lastName}}
        </template>
      </DeletingMesageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyGrid v-if="isFinished && !isDeleting && !error && trainers?.length != 0" class="lg:(grid-cols-3) md:(grid-cols-2)">
        <MiniWhiteFrame v-for="trainer in trainers" v-bind:key="trainer._id" class="hover:bg-#E3E3E3"
          clickable="cursor-pointer" @go-to="goToTrainer(trainer._id)">
         
          <template #nav>
            <button @click="goEditTrainer(trainer._id)">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteTrainer(trainer)">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/trainer-icon2.png" class="h-150px" />
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
              <template #attributeValue> {{ new Date(trainer.birthdayDate).toLocaleDateString(locale) }} </template>
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
          </template>
        </MiniWhiteFrame>
      </MyGrid>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && trainers?.length === 0">
        {{t('error-messages.no-data')}}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>

</template>

<route lang="yaml">
meta:
  layout: home
</route>