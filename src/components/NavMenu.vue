<script setup>
import { useTrainer } from '~/stores/trainer'
import { useParent } from '~/stores/parent'
import { useAcademy } from '~/stores/academy'

const trainer = useTrainer()
const parent = useParent()
const academy = useAcademy()

const router = useRouter()

const logout = async() => {
  parent.value.token = null
  academy.value.token = null
  trainer.value.token = null
  return router.push('/login')
}

</script>

<template>
  <div class="py-4 shadow-md border-b">
    <div class="container mx-auto flex">
      <div class="ml-auto"></div>
      <router-link v-if="!trainer.token && !parent.token && !academy.token" to="/login">
        Zaloguj
      </router-link>
      <router-link v-else @click="logout" to="/login">
        Wyloguj
      </router-link>
    </div>
    <p v-if="trainer.token">Konto trenera</p>
    <p v-else-if="parent.token">Konto rodzica</p>
    <p v-else-if="academy.token">Konto akademii</p>
  </div>
</template>
