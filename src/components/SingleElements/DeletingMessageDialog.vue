<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="w-full h-full flex flex-auto place-content-center place-items-center">
    <div class="min-h-100px bg-white frame-shadow flex border border-#d9e0e8 flex-col gap-8 p-12">
      <div class="w-full flex flex-row place-content-center place-items-center gap-1">
        <p class="flex">{{ t('other.confirming-deleting') }} </p>
        <slot name="deletedItem"></slot>
        <p class="flex">?</p>
      </div>
      <slot name="added"></slot>
      <div class="w-full flex flex-row gap-4 place-content-center place-items-center">
        <SingleButton @click="$emit('confirmDelete')">
          <template #buttonName>{{ t('button.yes') }}</template>
        </SingleButton>
        <SingleButton @click="$emit('cancelDeleting')">
          <template #buttonName>{{ t('button.no') }}</template>
        </SingleButton>
      </div>
    </div>
  </div>
</template>
