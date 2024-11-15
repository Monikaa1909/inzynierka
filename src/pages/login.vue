<script setup lang="ts">
import { validateLogin, requiredField } from '~/validatesFunctions'

const { t } = useI18n()
const router = useRouter()

const login = ref('')
const password = ref('')

const credentials = computed(() => ({
  login: login.value,
  password: password.value
}))

const submitted = ref(false)
const loginErrorMessage = computed(() => {
  if (!validateLogin(login.value)) {
    return false
  }
  return t(validateLogin(login.value))
})

const passwordErrorMessage = computed(() => {
  if (!requiredField(password.value)) {
    return false
  }
  return t(requiredField(password.value))
})

const errorMessage = ref('')

const { data: loginData, isFinished, execute } = useFetch(`/api/auth/login`, { immediate: false }).post(credentials).text()

const token = useStorage('user:token', '')

watchEffect(() => {
  if (loginData.value == "error") {
    errorMessage.value = 'error-messages.invalid-credentials'
  }
  else if (isFinished && loginData.value != "error") {
    syncRef(token, loginData)
    if (token.value) router.push('/calendar')
  }
})

const submit = async () => {
  submitted.value = true
  await execute()
}

</script>

<template>
  <div class="flex h-full justify-center p-4">
    <div class="flex flex-col self-center justify-between">
      <div class="flex flex-col justify-between gap-4 m-2 sm:(flex-row)">
        <p class="flex self-center">{{ t('login.login') }}:</p>
        <div class="flex flex-col">
          <input v-model="login" type="login" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg">
          <p v-if="submitted && loginErrorMessage" class="text-center text-xs">{{ loginErrorMessage }}</p>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-4 m-2 sm:(flex-row)">
        <p class="self-center">{{ t('login.password') }}:</p>
        <div class="flex flex-col">
          <input v-model="password" type="password" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg">
          <p v-if="submitted && passwordErrorMessage" class="text-center text-xs">{{ passwordErrorMessage }}</p>
        </div>
      </div>

      <p v-if="errorMessage && !loginErrorMessage && !passwordErrorMessage" class="text-center text-xs">
        {{ t(errorMessage) }}</p>
      <SingleButton @click="submit" class="mt-2 self-center w-4/5">
        <template #buttonName>{{ t('button.sign-in') }}</template>
      </SingleButton>

      <SingleButton @click="router.go(-1)" class="mt-2 self-center w-4/5">
        <template #buttonName>{{ t('button.back') }}</template>
      </SingleButton>

    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
