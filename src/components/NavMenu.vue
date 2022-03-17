<script setup>
import { useTrainer } from '~/stores/trainer'

const trainer = useTrainer()
</script>

<template>
  <div class="py-4 shadow-md border-b">
    <div class="container mx-auto flex">
      <div class="ml-auto"></div>
      <router-link v-if="!trainer.token" to="/login">
        Zaloguj
      </router-link>
      <div>
        {{ trainer.token }}
      </div>
    </div>
  </div>
</template>
