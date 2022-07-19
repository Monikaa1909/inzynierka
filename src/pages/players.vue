<script setup lang="ts">

const players = [
  {
    name: 'team1',
    years: 'years1',
    numberOfPlayers: 'players1',
    averageAge: 'average age1',
    players: [
      {
        name: 'Leo',
        surname: 'Messi',
      },
    ],
  },
  {
    name: 'team2',
    years: 'years2',
    numberOfPlayers: 'players2',
    averageAge: 'average age2',
  },
  {
    name: 'team3',
    years: 'years3',
    numberOfPlayers: 'players3',
    averageAge: 'average age3',
  },
  {
    name: 'team4',
    years: 'years4',
    numberOfPlayers: 'players4',
    averageAge: 'average age4',
  },
  {
    name: 'team5',
    years: 'years5',
    numberOfPlayers: 'players5',
    averageAge: 'average age5',
  },
  {
    name: 'team6',
    years: 'years6',
    numberOfPlayers: 'players6',
    averageAge: 'average age6',
  },
]

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        <SinglePlayer v-for="player in players" v-bind:key="player.name">
          <template v-slot:firstName>
            {{player.name}}
          </template>
          <template v-slot:lastName>
            {{player.years}}
          </template>
          <template v-slot:birthdayDate>
            {{player.numberOfPlayers}}
          </template>
          <template v-slot:nationality>
            {{player.averageAge}}
          </template>
        </SinglePlayer>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>