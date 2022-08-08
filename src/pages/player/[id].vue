<script setup lang="ts">

  defineProps({
    id: String
  })

  const player = {
    name: 'imie',
    years: 'xdcs',
    trainer: 'trainer1',
    numberOfPlayers: 'players1',
    averageAge: 'average age1'
  }

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        <EditSinglePlayer>
          <template v-slot:firstName>
            <input v-model="player.name" placeholder="{{player.name}}" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg">
          </template>
          <template v-slot:lastName>
            <input v-model="player.years" placeholder="{{player.years}}" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg ">
          </template>
          <template v-slot:birthdayDate>
            <input v-model="player.years" placeholder="{{player.years}}" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg ">
          </template>
          <template v-slot:nationality>
            <input v-model="player.trainer" placeholder="{{player.trainer}}" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg">
          </template>          
        </EditSinglePlayer>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>