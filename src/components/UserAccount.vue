<script setup lang="ts">
import { validateFirstName, validateEmail, validatePhoneNumber, validateNationality, requiredField } from '~/validatesFunctions'
import type { AcademyManager } from 'backend/database/schemas/AcademyManager.user'
import type { Trainer } from 'backend/database/schemas/Trainer.user'
import type { Parent } from 'backend/database/schemas/Parent.user'
import type { Academy } from 'backend/database/schemas/Academy'
import { JwtPayload } from 'backend/database/schemas/User'
import type { User } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const props = defineProps<{ edit?: boolean }>()

// const url = computed(() => {
//   if (payload.value.type === 'AcademyManager') return `/api/manager/${payload.value.id}`
//   else if (payload.value.type === 'Trainer') return 
//   else if (payload.value.type === 'Parent') return `/api/parent/${payload.value.id}`
// })



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
  return trainerError.value && parentError.value && managerError.value
})

const goEditPassword = () => {
  return router.push(`/yourProfile/password`)
}

const goEditYourProfile = (userId: any) => {
  return router.push(`/yourProfile/edit`)
}

const firstNameErrorMessage = computed(() => {
  if (!validateFirstName(user.value.firstName)) {
    return false
  }
  return t(validateFirstName(user.value.firstName))
})

const lastNameErrorMessage = computed(() => {
  if (!validateFirstName(user.value.lastName)) {
    return false
  }
  return t(validateFirstName(user.value.lastName))
})

const phoneNumberErrorMessage = computed(() => {
  if (!validatePhoneNumber(user.value.phoneNumber)) {
    return false
  }
  return t(validatePhoneNumber(user.value.phoneNumber))
})

const emailErrorMessage = computed(() => {
  if (!validateEmail(user.value.email)) {
    return false
  }
  return t(validateEmail(user.value.email))
})

const birthdayDateErrorMessage = computed(() => {
  if (!requiredField(user.value.birthdayDate)) {
    return false
  }
  return t(requiredField(user.value.birthdayDate))
})

const nationalityErrorMessage = computed(() => {
  if (!validateNationality(user.value.nationality)) {
    return false
  }
  return t(validateNationality(user.value.nationality))
})

const onSubmit = async () => {
  console.log('onsubmit')
  if (firstNameErrorMessage.value || lastNameErrorMessage.value || phoneNumberErrorMessage.value || emailErrorMessage.value) {
    alert(t('error-messages.validation-error'))
  } else {
    console.log(payload.value.type)
    if (payload.value.type === "Trainer" && !(nationalityErrorMessage.value || birthdayDateErrorMessage.value)) {
      const { execute: updateTrainer, error: updateError } = useFetch(`/api/trainer/${payload.value.id}`, { immediate: false }).post(user)
      await updateTrainer()
      if (updateError.value) {
        alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
        return
      }
      return router.push('/yourProfile/personalData')
    } else if (payload.value.type === "Parent") {
      console.log('update parent')
      const { execute: updateParent, error: updateError } = useFetch(`/api/parent/${payload.value.id}`, { immediate: false }).post(user)
      await updateParent()
      if (updateError.value) {
        alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
        return
      }
      return router.push('/yourProfile/personalData')
    } else if (payload.value.type === "AcademyManager" && !(nationalityErrorMessage.value || birthdayDateErrorMessage.value)) {
      const { execute: updateManager, error: updateError } = useFetch(`/api/manager/${payload.value.id}`, { immediate: false }).post(user)
      await updateManager()
      if (updateError.value) {
        alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
        return
      }
      return router.push('/yourProfile/personalData')
    }
  }
}
</script>

<template>
  <MiniWhiteFrame>

    <template #nav>
      <button @click="goEditPassword()">
        <img src="../assets/password-icon.png" class="h-24px" />
      </button>
      <button @click="goEditYourProfile" v-if="!props.edit">
        <img src="../assets/edit-icon.png" class="h-24px" />
      </button>
    </template>

    <template #icon>
      <img src="../assets/player-icon2.png" class="h-150px" />
    </template>

    <template #attributes>

      <LoadingCircle v-if="isFetching"></LoadingCircle>

      <div v-if="!error && isFinished" class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

        <SingleInput>
          <template #inputName>{{ t('your-profile.first-name') }}:</template>
          <template #inputValue>
            <input v-if="props.edit" v-model="user.firstName" name="name" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
            <p v-else>{{ user.firstName }}</p>
          </template>
          <template #errorMessage v-if="firstNameErrorMessage && props.edit">
            {{ firstNameErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.last-name') }}:</template>
          <template #inputValue>
            <input v-if="props.edit" v-model="user.lastName" name="lastName" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
            <p v-else>{{ user.lastName }}</p>
          </template>
          <template #errorMessage v-if="lastNameErrorMessage && props.edit">
            {{ lastNameErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput v-if="payload.type != 'Parent'">
          <template #inputName>{{ t('single-trainer.birthday-date') }}:</template>
          <template #inputValue>
            <DatePicker v-if="props.edit" v-model="user.birthdayDate" format="yyyy-MM-dd" :clearable="false"
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
            <p v-else>{{ user.birthdayDate?.toLocaleDateString(locale) }}</p>
          </template>
          <template v-if="birthdayDateErrorMessage && props.edit" #errorMessage>
            {{ birthdayDateErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput v-if="payload.type != 'Parent'">
          <template #inputName>{{ t('single-trainer.nationality') }}:</template>
          <template #inputValue>
            <input v-if="props.edit" v-model="user.nationality" name="nationality" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
            <p v-else>{{ user.nationality }}</p>
          </template>
          <template #errorMessage v-if="nationalityErrorMessage && props.edit">
            {{ nationalityErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.phone-number') }}:</template>
          <template #inputValue>
            <input v-if="props.edit" v-model="user.phoneNumber" name="phoneNumber" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
            <p v-else>{{ user.phoneNumber }}</p>
          </template>
          <template #errorMessage v-if="phoneNumberErrorMessage && props.edit">
            {{ phoneNumberErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.email') }}:</template>
          <template #inputValue>
            <input v-if="props.edit" v-model="user.email" name="email" type="input"
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
            <p v-else>{{ user.email }}</p>
          </template>
          <template #errorMessage v-if="emailErrorMessage && props.edit">
            {{ emailErrorMessage }}
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.login') }}:</template>
          <template #inputValue>
            <p>{{ user.login }}</p>
          </template>
        </SingleInput>

        <SingleInput>
          <template #inputName>{{ t('single-trainer.remarks') }}:</template>
          <template #inputValue>
            <textarea v-if="props.edit" v-model="user.remarks" type="textarea" placeholder=""
              class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"></textarea>
            <p v-else>{{ user.remarks }}</p>
          </template>
        </SingleInput>
      </div>

      <ErrorMessageInfo v-if="error">
      </ErrorMessageInfo>
    </template>



    <template #footer>
      <SingleButton v-if="props.edit" @click="onSubmit()">
        <template #buttonName>{{ t('button.save') }}</template>
      </SingleButton>
      <SingleButton @click="router.go(-1)">
        <template #buttonName>{{ t('button.back') }}</template>
      </SingleButton>
    </template>
  </MiniWhiteFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>