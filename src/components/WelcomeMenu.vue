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
          <img src="/settings-icon.svg" class="icon">
          <p> {{ t('button.functions') }} </p>
        </div>
      </button>
      <button class="navButton buttonFont" @click="toggleLocales">
        <div class="centerRow">
          <img src="/settings-icon.svg" class="icon">
          <p> {{ t('button.contact') }} </p>
        </div>
      </button>
      <button class="navButton buttonFont" @click="toggleLocales">
        <div class="centerRow">
          <img src="/settings-icon.svg" class="icon">
          <p>{{ t('button.set-language') }}</p>
        </div>
      </button>
    </div>
    <div id="mainInfo" class="centerRow gap-8">
      <img id="mainLogo" src="/logo.png">
      <div class="centerColumn">
        <img id="mainName" src="/name.png">
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
