<script setup>
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="h-full">
    <div class="buttonFrame">
      <button class="navButton buttonFont" @click="toggleLocales">
        <div class="centerRow">
          <img src="public/settings%20icon.svg" class="icon">
          <p> {{ t('button.functions') }} </p>
        </div>
      </button>
      <button class="navButton buttonFont" @click="toggleLocales">
        <div class="centerRow">
          <img src="public/settings%20icon.svg" class="icon">
          <p> {{ t('button.contact') }} </p>
        </div>
      </button>
      <button class="navButton buttonFont" @click="toggleLocales">
        <div class="centerRow">
          <img src="public/settings%20icon.svg" class="icon">
          <p>{{ t('button.set-language') }}</p>
        </div>
      </button>
    </div>
    <div class="centerRow gap-8" id="mainInfo">
      <img src="public/logo.png" id="mainLogo">
      <div class="centerColumn">
        <img src="public/name.png" id="mainName">
        <div class="info">
          Aplikacja
          wspomagająca
          zarządzanie
          akademią piłkarską
        </div>
      </div>
    </div>
  </div>
</template>
