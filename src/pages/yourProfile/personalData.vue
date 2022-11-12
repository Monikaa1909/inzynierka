<script setup lang="ts">
import type { AcademyManager } from 'backend/database/schemas/AcademyManager.user'
import type { Trainer } from 'backend/database/schemas/Trainer.user'
import type { Parent } from 'backend/database/schemas/Parent.user'
import type { Academy } from 'backend/database/schemas/Academy'
import { JwtPayload } from 'backend/database/schemas/User'
import type { User } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import SingleAttribute from '~/components/SingleElements/SingleAttribute.vue'

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const {
  data: parent,
  isFinished: isParentFinished,
  isFetching: isParentFetching,
  error: parentError,
  execute: refechParent
} = useFetch(`/api/parent/${payload.value.id}`, { initialData: {}, immediate: false }).json<Parent>()

const {
  data: trainer,
  isFinished: isTrainerFinished,
  isFetching: isTrainerFetching,
  error: trainerError,
  execute: refechTrainer
} = useFetch(`/api/trainer/${payload.value.id}`, { initialData: {}, immediate: false }).json<Trainer>()

const {
  data: manager,
  isFinished: isManagerFinished,
  isFetching: isManagerFetching,
  error: managerError,
  execute: refechManager
} = useFetch(`/api/manager/${payload.value.id}`, { initialData: {}, immediate: false }).json<AcademyManager>()

const user = ref({} as User & { 
  birthdayDate?: Date,
  nationality?: string,
  phoneNumber?: string,
  remarks?: string,
  academy: Academy,
})

if (payload.value.type === 'AcademyManager') refechManager()
else if (payload.value.type === 'Trainer') refechTrainer()
else if (payload.value.type === 'Parent') refechParent()

whenever(manager, (data) => {
  user.value = data
  user.value.birthdayDate = new Date(data.birthdayDate)
})

whenever(trainer, (data) => {
  user.value = data
  user.value.birthdayDate = new Date(data.birthdayDate)
})

whenever(parent, (data) => {
  user.value = data
})

const isFetching = computed(() => {
  return isTrainerFetching.value || isParentFetching.value || isManagerFetching.value
})

const isFinished = computed(() => {
  return isTrainerFinished.value || isParentFinished.value || isManagerFinished.value
})

const error = computed(() => {
  return trainerError.value && parentError.value  && managerError.value
})

const goEditYourProfile = (userId: any) => {
  return router.push(`/yourProfile/edit`)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>

          <template #nav>
            <button @click="goEditYourProfile">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/academy-icon.png" class="h-150px" />
          </template>

          <template #attributes>

            <LoadingCircle v-if="isFetching"></LoadingCircle>

            <div v-if="!error && isFinished" class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">
              <SingleAttribute>
                <template #attributeName>{{ t('your-profile.first-name') }}:</template>
                <template #attributeValue>{{ user.firstName }}</template>
              </SingleAttribute>

              <SingleAttribute>
                <template #attributeName>{{ t('your-profile.last-name') }}:</template>
                <template #attributeValue>{{ user.lastName }}</template>
              </SingleAttribute>

              <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.birthday-date') }}:</template>
              <template #attributeValue>{{ user.birthdayDate?.toLocaleDateString(locale) }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.nationality') }}:</template>
              <template #attributeValue>{{ user.nationality }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.phone-number') }}:</template>
              <template #attributeValue>{{ user.phoneNumber }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.email') }}:</template>
              <template #attributeValue>{{ user.email }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.login') }}:</template>
              <template #attributeValue>{{ user.login }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-trainer.remarks') }}:</template>
              <template #attributeValue>{{ user.remarks }}</template>
            </SingleAttribute>
            </div>

          <ErrorMessageInfo v-if="error">
          </ErrorMessageInfo>
          </template>

          

          <template #footer>
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