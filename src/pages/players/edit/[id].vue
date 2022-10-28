<script setup lang="ts">
const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

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
              <NewPlayerForm :player-id="props.id"></NewPlayerForm>
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