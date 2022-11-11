<script setup lang="ts">

const { t } = useI18n()

</script>

<template>
  <div class="flex flex-col h-full justify-center p-4">
    <router-link to="/login" class="bg-#143547 color-#FFFFFF self-center w-300px m-2 p-2 shadow-lg text-center" >
      {{ t('login.sign-in') }}
    </router-link>
    <p class="bg-#143547 color-#FFFFFF w-300px self-center m-2 p-2 shadow-lg text-center">
      {{ t('login.register') }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
