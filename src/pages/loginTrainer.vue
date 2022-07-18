<script setup lang="ts">
import * as yup from 'yup'

const { meta } = useForm({
  validationSchema: yup.object({
    login: yup.string().required(),
    password: yup.string().required().min(6),
  }),
})

const { value: login, errorMessage: loginError } = useField('login')
const { value: password, errorMessage: passwordError } = useField('password')

const { t } = useI18n()

</script>

<template>
  <div class="flex h-full justify-center p-4">
    <form class="flex flex-col self-center justify-between">
      <div class="flex flex-row justify-between gap-4 m-2">
        <p class="self-center">{{ t('login.login') }}:</p>
        <div class="flex flex-col">
          <input v-model="login" class="border-1 border-#143547 self-center p-2 shadow-lg focus:(outline-none border-2)">
          <span class="text-red-400 text-xs">
            {{ loginError }}
          </span>
        </div>
      </div>
      <div class="flex flex-row justify-between gap-4 m-2">
        <p class="self-center">{{ t('login.password') }}:</p>
        <div class="flex flex-col">
          <input v-model="password" type="password" class="border-1 border-#143547 self-center p-2 shadow-lg focus:(outline-none border-2)">
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

<!-- <script setup>
import * as yup from 'yup'
import { useTrainer } from '../stores/trainer'
import { login as useLogin } from '~/composables'

const { meta } = useForm({
  validationSchema: yup.object({
    login: yup.string().required(),
    password: yup.string().required().min(6),
  }),
})

const { value: login, errorMessage: loginError } = useField('login')
const { value: password, errorMessage: passwordError } = useField('password')

const router = useRouter()
const trainer = useTrainer()
const submit = async() => {
  const token = await useLogin(login.value, password.value)
  trainer.value.token = token
  if (token != null)
    return router.push('/start')
  else
    return router.push('/login')
}
</script>

<template>
  <div>
    {{ trainer.token ?? 'brak' }}

    <form @submit.stop.prevent="submit">
      <label class="block">
        Login
        <input v-model="login" class="border rounded-md block mb-2">
        <span class="text-red-400 text-xs">
          {{ loginError }}
        </span>
      </label>

      <label class="block">
        Haslo
        <input v-model="password" type="password" class="border rounded-md block mb-2">
        <span class="text-red-400 text-xs">
          {{ passwordError }}
        </span>
      </label>

      <input type="submit" :disabled="!meta.dirty" value="Zaloguj" class="px-4 py-2 rounded bg-blue-400">
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route> -->
