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

const { data: managerData, error: managerError, execute: submitManager } = useFetch(`/api/auth/validate/password/${payload.value.id}`, { immediate: false }).post(credentials).text()
const { data: parentData, error: parentError, execute: submitParent } = useFetch(`/api/auth/change/password/${props.id}`, { immediate: false }).post(newCredentials).text()

const error = computed(() => {
	return managerError.value && parentError.value
})

const successfullySubmittedManagerPassword = ref(false)
const successfullySubmittedParentPassword = ref(false)
const submittedManagerPassword = ref(false)

whenever(managerData, (data) => {
  if (data === 'true') successfullySubmittedManagerPassword.value = true
  else successfullySubmittedManagerPassword.value = false
})

const firstName = ref('')
const lastName = ref('')
whenever(parentData, (data) => {
  successfullySubmittedParentPassword.value = true
  firstName.value = JSON.parse(data).firstName
  lastName.value = JSON.parse(data).lastName
})

const submitManagerPassword = async () => {
  submitManager()
  submittedManagerPassword.value = true
}

const submitParentPassword = async () => {
  submitParent()
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
            
            <MessageInfo v-if="!error && !successfullySubmittedManagerPassword && !successfullySubmittedParentPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{t('info.able-password-parent')}},</p>
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

            <MessageInfo v-else-if="!error && successfullySubmittedManagerPassword && !successfullySubmittedParentPassword">
              <template #info>
                <div class="w-full h-full flex flex-col gap-2 place-content-center place-items-center">
                  <p class="text-center">{{t('info.enter-new-password')}}:</p>
                  <input v-model="newPassword" name="password" type="password"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                  <p class="text-center">{{t('info.repeat-new-password')}}:</p>
                  <input v-model="newPasswordRepeat" name="password" type="password"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                  <p v-if="newPasswordErrorMessage" class="text-xs color-red">
                    {{t(newPasswordErrorMessage)}}
                  </p>
                </div>
              </template>
              <template #button>
                <SingleButton @click="submitParentPassword">
                  <template #buttonName>{{ t('button.submit') }}</template>
                </SingleButton>
              </template>
            </MessageInfo>

            <MessageInfo v-else-if="!error && successfullySubmittedParentPassword">
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
</template>

<route lang="yaml">
meta:
  layout: home
</route>