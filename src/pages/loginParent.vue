<script setup>
import * as yup from 'yup'
import { useParent } from '../stores/parent'
import { login as useLogin } from '~/composables'
//
const { meta } = useForm({
  validationSchema: yup.object({
    login: yup.string().required(),
    password: yup.string().required().min(6),
  }),
})

const { value: login, errorMessage: loginError } = useField('login')
const { value: password, errorMessage: passwordError } = useField('password')
//
const router = useRouter()
const parent = useParent()
const submit = async() => {
  const token = await useLogin(login.value, password.value)
  parent.value.token = token
  if (token != null)
    return router.push('/start')
  else
    return router.push('/login')
}
</script>

<template>
  <div>
    {{ parent.token ?? 'brak' }}

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
</route>
