<script setup lang="ts">
import type { Academy } from 'backend/database/schemas/Academy'
import type { Trainer } from 'backend/database/schemas/Trainer'
import type { Parent } from 'backend/database/schemas/Parent'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

// const accountType = ref('Academy')
const accountType = ref('Parent')
// const accountType = ref('Trainer')
const id = ref('6365285a6e7338908e404200')
const academyName = 'AP Jagiellonia Białystok'

const {
  data: parent,
  isFinished: isParentFinished,
  isFetching: isParentFetching,
  error: parentError,
  execute: refechParent
} = useFetch(`/api/parent/${id.value}`, { initialData: {}, immediate: false }).json<Parent>()

const {
  data: trainer,
  isFinished: isTrainerFinished,
  isFetching: isTrainerFetching,
  error: trainerError,
  execute: refechTrainer
} = useFetch(`/api/trainer/${id.value}`, { initialData: {}, immediate: false }).json<Trainer>()

const {
  data: academy,
  isFinished: isAcademyFinished,
  isFetching: isAcademyFetching,
  error: academyError,
  execute: refechAcademy
} = useFetch(`/api/academy/${academyName}`, { initialData: {}, immediate: false }).json<Academy>()

if (accountType.value === 'Trainer')
  refechTrainer()
else if (accountType.value === 'Parent')
  refechParent()
else refechAcademy()

const profile = ref({
  id: '',
  name: '',
  firstName: '',
  lastName: '',
  birthdayDate: new Date(),
  nationality: '',
  academy: '',
  phoneNumber: '',
  email: '',
})

whenever(isAcademyFinished, (data) => {
  if (data) {
    if (academy.value != null) {
      profile.value.id = academy.value._id
      profile.value.name = academy.value.academyName
    }
  }
})

whenever(isParentFinished, (data) => {
  if (data) {
    if (parent.value != null) {
      profile.value.id = parent.value._id
      profile.value.firstName = parent.value.firstName
      profile.value.lastName = parent.value.lastName
      profile.value.phoneNumber = parent.value.phoneNumber
      profile.value.email = parent.value.email
    }
  }
})

whenever(isTrainerFinished, (data) => {
  if (data) {
    if (trainer.value != null) {
      profile.value.id = trainer.value._id
      profile.value.firstName = trainer.value.firstName
      profile.value.lastName = trainer.value.lastName
      profile.value.birthdayDate = new Date(trainer.value.birthdayDate)
      profile.value.nationality = trainer.value.nationality
      profile.value.phoneNumber = trainer.value.phoneNumber
      profile.value.email = trainer.value.email
    }
  }
})

const isFetching = computed(() => {
  return isTrainerFetching.value || isAcademyFetching.value || isParentFetching.value
})

const error = computed(() => {
  return trainerError.value && parentError.value && academyError.value
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
            <img v-if="accountType != 'Academy'" src="../../assets/player-icon2.png" class="h-150px" />
            <img v-else src="../../assets/academy-icon.png" class="h-150px" />
          </template>

          <template #attributes>

            <LoadingCircle v-if="isFetching"></LoadingCircle>

            <div v-if="!error && ((academy != null && isAcademyFinished) || (trainer != null && isTrainerFinished) || (parent != null && isParentFinished)) " class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">
              <SingleAttribute v-if="accountType === 'Academy'">
                <template #attributeName>{{ t('your-profile.name') }}:</template>
                <template #attributeValue>{{ profile.name }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="accountType != 'Academy'">
                <template #attributeName>{{ t('your-profile.first-name') }}:</template>
                <template #attributeValue>{{ profile.firstName }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="accountType != 'Academy'">
                <template #attributeName>{{ t('your-profile.last-name') }}:</template>
                <template #attributeValue>{{ profile.lastName }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="accountType === 'Trainer'">
                <template #attributeName>{{ t('your-profile.birthday-date') }}:</template>
                <template #attributeValue>{{ profile.birthdayDate.toLocaleDateString(locale) }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="accountType === 'Trainer'">
                <template #attributeName>{{ t('your-profile.nationality') }}:</template>
                <template #attributeValue>{{ profile.nationality }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="accountType != 'Academy'">
                <template #attributeName>{{ t('your-profile.phone-number') }}:</template>
                <template #attributeValue>{{ profile.phoneNumber }}</template>
              </SingleAttribute>

              <SingleAttribute v-if="accountType != 'Academy'">
                <template #attributeName>{{ t('your-profile.email') }}:</template>
                <template #attributeValue>{{ profile.email }}</template>
              </SingleAttribute>
            </div>
            <ErrorMessageInfo v-else-if="!error">
              {{ t('error-messages.no-players-in-team') }}
            </ErrorMessageInfo>

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