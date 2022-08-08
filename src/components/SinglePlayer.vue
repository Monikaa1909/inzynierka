<script setup lang="ts">
  const { t } = useI18n()

  defineProps({
    playerId: String
  })

</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-2 sm:(flex-row flex-wrap)">
    <div class="h-full w-full flex flex-row justify-end gap-2">
      <button @click="$emit('editPlayerEvent', playerId)" >
        <img src="../assets/edit-icon.png" class="h-24px">
      </button>
      <button>
        <img src="../assets/delete-icon.png" class="h-24px">
      </button>
    </div>
    <div class="h-full w-full flex flex-col gap-2 sm:(flex-row flex-wrap)">
      <div class="flex justify-center">
        <img src="../assets/player-icon2.png" class="h-150px ">
      </div>
      <div class="flex flex-col flex-auto place-content-around">
        <div class="flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-player.first-name') }}: </p>
          <slot name="firstName">...</slot>
        </div>
        <div class="flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-player.last-name') }}: </p>
          <slot name="lastName" >...</slot>
        </div>
        <div class="bg-green-400/3 flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-player.birthday-date') }}: </p>
          <slot name="birthdayDate" >...</slot>
        </div>
        <div class="bg-green-400/3 flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-player.nationality') }}: </p>
          <slot name="nationality" >...</slot>
        </div>
      </div>
    </div>
  </div>
</template>
