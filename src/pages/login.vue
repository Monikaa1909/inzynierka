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
  <div class="centerColumn">
    <p class="label mb-8">{{ t('login.choose-account-type') }}:</p>
    <router-link class="button centerColumn buttonFont" to="/loginTrainer">
      {{ t('login.academy') }}
    </router-link>
    <router-link class="button centerColumn buttonFont" to="/loginParent">
      {{ t('login.trainer') }}
    </router-link>
    <router-link class="button centerColumn buttonFont" to="/loginAcademy">
      {{ t('login.parent') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
