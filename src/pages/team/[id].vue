<script setup lang="ts">

  defineProps({
    id: String
  })

  const team = {
    name: 'team1',
    years: 'years1',
    trainer: 'trainer1',
    numberOfPlayers: 'players1',
    averageAge: 'average age1'
  }

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        <EditSingleTeam>
          <template v-slot:name>
            <input v-model="team.name" placeholder="{{team.name}}" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg">
          </template>
          <template v-slot:years1>
            <input v-model="team.years" placeholder="{{team.years}}" class="flex max-w-100px border-1 border-#143547 p-1 shadow-lg ">
          </template>
          <template v-slot:years2>
            <input v-model="team.years" placeholder="{{team.years}}" class="flex max-w-100px border-1 border-#143547 p-1 shadow-lg ">
          </template>
          <template v-slot:trainer>
            <input v-model="team.trainer" placeholder="{{team.trainer}}" class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg">
          </template>          
          <template v-slot:numberOfPlayers>
            {{team.numberOfPlayers}}
          </template>
          <template v-slot:averageAge>
            {{team.averageAge}}
          </template>
        </EditSingleTeam>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>