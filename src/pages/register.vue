<script setup lang="ts">
import { requiredField, validateName, validateFirstName, validateEmail, validatePhoneNumber, validateNationality, validateLogin } from '~/validatesFunctions'
import { AcademyManager } from 'backend/database/schemas/AcademyManager.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import { Academy } from 'backend/database/schemas/Academy'

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = ref({} as Omit<Academy, '_id'>)
academy.value.academyName = ''
const academyManager = ref({} as Omit<AcademyManager, '_id'>)

const academyId = ref('')
const newManager = computed(() => ({
  login: academyManager.value.login,
  email: academyManager.value.email,
  academy: academyManager.value.academy,
  lastName: academyManager.value.lastName,
  firstName: academyManager.value.firstName,
  nationality: academyManager.value.nationality,
  birthdayDate: academyManager.value.birthdayDate,
  phoneNumber: academyManager.value.phoneNumber,
}))

const { execute: saveAcademy, isFetching: isAcademyFetching, isFinished: isAcademyFinished, error: saveAcademyError, data: academyData } = useFetch('api/academy', { immediate: false }).post(academy)
const { execute: saveManager, isFetching: isManagerFetching, isFinished: isManagerFinished, error: saveManagerError, data: passwordData } = useFetch(`/api/auth/register/manager`, { immediate: false }).post(newManager)

const step = ref(1)
const next = async () => {
  if (step.value === 1) step.value += 1

  else if (step.value === 2) {
    if (nameErrorMessage.value) {
      alert(t('error-messages.validation-error'))
      return
    }
    else step.value += 1
  }

  else if (step.value === 3) {
    if (firstNameErrorMessage.value || lastNameErrorMessage.value || phoneNumberErrorMessage.value || emailErrorMessage.value
      || nationalityErrorMessage.value || birthdayDateErrorMessage.value || loginErrorMessage.value) {
      alert(t('error-messages.validation-error'))
      return
    }
    else {
      if (!academyAdded.value) {
        await saveAcademy()
        console.log("zapisuje akadmeie")
      }
        
      else
        await saveManager()
    }
  }
}

const successfullyRegistered = ref(false)
const academyAdded = ref(false)

const newAcademy = ref({} as string)
whenever(isAcademyFinished, async (data) => {
  console.log("academy finished")
  if (!saveAcademyError.value) {

    newAcademy.value = academyData.value as unknown as string
    academyId.value = JSON.parse(newAcademy.value)._id
    academyManager.value.academy = academyId.value as unknown as Academy

    academyAdded.value = true

    await saveManager()
    console.log("zapisuje managera")
  }
  else {
    alert(t('error-messages.register-academy') + ' crewAssistantHelp@gmail.com')
    step.value -= 1
  }
})

whenever(isManagerFinished, async (data) => {
  console.log("jestm tu")
  if (saveManagerError.value) {
    alert(t('error-messages.register-manager') + ' crewAssistantHelp@gmail.com')
  }
  else {
    successfullyRegistered.value = true
    step.value += 1
  }
})

const isFetching = computed(() => {
  return isAcademyFetching.value && isManagerFetching.value
})

const nameErrorMessage = computed(() => {
  if (!requiredField(academy.value.academyName))
    return t(requiredField(academy.value.academyName))
  else if (!validateName(academy.value.academyName)) {
    return false
  }
  return t(validateName(academy.value.academyName))
})

const firstNameErrorMessage = computed(() => {
  if (!validateFirstName(academyManager.value.firstName)) {
    return false
  }
  return t(validateFirstName(academyManager.value.firstName))
})

const lastNameErrorMessage = computed(() => {
  if (!validateFirstName(academyManager.value.lastName)) {
    return false
  }
  return t(validateFirstName(academyManager.value.lastName))
})

const phoneNumberErrorMessage = computed(() => {
  if (!validatePhoneNumber(academyManager.value.phoneNumber)) {
    return false
  }
  return t(validatePhoneNumber(academyManager.value.phoneNumber))
})

const emailErrorMessage = computed(() => {
  if (!validateEmail(academyManager.value.email)) {
    return false
  }
  return t(validateEmail(academyManager.value.email))
})

const loginErrorMessage = computed(() => {
  if (!validateLogin(academyManager.value.login)) {
    return false
  }
  return t(validateLogin(academyManager.value.login))
})

const birthdayDateErrorMessage = computed(() => {
  if (!requiredField(academyManager.value.birthdayDate)) {
    return false
  }
  return t(requiredField(academyManager.value.birthdayDate))
})

const nationalityErrorMessage = computed(() => {
  if (!validateNationality(academyManager.value.nationality)) {
    return false
  }
  return t(validateNationality(academyManager.value.nationality))
})

const cancel = async () => {
  if (academyAdded.value && !successfullyRegistered.value) {
    await useFetch(`/api/academy/${academyId.value}`).delete()
    console.log('usunięto akademię')
  }
  return router.go(-1)
}

</script>

