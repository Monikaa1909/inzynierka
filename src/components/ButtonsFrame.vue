<script setup>
const { t, availableLocales, locale } = useI18n()

const buttons = ref([
  { btnType: 'Function', icon: 'settings-icon.svg' },
  { btnType: 'Contact', icon: 'settings-icon.svg' },
  { btnType: 'Set-language', icon: 'settings-icon.svg' }])

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="flex flex-col mt-2 text-xl sm:(flex-row)">
    <div :key="btn.btnType" v-for="btn in buttons" class="flex-grow flex-shrink-1 basis-auto">
      <button @click="toggleLocales" class="w-full m-0.5 py-2 font-normal text-#FFFFFF flex flex-row justify-center items-center sm:(py-1)">
        <img v-bind:src="btn.icon" class="h-24px mr-2">
        <p v-if="btn.btnType === 'Function'"> {{t('button.functions')}} </p>
        <p v-else-if="btn.btnType === 'Contact'"> {{t('button.contact')}} </p>
        <p v-else-if="btn.btnType === 'Set-language'">{{ t('button.set-language') }}</p>
        <p v-else>No name button:(</p>
      </button>
    </div>
  </div>
</template>
