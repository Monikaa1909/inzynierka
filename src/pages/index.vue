<script setup lang="ts">

const { t } = useI18n()

</script>

<template>
  <div class="flex flex-col h-full justify-center w-full ">
    <router-link to="/login" class="bg-#143547 p-2 text-#FFFFFF self-center m-2 w-full shadow-lg text-center hover:bg-#2F4D5E sm:(px-8) truncate" >
      {{ t('login.sign-in') }}
    </router-link>
    <router-link to="/register" class="bg-#143547 p-2 text-#FFFFFF self-center m-2 w-full shadow-lg text-center hover:bg-#2F4D5E sm:(px-8) truncate">
      {{ t('login.register-academy') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
