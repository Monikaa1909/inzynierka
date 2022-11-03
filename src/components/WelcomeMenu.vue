<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="h-full flex flex-col p-2 ">
    <div class="flex flex-col text-xl justify-around sm:(flex-row flex-wrap)">

      <SingleButton>
        <template #buttonName>
          <p>{{ t('button.functions') }}</p>
        </template>
      </SingleButton>

      <SingleButton>
        <template #buttonName>{{ t('button.contact') }}</template>
      </SingleButton>

      <SingleButton @click="toggleLocales">
        <template #buttonName>{{ t('button.set-language') }}</template>
      </SingleButton>
    </div>

    <div class="flex-auto flex flex-col sm:(flex-row flex-wrap) py-8 px-4 gap-8 self-center justify-around">
      <img src="../assets/logo.png " class="self-center max-w-300px">
      <div class="flex flex-col self-center">
        <img src="../assets/name.png " class="max-w-250px">
        <p class="text-3xl text-#FFFFFF ">
          {{ t('intro.description.first') }} <br>
          {{ t('intro.description.second') }} <br>
          {{ t('intro.description.third') }} <br>
          {{ t('intro.description.fourth') }} <br>
          {{ t('intro.description.fifth') }}
        </p>
      </div>
    </div>
    <div class="text-center color-#32B3A3 m-4 justify-end text-2xl">{{ t('intro.slogan') }}</div>
  </div>
</template>