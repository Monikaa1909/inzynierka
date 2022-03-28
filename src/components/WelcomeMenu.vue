<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="h-full flex flex-col">
    <buttons-frame />
    <div class="flex-grow flex-shrink flex-auto flex flex-col my-4 mx-8 sm:(flex-row my-20)">
      <div class="justify-items-center self-center">
        <img src="../assets/logo.png " class="px-2 flex-grow-0 flex-shrink-1 basis-auto max-w-300px">
      </div>
      <div class="flex-grow-0 flex-shrink basis-auto px-2 flex flex-col self-center ">

        <!-- TODO [#3]: i18n -->
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">{{ t('aplikacja') }}</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">wspomagająca</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">zarządzanie</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">akademią</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">piłkarską</p>
      </div>
    </div>
    <div class="text-center color-#32B3A3 text-2xl mb-4">{{ t('intro.slogan') }}</div>
  </div>
</template>
