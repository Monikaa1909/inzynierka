<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="h-full  flex flex-col gap-8 p-12">

    <div class="w-full flex flex-col place-content-center place-items-center gap-1">
      <slot name="info"></slot>
    </div>

    <div class="w-full flex flex-row gap-4 place-content-center place-items-center">
      <slot name="button">
        <SingleButton @click="$emit('confirmRegisterInfo')">
          <template #buttonName>{{ t('button.ok') }}</template>
        </SingleButton>
      </slot>
    </div>

  </div>
</template>
