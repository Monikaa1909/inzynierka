<script setup>
const { t } = useI18n()
</script>

<template>
  <div>
    <buttons-frame />
    <div class="flex flex-col my-4 mx-8 sm:(flex-row my-20)">
      <div class="justify-items-center self-center">
        <img src="logo.png " class="px-2 pb-2 flex-grow-0 flex-shrink-1 basis-auto max-w-300px">
      </div>
      <div class="flex-grow-0 flex-shrink basis-auto px-2 flex flex-col self-center ">
        <img src="name.png " class="px-2 pb-2 flex-grow-0 flex-shrink-1 basis-auto max-w-300px">
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">Aplikacja</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">wspomagająca</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">zarządzanie</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">akademią</p>
        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">piłkarską</p>
      </div>
    </div>
    <div class="text-center color-#32B3A3 text-2xl mb-4">{{ t('intro.slogan') }}</div>
  </div>
</template>
