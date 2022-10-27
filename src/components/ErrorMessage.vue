<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="w-full h-full flex flex-row flex-auto gap-8 place-content-center place-items-center">
    <slot><p class="text-2xl">{{t('error-messages.went-wrong')}}</p></slot>
  </div>
</template>
