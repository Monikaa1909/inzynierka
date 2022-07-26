<script setup lang="ts">
  const { t } = useI18n()

</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-8">
    <div class="h-full w-full flex flex-col gap-2 sm:(flex-row flex-wrap) items-center">
      <div class="flex justify-center">
        <img src="../assets/team-icon2.png" class="h-150px ">
      </div>

      <div class="flex flex-col flex-auto gap-2 place-content-around">
        <div class="flex flex-row items-center gap-2">
          <p class="justify-self-start font-medium">{{ t('single-team.name') }}: </p>
          <slot name="name">...</slot>
        </div>
        <div class="flex flex-row items-center gap-2">
          <p class="justify-self-start font-medium">{{ t('single-team.years') }}: </p>
          <slot name="years1" ></slot>
          <p>-</p>
          <slot name="years2" ></slot>  
        </div>
        <div class="flex flex-row items-center gap-2">
          <p class="justify-self-start font-medium">{{ t('single-team.trainer') }}: </p>
          <slot name="trainer" >...</slot>
        </div>        
        <div class="flex flex-row items-center gap-2">
          <p class="justify-self-start font-medium">{{ t('single-team.number-of-players') }}: </p>
          <slot name="numberOfPlayers" >...</slot>
        </div>
        <div class="flex flex-row items-center gap-2">
          <p class="justify-self-start font-medium">{{ t('single-team.the-average-age') }}: </p>
          <slot name="averageAge" >...</slot>
        </div>
      </div>
    </div>

  </div>
</template>
