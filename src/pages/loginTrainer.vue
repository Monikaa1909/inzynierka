<script setup lang="ts">
import * as yup from 'yup'
import { useJwt } from '@vueuse/integrations/useJwt'

const { meta } = useForm({
  validationSchema: yup.object({
    login: yup.string().required(),
    password: yup.string().required().min(6),
  }),
})

const { value: login, errorMessage: loginError } = useField('login')
const { value: password, errorMessage: passwordError } = useField('password')

const { t } = useI18n()

const credentials = computed(() => ({
  login: login.value,
  password: password.value
}))

const {
	data,
	isFetching,
	isFinished,
	error,
	execute
} = useFetch(`/api/auth/login`, { immediate: false }).post(credentials).text()

const token = useStorage('user:token', '')
syncRef(token, data)

const { payload } = useJwt(() => token.value ?? '')
watchEffect(() => {
  console.log(payload.value)
})

const submit = async () => {
  execute()
}

</script>

<template>
  <div class="flex h-full justify-center p-4">
    <form @submit.prevent="submit" class="flex flex-col self-center justify-between">
      <div class="flex flex-row justify-between gap-4 m-2">
        <p class="self-center">{{ t('login.login') }}:</p>
        <div class="flex flex-col">
          <input v-model="login" class="border-1 border-#143547 self-center p-1 shadow-lg">
          <span class="text-red-400 text-xs">
            {{ loginError }}
          </span>
        </div>
      </div>
      <div class="flex flex-row justify-between gap-4 m-2">
        <p class="self-center">{{ t('login.password') }}:</p>
        <div class="flex flex-col">
          <input v-model="password" type="password" class="border-1 border-#143547 self-center p-1 shadow-lg">
          <span class="text-red-400 text-xs">
            {{ passwordError }}
          </span>
        </div>
      </div>
      <input type="submit" :disabled="!meta.dirty" value="Zaloguj" class="bg-#143547 color-#FFFFFF self-center m-2 py-2 px-8 shadow-lg text-center">
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>