<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col h-full  w-full">
    <div class="bg-balls flex flex-auto justify-center  flex-col gap-4 py-10 px-5 sm:(px-20)">
      <div class=" flex content-center place-content-center">
        <img src="../assets/error-icon.png" class="h-64px" />
      </div>
      <div class=" flex content-center place-content-center">
        <router-view />
      </div>

      <div class=" flex content-center place-content-center">
        <SingleButton @click="router.back()">
          <template #buttonName>
            {{ t('button.back') }}
          </template>
        </SingleButton>
      </div>
    </div>
  </div>
</template>
