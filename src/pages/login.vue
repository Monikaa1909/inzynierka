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
  <div class="flex flex-col h-full justify-center p-4">
    <div class="text-center mb-4"> {{ t('login.choose-account-type') }}: </div>
    <router-link class="bg-#143547 color-#FFFFFF self-center w-300px m-2 p-2 shadow-lg text-center" to="/loginAcademy">
      {{ t('login.academy') }}
    </router-link>
    <router-link class="bg-#143547 color-#FFFFFF self-center w-300px m-2 p-2 shadow-lg text-center" to="/loginTrainer">
      {{ t('login.trainer') }}
    </router-link>
    <router-link class="bg-#143547 color-#FFFFFF self-center w-300px m-2 p-2 shadow-lg text-center" to="/loginParent">
      {{ t('login.parent') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
