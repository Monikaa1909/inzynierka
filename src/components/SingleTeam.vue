<script setup lang="ts">
  const { t } = useI18n()

  defineProps({
    teamId: String
  })

</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-4">
    <div class="h-full w-full flex flex-row justify-end gap-2">
      <button @click="$emit('editTeamEvent', teamId)" >
        <img src="../assets/edit-icon.png" class="h-24px">
      </button>
      <button>
        <img src="../assets/delete-icon.png" class="h-24px">
      </button>
    </div>
    <div class="h-full w-full flex flex-col gap-2 sm:(flex-row flex-wrap)">
      <div class="flex justify-center">
        <img src="../assets/team-icon2.png" class="h-150px ">
      </div>
      <div class="flex flex-col flex-auto place-content-around">
        <div class="flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-team.name') }}: </p>
          <slot name="name">...</slot>
        </div>
        <div class="flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-team.years') }}: </p>
          <slot name="years" >...</slot>
        </div>
        <div class="flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-team.number-of-players') }}: </p>
          <slot name="numberOfPlayers" >...</slot>
        </div>
        <div class="flex flex-row">
          <p class="justify-self-start font-medium mr-2">{{ t('single-team.the-average-age') }}: </p>
          <slot name="averageAge" >...</slot>
        </div>
      </div>
    </div>
  </div>
</template>
