<script setup>
import { useTrainer } from '../stores/trainer'
import { useParent } from '../stores/parent'
import { useAcademy } from '../stores/academy'

const trainer = useTrainer()
const parent = useParent()
const academy = useAcademy()
const { t } = useI18n()
</script>

<template>
  <div v-if="parent.token != null || trainer.token != null || academy.token != null">
    <router-link class="text-center mb-4" to="/start">
      {{ t('intro.start') }}
    </router-link>
  </div>
  <div v-else class="flex flex-col text-xl my-16 mx-4">
    <router-link class="bg-#143547 color-#FFFFFF w-300px m-2 p-1 shadow-lg text-center" to="/login">
      {{ t('login.sign-in') }}
    </router-link>
    <p class="bg-#143547 color-#FFFFFF w-300px m-2 p-1 shadow-lg text-center">
      {{ t('login.register') }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
