<script setup>
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div id="welcomeButtons" class="flex flex-row relative">
    <button @click="toggleLocales">
      <img src="public/settings%20icon.svg" class="icon">
      <p> {{ t('button.functions') }} </p>
    </button>
    <button @click="toggleLocales">
      <img src="public/settings%20icon.svg" class="icon">
      <p> {{ t('button.contact') }} </p>
    </button>
    <button @click="toggleLocales">
      <img src="public/settings%20icon.svg" class="icon">
      <p> {{ t('button.set-language') }} </p>
    </button>
  </div>
  <div class="flex flex-row mx-2 my-20 mx-8 sm:(flex-row)">
    <div class="justify-items-center self-center px-2">
      <div class="bg-logo bg-contain  self-center w-50vw h-50vw flex-grow-0 flex-shrink basis-auto sm:(w-25vw h-25vw)"></div>
    </div>
    <div class="flex-grow flex-shrink basis-auto px-2 flex flex-col self-center">
      <img src="public/name.png" class="px-2 pb-2">
      <p class="flex-grow flex-shrink text-xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">Aplikacja</p>
      <p class="flex-grow flex-shrink text-xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">wspomagająca</p>
      <p class="flex-grow flex-shrink text-xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">zarządzanie</p>
      <p class="flex-grow flex-shrink text-xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">akademią</p>
      <p class="flex-grow flex-shrink text-xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">piłkarską</p>
    </div>
  </div>
</template>
<style scoped>
.bg-logo {
  background-image: url("/logo.png");
} 
</style>
