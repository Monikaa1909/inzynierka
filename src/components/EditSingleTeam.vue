<script setup lang="ts">
  const { t } = useI18n()
  const router = useRouter()

  const cancel = () => {
    return router.push('/teams')
  }
</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-8">
    <div class="h-full w-full flex flex-col justify-center gap-2 sm:(flex-row flex-wrap) items-center">
      <div class="flex justify-center">
        <img src="../assets/team-icon2.png" class="h-150px">
      </div>

      <div class="flex flex-col flex-auto gap-2 place-content-around">
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-team.name') }}: </p>
          <slot name="name">...</slot>
        </div>
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-team.years') }}: </p>
          <div class="flex w-full flex-row items-center gap-2">
              <slot name="years1" ></slot>
              <p>-</p>
              <slot name="years2" ></slot> 
          </div>
        </div>
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-team.trainer') }}: </p>
          <slot name="trainer" >...</slot>
        </div>        
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-team.number-of-players') }}: </p>
          <slot name="numberOfPlayers" >...</slot>
        </div>
        <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
          <p class="w-1/2 justify-self-start font-medium">{{ t('single-team.the-average-age') }}: </p>
          <slot name="averageAge" >...</slot>
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
    </div>

  </div>
</template>
