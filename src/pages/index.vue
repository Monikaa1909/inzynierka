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
    <router-link class="label" to="/start">
      {{ t('intro.start') }}
    </router-link>
  </div>
  <div v-else class="centerColumn">
    <router-link class="button centerColumn buttonFont " to="/login">
      {{ t('login.sign-in') }}
    </router-link>
    <p class="button centerColumn buttonFont">
      {{ t('login.register') }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
