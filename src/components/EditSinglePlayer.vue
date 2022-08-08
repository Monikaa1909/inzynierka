<script setup lang="ts">
  const { t } = useI18n()
  const router = useRouter()

  const cancel = () => {
    return router.push('/players')
  }
</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col gap-2 p-8">
    <div class="h-full w-full flex flex-col justify-center gap-4 sm:(flex-row flex-wrap) items-center">
      <div class="flex justify-center">
        <img src="../assets/player-icon2.png" class="h-150px">
      </div>

      <div class="flex flex-col flex-auto gap-2 place-content-around">
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-player.first-name') }}: </p>
          <slot name="firstName">...</slot>
        </div>
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-player.last-name') }}: </p>
          <slot name="lastName" >...</slot>
        </div>        
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-player.birthday-date') }}: </p>
          <slot name="birthdayDate" >...</slot>
        </div>
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-player.nationality') }}: </p>
          <slot name="nationality" >...</slot>
        </div>
      </div>
    </div>
      <div class="flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
        <SingleButton>
          <template v-slot:buttonName>{{t('button.save')}}</template>
        </SingleButton>
        <SingleButton @click="cancel">
          <template v-slot:buttonName>{{t('button.cancel')}}</template>
        </SingleButton>
      </div>  
  </div>
</template>