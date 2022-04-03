<script setup>
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="h-full flex flex-col p-2">
    <div class="flex flex-col justify-around sm:(flex-row flex-wrap)">
      <SingleButton>
        <template v-slot:buttonName>{{t('button.functions')}}</template>
      </SingleButton>
      <SingleButton>
        <template v-slot:buttonName>{{t('button.contact')}}</template>
      </SingleButton>
      <SingleButton @click="toggleLocales">
        <template v-slot:buttonName>{{t('button.set-language')}}</template>
      </SingleButton>
    </div>
    <div class="flex-auto flex flex-col sm:(flex-row flex-wrap py-4) py-2 px-4 gap-8 self-center">
      <img src="../assets/logo.png " class="self-center flex-auto max-w-300px">
      <div class="flex-auto flex flex-col self-center">
        <img src="../assets/name.png " class="max-w-250px">
        <p class="text-3xl text-#FFFFFF ">Aplikacja</p>
        <p class="text-3xl text-#FFFFFF ">wspomagająca</p>
        <p class="text-3xl text-#FFFFFF ">zarządzanie</p>
        <p class="text-3xl text-#FFFFFF ">akademią</p>
        <p class="text-3xl text-#FFFFFF">piłkarską</p>
      </div>
    </div>
    <div class="text-center color-#32B3A3 m-4 justify-end text-2xl">{{ t('intro.slogan') }}</div>
  </div>
<!--  <div class="h-full flex flex-col">-->
<!--    <div class="flex-grow-0 flex-shrink flex-auto flex flex-col m-2 text-xl sm:(flex-row)">-->
<!--      <SingleButton>-->
<!--        <template v-slot:buttonName>{{t('button.functions')}}</template>-->
<!--      </SingleButton>-->
<!--      <SingleButton>-->
<!--        <template v-slot:buttonName>{{t('button.contact')}}</template>-->
<!--      </SingleButton>-->
<!--      <SingleButton @click="toggleLocales">-->
<!--        <template v-slot:buttonName>{{t('button.set-language')}}</template>-->
<!--      </SingleButton>-->
<!--    </div>-->
<!--    <div class="flex-grow flex-shrink flex-auto flex flex-col my-4 mx-8 sm:(flex-row my-20)">-->
<!--      <div class="justify-items-center self-center">-->
<!--        <img src="../assets/logo.png " class="px-2 flex-grow-0 flex-shrink-1 basis-auto max-w-300px">-->
<!--      </div>-->
<!--      <div class="flex-grow-0 flex-shrink basis-auto px-2 flex flex-col self-center ">-->
<!--        <img src="../assets/name.png" class="px-2 pb-2 pt-2 flex-grow flex-shrink basis-auto max-w-300px">-->
<!--        &lt;!&ndash; TODO [#3]: i18n &ndash;&gt;-->
<!--        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">Aplikacja</p>-->
<!--        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">wspomagająca</p>-->
<!--        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">zarządzanie</p>-->
<!--        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">akademią</p>-->
<!--        <p class="flex-grow flex-shrink text-3xl text-#FFFFFF basis-auto px-3 sm:(text-3xl)">piłkarską</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center color-#32B3A3 text-2xl mb-4">{{ t('intro.slogan') }}</div>-->
<!--  </div>-->
</template>
