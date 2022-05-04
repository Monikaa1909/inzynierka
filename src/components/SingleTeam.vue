<script setup>
const { t } = useI18n()
</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-2 sm:(flex-row flex-wrap)">
    <div class="mx-2 flex justify-center">
      <img src="../assets/team-icon2.png" class="h-150px ">
    </div>
    <div class="flex flex-col flex-auto place-content-around">
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-team.name') }}: </p>
        <p class="flex-auto">
          <slot name="name">...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-team.years') }}: </p>
        <p class="flex-auto">
          <slot years="name" >...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-team.number-of-players') }}: </p>
        <p class="flex-auto">
          <slot name="name" >...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-team.the-average-age') }}: </p>
        <p class="flex-auto">
          <slot name="name" >...</slot>
        </p>
      </div>
    </div>
  </div>
</template>
