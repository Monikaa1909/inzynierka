<script setup lang="ts">
import { validatePassword } from '~/validatesFunctions'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const router = useRouter()
const { t } = useI18n()

const props = defineProps<{ id: string }>()

const password = ref('')
const newPassword = ref('')
const newPasswordRepeat = ref('')

const credentials = computed(() => ({
  password: password.value,
}))

const newCredentials = computed(() => ({
  newPassword: newPassword.value,
}))

const { data: managerData, error: managerError, execute: submitManager } = useFetch(`/api/auth/validate/password/${payload.value?.id}`, { immediate: false }).post(credentials).text()
const { data: trainerData, error: trainerError, execute: submitTrainer } = useFetch(`/api/auth/trainer/password/${props.id}`, {
	immediate: false, 
  async beforeFetch({ url, options, cancel }) {
    const myToken = token.value
    if (!myToken)
      cancel()

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${myToken}`,
    }

    return {
      options,
    }
  }
}).post(newCredentials).text()

const error = computed(() => {
	return managerError.value && trainerError.value
})

const successfullySubmittedManagerPassword = ref(false)
const successfullySubmittedTrainerPassword = ref(false)
const submittedManagerPassword = ref(false)

whenever(managerData, (data) => {
  if (data === 'true') successfullySubmittedManagerPassword.value = true
  else successfullySubmittedManagerPassword.value = false
})

const firstName = ref('')
const lastName = ref('')

whenever(trainerData, (data) => {
  if (data && !JSON.parse(data).error) {
    successfullySubmittedTrainerPassword.value = true
    firstName.value = JSON.parse(data).firstName
    lastName.value = JSON.parse(data).lastName
  }
  else {
    alert(t('error-messages.change-password-error'))
  }
})

const submitManagerPassword = async () => {
  submitManager()
  submittedManagerPassword.value = true
}

const submitTrainerPassword = async () => {
  
  if (newPasswordErrorMessage.value) {
    alert(t('error-messages.validation-error'))
    return
  }
  
  submitTrainer()
}

const passwordErrorMessage = computed(() => {
	return managerData.value
})

const newPasswordErrorMessage = computed(() => {
  if (validatePassword(newPassword.value)) return validatePassword(newPassword.value)
  else if (newPassword.value != newPasswordRepeat.value) return 'error-messages.diffrent-passwords'
	return ''
})

</script>

<template>
  <BackgroundFrame v-if = "payload">
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
          <template #attributes>
            
            <MessageInfo v-if="!error && !successfullySubmittedManagerPassword && !successfullySubmittedTrainerPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{t('info.able-password-trainer')}},</p>
                  <p class="text-center">{{t('info.enter-your-password')}}:</p>
                  <input v-model="password" name="password" type="password"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                  <p v-if="passwordErrorMessage" class="text-xs color-red">
                    {{t('error-messages.wrong-password')}}
                  </p>
                </div>
              </template>
              <template #button>
                <SingleButton @click="submitManagerPassword">
                  <template #buttonName>{{ t('button.submit') }}</template>
                </SingleButton>
              </template>
            </MessageInfo>

            <MessageInfo v-else-if="!error && successfullySubmittedManagerPassword && !successfullySubmittedTrainerPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{t('info.enter-new-password')}}:</p>
                  <input v-model="newPassword" name="password" type="password"
                    class="flex flex-auto w-200px border-1 border-#143547 p-1 shadow-lg" />
                  <p class="text-center">{{t('info.repeat-new-password')}}:</p>
                  <input v-model="newPasswordRepeat" name="password" type="password"
                    class="flex flex-auto w-200px border-1 border-#143547 p-1 shadow-lg" />
                  <p v-if="newPasswordErrorMessage" class="text-xs color-red">
                    {{t(newPasswordErrorMessage)}}
                  </p>
                </div>
              </template>
              <template #button>
                <SingleButton @click="submitTrainerPassword">
                  <template #buttonName>{{ t('button.submit') }}</template>
                </SingleButton>
              </template>
            </MessageInfo>

            <MessageInfo v-else-if="!error && successfullySubmittedTrainerPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{t('info.password-user')}}:</p>
                  <p class="text-center font-medium">{{firstName}} {{lastName}}</p>
                  <p class="text-center">{{t('info.changed-successfully')}}</p>
                </div>
              </template>
              <template #button>
                <SingleButton @click="router.go(-1)">
                  <template #buttonName>{{ t('button.ok') }}</template>
                </SingleButton>
              </template>
            </MessageInfo>

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