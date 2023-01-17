<script setup lang="ts">
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const password = ref('')
const credentials = computed(() => ({
  password: password.value,
}))

const { data: managerData, execute: submitManager, isFinished: isPasswordFinished } = useFetch(`/api/auth/validate/password/${payload.value?.id}`, {
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
}).post(credentials).text()

const step = ref(0)

const cancelDeleting = () => {
  router.go(-1)
}

const confirmDelete = async () => {
  step.value += 1
}

const submitManagerPassword = async () => {
  await submitManager()
}

const passwordErrorMessage = ref(false)

whenever(isPasswordFinished, (data) => {
  if (data) {
    if (managerData.value != null){
      if (managerData.value === 'true') {
        passwordErrorMessage.value = false
        deleteAll()
      } else {
        passwordErrorMessage.value = true
      }
    }
  }
})

const deleteAll = async () => {
  await useFetch(`/api/academy/all/${payload.value?.academy}`, {
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
    },
  }).delete()

  token.value = null
  router.push('/login')
}

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>

        <DeletingMessageDialog v-if="step === 0" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
          <template #deletedItem>
            {{ t('other.academy') }}
          </template>
          <template #added>
            {{ t('other.sure') }}
          </template>
        </DeletingMessageDialog>

        <MiniWhiteFrame v-if="step === 1">
          <template #attributes>
            <MessageInfo>
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

