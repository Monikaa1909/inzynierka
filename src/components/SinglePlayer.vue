<script setup lang="ts">
  const { t } = useI18n()
</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-2 sm:(flex-row flex-wrap)">
    <div class="mx-2 flex justify-center">
      <img src="../assets/player-icon2.png" class="h-150px ">
    </div>
    <div class="flex flex-col flex-auto place-content-around">
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-player.first-name') }}: </p>
        <p class="flex-auto">
          <slot name="firstName">...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-player.last-name') }}: </p>
        <p class="flex-auto">
          <slot name="lastName" >...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-player.birthday-date') }}: </p>
        <p class="flex-auto">
          <slot name="birthdayDate" >...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-player.nationality') }}: </p>
        <p class="flex-auto">
          <slot name="nationality" >...</slot>
        </p>
      </div>
    </div>
  </div>
</template>
