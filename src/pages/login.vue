<script setup>
import { useTrainer } from '../stores/trainer'
import { useParent } from '../stores/parent'
import { useAcademy } from '../stores/academy'

const trainer = useTrainer()
const parent = useParent()
const academy = useAcademy()
</script>

<template>
  <div>
    <p>Wybierz typ konta:</p>
    <router-link to="/loginTrainer">
      Trener
    </router-link><br>
    <router-link to="/loginParent">
      Rodzic
    </router-link><br>
    <router-link to="/loginAcademy">
      Akademia
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