<template>
  <div class="flex h-full justify-center p-4">
    <div class="flex flex-col gap-2 self-center justify-between ">

      <div v-if="step === 1" class="flex flex-col gap-2 self-center justify-between">
        <p class="text-center text-xl font-medium mb-4">{{t('register.welcome')}}</p>

        <p class="text-center text-xl">{{t('register.to-register')}},</p>
        <p class="text-center text-xl mb-4">{{t('register.need-steps')}}.</p>

        <div class="flex flex-row  text-center flex-wrap gap-2 self-center mb-2">
          <p class="text-center text-xl w-full">{{t('register.to-continue')}}</p>
          <p class="text-center text-xl font-medium w-full">{{t('register.next')}}</p>
        </div>
      </div>

      <div v-if="step === 2" class="flex flex-col gap-2 self-center justify-between">
        <p class="text-center text-xl font-medium mb-4">{{t('register.step')}} 1.</p>
        <p class="text-center text-xl">{{t('register.give-academy')}}:</p>
        <input v-model="academy.academyName" name="academyName" type="input"
          class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />

        <p v-if="nameErrorMessage" class="text-center text-xs"> {{ nameErrorMessage }}</p>
      </div>

      <div v-if="step === 3" class="flex flex-col gap-2 self-center justify-between">
        <p class="text-center text-xl font-medium mb-4">{{t('register.step')}} 2.</p>
        <p class="text-center text-xl">{{t('register.give-your-data')}}:</p>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.first-name') }}:</template>
          <template #inputValue>
            <input v-model="academyManager.firstName" name="firstName" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
          </template>
          <template #errorMessage v-if="firstNameErrorMessage">
            {{ firstNameErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.last-name') }}:</template>
          <template #inputValue>
            <input v-model="academyManager.lastName" name="lastName" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
          </template>
          <template #errorMessage v-if="lastNameErrorMessage">
            {{ lastNameErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.birthday-date') }}:</template>
          <template #inputValue>
            <DatePicker v-model="academyManager.birthdayDate" format="yyyy-MM-dd" :clearable="false"
              class="inline-block h-full" :locale='locale'>
              <template v-slot="{ inputValue, togglePopover }">
                <div class="flex items-center">
                  <button class="bg-#143547 flex hover:bg-#143547-200 text-white" @click="togglePopover()">
                    <img src="../assets/calendar-button.png" class="h-32px " />
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

        <SingleInput>
          <template #inputName>{{ t('single-trainer.nationality') }}:</template>
          <template #inputValue>
            <input v-model="academyManager.nationality" name="nationality" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
          </template>
          <template #errorMessage v-if="nationalityErrorMessage">
            {{ nationalityErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.phone-number') }}:</template>
          <template #inputValue>
            <input v-model="academyManager.phoneNumber" name="phoneNumber" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
          </template>
          <template #errorMessage v-if="phoneNumberErrorMessage">
            {{ phoneNumberErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.email') }}:</template>
          <template #inputValue>
            <input v-model="academyManager.email" name="email" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
          </template>
          <template #errorMessage v-if="emailErrorMessage">
            {{ emailErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.login') }}:</template>
          <template #inputValue>
            <input v-model="academyManager.login" name="login" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
          </template>
          <template #errorMessage v-if="loginErrorMessage">
            {{ loginErrorMessage }}
          </template>
        </SingleInput>
      </div>

      <div v-if="step === 4" class="flex flex-col gap-2 self-center justify-between">
        <LoadingCircle v-if="isFetching"></LoadingCircle>
        <div v-else-if="successfullyRegistered" class="flex flex-col gap-2 place-content-center place-items-center">
          <p class="text-center">{{ t('info.manager-registered') }}</p>
          <p class="text-center">{{ t('info.login-details') }}:</p>
          <div class="w-full flex flex-row gap-4 place-content-center mt-4">
            <p>{{ t('login.login') }}:</p>
            <p class="font-medium">{{ newManager.login }}</p>
          </div>
          <div class="w-full flex flex-row gap-2 place-content-center">
            <p>{{ t('login.password') }}:</p>
            <p class="font-medium">{{ passwordData }}</p>
          </div>
          <p class="font-bold text-center my-4">{{ t('info.remember-credentials') }}</p>

          <p>{{ t('info.press-ok') }}</p>
        </div>
      </div>

      <div class="flex flex-row justify-between gap-4 m-2 flex-wrap">
        <SingleButton v-if="step === 1" @click="router.go(-1)" class=" flex flex-auto">
          <template #buttonName>{{ t('button.back') }}</template>
        </SingleButton>

        <SingleButton v-else-if="step < 4" @click="step -= 1" class=" flex flex-auto">
          <template #buttonName>{{ t('button.back') }}</template>
        </SingleButton>

        <SingleButton v-if="step === 3" @click="next" class=" flex flex-auto">
          <template #buttonName>{{ t('login.register') }}</template>
        </SingleButton>

        <SingleButton v-else-if="step < 4" @click="next" class=" flex flex-auto">
          <template #buttonName>{{ t('button.next') }}</template>
        </SingleButton>

      </div>

      <SingleButton v-if="step < 4" @click="cancel()" class=" flex flex-auto my-4 mx-8">
        <template #buttonName>{{ t('button.cancel') }}</template>
      </SingleButton>

      <SingleButton v-else-if="step === 4" @click="router.go(-1)" class=" flex flex-auto m-2">
        <template #buttonName>{{ t('button.ok') }}</template>
      </SingleButton>

    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
