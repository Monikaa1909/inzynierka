<script setup lang="ts">

const { t } = useI18n()

</script>
<template>
  <div class="w-full h-full flex flex-row flex-wrap gap-1 flex-auto place-content-center place-items-center">
    <p class="text-2xl overflow-clip text-center">{{t('other.not-login')}}</p>
    <router-link to="/login" class="text-2xl overflow-clip text-center font-medium">{{t('login.sign-in')}}</router-link>
    <p class="text-2xl overflow-clip text-center">{{t('other.or')}}</p>
    <router-link to="/register" class="text-2xl overflow-clip text-center font-medium">{{t('login.register')}}</router-link>
  </div>
</template>
