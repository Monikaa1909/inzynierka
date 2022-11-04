<script setup lang="ts">
import { validateFirstName, validateEmail, validatePhoneNumber, requiredField, validateNationality, validateName } from '~/validatesFunctions'

import type { Academy } from 'backend/database/schemas/Academy'
import type { Trainer } from 'backend/database/schemas/Trainer'
import type { Parent } from 'backend/database/schemas/Parent'

import 'v-calendar/dist/style.css';
const { t, availableLocales, locale } = useI18n()

const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const accountType = ref('Academy')
// const accountType = ref('Parent')
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

const firstNameErrorMessage = computed(() => {
  if (!validateFirstName(profile.value.firstName)) {
    return false
  }
  return t(validateFirstName(profile.value.firstName))
})

const lastNameErrorMessage = computed(() => {
  if (!validateFirstName(profile.value.lastName)) {
    return false
  }
  return t(validateFirstName(profile.value.lastName))
})

const phoneNumberErrorMessage = computed(() => {
  if (!validatePhoneNumber(profile.value.phoneNumber)) {
    return false
  }
  return t(validatePhoneNumber(profile.value.phoneNumber))
})

const emailErrorMessage = computed(() => {
  if (!validateEmail(profile.value.email)) {
    return false
  }
  return t(validateEmail(profile.value.email))
})

const birthdayDateErrorMessage = computed(() => {
  if (!requiredField(profile.value.birthdayDate)) {
    return false
  }
  return t(requiredField(profile.value.birthdayDate))
})

const nationalityErrorMessage = computed(() => {
  if (!validateNationality(profile.value.nationality)) {
    return false
  }
  return t(validateNationality(profile.value.nationality))
})

const nameErrorMessage = computed(() => {
  if (!validateName(profile.value.name)) {
    return false
  }
  return t(validateName(profile.value.name))
})

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>

        <MiniWhiteFrame>
          <template #icon>
            <img v-if="accountType != 'Academy'" src="../../assets/player-icon2.png" class="h-150px" />
            <img v-else src="../../assets/academy-icon.png" class="h-150px" />
          </template>

          <template #attributes>

            <LoadingCircle v-if="isFetching"></LoadingCircle>

            <div
              v-if="!error && ((academy != null && isAcademyFinished) || (trainer != null && isTrainerFinished) || (parent != null && isParentFinished))"
              class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">
              <SingleInput v-if="accountType === 'Academy'">
                <template #inputName>{{ t('your-profile.name') }}:</template>
                <template #inputValue>
                  <input v-model="profile.name" name="name" type="input"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
                <template #errorMessage v-if="nameErrorMessage">
                  {{ nameErrorMessage }}
                </template>
              </SingleInput>

              <SingleInput v-if="accountType != 'Academy'">
                <template #inputName>{{ t('your-profile.first-name') }}:</template>
                <template #inputValue>
                  <input v-model="profile.firstName" name="name" type="input"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
                <template v-if="firstNameErrorMessage" #errorMessage>
                  {{ firstNameErrorMessage }}
                </template>
              </SingleInput>

              <SingleInput v-if="accountType != 'Academy'">
                <template #inputName>{{ t('your-profile.last-name') }}:</template>
                <template #inputValue>
                  <input v-model="profile.lastName" name="name" type="input"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
                <template #errorMessage v-if="lastNameErrorMessage">
                  {{ lastNameErrorMessage }}
                </template>
              </SingleInput>

              <SingleInput v-if="accountType === 'Trainer'">
                <template #inputName>{{ t('your-profile.birthday-date') }}:</template>
                <template #inputValue>
                  <DatePicker v-model="profile.birthdayDate" format="yyyy-MM-dd" :clearable="false"
                    class="inline-block h-full" :locale='locale'>
                    <template v-slot="{ inputValue, togglePopover }">
                      <div class="flex items-center">
                        <button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
                          <img src="../../assets/calendar-button.png" class="h-32px " />
                        </button>
                        <input :value="inputValue"
                          class="bg-white text-gray-700 w-full h-32px py-1 px-2 appearance-none border focus:outline-none border-#143547"
                          readonly />
                      </div>
                    </template>
                  </DatePicker>
                </template>
                <template v-if="birthdayDateErrorMessage" #errorMessage>
                  {{ birthdayDateErrorMessage }}
                </template>
              </SingleInput>

              <SingleInput v-if="accountType === 'Trainer'">
                <template #inputName>{{ t('your-profile.nationality') }}:</template>
                <template #inputValue>
                  <input v-model="profile.nationality" name="name" type="input"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
                <template #errorMessage v-if="nationalityErrorMessage">
                  {{ nationalityErrorMessage }}
                </template>
              </SingleInput>

              <SingleInput v-if="accountType != 'Academy'">
                <template #inputName>{{ t('your-profile.phone-number') }}:</template>
                <template #inputValue>
                  <input v-model="profile.phoneNumber" name="name" type="input"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
                <template #errorMessage v-if="phoneNumberErrorMessage">
                  {{ phoneNumberErrorMessage }}
                </template>
              </SingleInput>

              <SingleInput v-if="accountType != 'Academy'">
                <template #inputName>{{ t('your-profile.email') }}:</template>
                <template #inputValue>
                  <input v-model="profile.email" name="name" type="input"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
                <template #errorMessage v-if="emailErrorMessage">
                  {{ emailErrorMessage }}
                </template>
              </SingleInput>
            </div>

          </template>

          <template #footer>
            <SingleButton>
              <template #buttonName>{{ t('button.save') }}</template>
            </SingleButton>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.cancel') }}</template>
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