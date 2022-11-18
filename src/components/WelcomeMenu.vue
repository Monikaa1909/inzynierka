<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="h-full w-full flex flex-col p-2">
    <div class="w-full flex flex-col text-xl justify-around sm:(flex-row flex-wrap)">

      <SingleButton @click="router.push('/')">
        <template #buttonName>
          <p class="w-auto truncate">{{ t('button.start') }}</p>
        </template>
      </SingleButton>

      <SingleButton @click="router.push('/functions')">
        <template #buttonName>
          <p class="w-auto truncate">{{ t('button.functions') }}</p>
        </template>
      </SingleButton>

      <SingleButton @click="router.push('/aboutUs')">
        <template #buttonName>
          <p class="w-auto truncate">{{ t('button.contact') }}</p>
        </template>
      </SingleButton>

      <SingleButton @click="toggleLocales">
        <template #buttonName>
          <p class="w-auto truncate">{{ t('button.set-language') }}</p>
        </template>
      </SingleButton>
    </div>


    <div class="w-full flex-auto flex flex-col sm:(flex-row flex-wrap)  py-8 px-4 sm:(px-16) self-center  justify-around">
      
      <img src="../assets/logo.png " class="self-center  flex w-full sm:(w-1/2)">
      
      <div class="flex flex-col self-center w-full  px-8 sm:(w-1/2)">
        <img src="../assets/name.png " class="w-auto flex-auto  flex self-center">

        <div class="flex-auto justify-center w-full self-center sm:(w-full) flex flex-col gap-1 text-#FFFFFF sm:(text-xl) md:(text-2xl)">
          <p class="truncate text-center sm:(text-left)">{{ t('intro.description.first') }}</p>
          <p class="truncate text-center sm:(text-left)">{{ t('intro.description.second') }}</p>
          <p class="truncate text-center sm:(text-left)">{{ t('intro.description.third') }}</p>
          <p class="truncate text-center sm:(text-left)">{{ t('intro.description.fourth') }}</p>
          <p class="truncate text-center sm:(text-left)">{{ t('intro.description.fifth') }}</p>
        </div>
      </div>
    </div>

    <div class="text-center color-#32B3A3 p-4 justify-end w-full">
      <div class="w-full justify-center flex flex-col gap-1 text-xs sm:(flex-row flex-wrap text-xl) md:(text-2xl)">
        <p class=" text-center truncate">{{ t('intro.slogan1') }}</p>
        <p class="text-center truncate">{{ t('intro.slogan2') }}</p>
        <p class="text-center truncate">{{ t('intro.slogan3') }}</p>
        <p class="text-center truncate">{{ t('intro.slogan4') }}</p>
        <p class="text-center truncate">{{ t('intro.slogan5') }}</p>
      </div>
    </div>

  </div>
</template>