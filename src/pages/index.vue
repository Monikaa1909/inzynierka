<script setup>
import { useTrainer } from '../stores/trainer'
import { useParent } from '../stores/parent'

const trainer = useTrainer()
const parent = useParent()
</script>

<template>
  <div v-if="parent.token != null || trainer.token != null">
    <router-link to="/start">
      Rozpocznij korzystanie z aplikacji
    </router-link>
  </div>
  <div v-else>
    <router-link to="/login">
      Zaloguj
    </router-link>
    <p>Zarejestruj</p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
