<script setup lang="ts">
import { validatePassword } from '~/validatesFunctions'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const router = useRouter()
const { t } = useI18n()

const password = ref('')
const newPassword = ref('')
const newPasswordRepeat = ref('')

const credentials = computed(() => ({
  password: password.value,
}))

const newCredentials = computed(() => ({
  newPassword: newPassword.value,
}))

const { data: managerData, error: managerError, execute: submitManager } = useFetch(`/api/auth/validate/password/${payload.value.id}`, { immediate: false }).post(credentials).text()
const { data: yourData, error: yourDataError, execute: submitNewPassword } = useFetch(`/api/auth/${(payload.value.type).toLowerCase()}/password/${payload.value.id}`, {
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
  return managerError.value && yourDataError.value
})

const successfullySubmittedManagerPassword = ref(false)
const successfullySubmittedTrainerPassword = ref(false)
const submittedManagerPassword = ref(false)

whenever(managerData, (data) => {
  if (data === 'true') successfullySubmittedManagerPassword.value = true
  else successfullySubmittedManagerPassword.value = false
})

whenever(yourData, (data) => {
  if (data && !JSON.parse(data).error) {
    successfullySubmittedTrainerPassword.value = true
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
  submitNewPassword()
}

const passwordErrorMessage = computed(() => {
  return managerData.value
})

const newPasswordErrorMessage = computed(() => {
  if (newPassword.value != newPasswordRepeat.value) return 'error-messages.diffrent-passwords'
  else if (validatePassword(newPassword.value)) return validatePassword(newPassword.value)
  return ''
})

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
          <template #attributes>

            <MessageInfo
              v-if="!error && !successfullySubmittedManagerPassword && !successfullySubmittedTrainerPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{ t('info.able-password-your') }},</p>
                  <p class="text-center">{{ t('info.enter-your-old-password') }}:</p>
                  <input v-model="password" name="password" type="password"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                  <p v-if="passwordErrorMessage" class="text-xs color-red">
                    {{ t('error-messages.wrong-password') }}
                  </p>
                </div>
              </template>
              <template #button>
                <SingleButton @click="submitManagerPassword">
                  <template #buttonName>{{ t('button.submit') }}</template>
                </SingleButton>
              </template>
            </MessageInfo>

            <MessageInfo
              v-else-if="!error && successfullySubmittedManagerPassword && !successfullySubmittedTrainerPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{ t('info.enter-new-password') }}:</p>
                  <input v-model="newPassword" name="password" type="password"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                  <p class="text-center">{{ t('info.repeat-new-password') }}:</p>
                  <input v-model="newPasswordRepeat" name="password" type="password"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                  <p v-if="newPasswordErrorMessage" class="text-xs color-red">
                    {{ t(newPasswordErrorMessage) }}
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
                  <p class="text-center">{{ t('info.password-changed') }}</p>
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
</template>

<route lang="yaml">
meta:
  layout: home
</route>