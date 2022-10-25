<script setup lang="ts">
import 'v-calendar/dist/style.css';
const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
            <template #icon>
              <img src="../../../assets/player-icon2.png" class=" h-150px" />
            </template>
            <template #attributes>
              <NewPlayerForm></NewPlayerForm>
            </template>
          </MiniWhiteFrame>
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>