<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

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

const goEditPlayer = (playerId: any) => {
  return router.push(`/player/${playerId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <MiniWhiteFrame v-for="player in players" v-bind:key="player.name">
        <template v-slot:nav>
          <button @click="goEditPlayer(player.name)">
            <img src="../assets/edit-icon.png" class="h-24px" />
          </button>
          <button>
            <img src="../assets/delete-icon.png" class="h-24px" />
          </button>
        </template>
        <template v-slot:icon>
          <img src="../assets/player-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.first-name') }}:</template>
            <template v-slot:attributeValue>{{ player.name }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.last-name') }}:</template>
            <template v-slot:attributeValue>{{ player.years }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.birthday-date') }}:</template>
            <template v-slot:attributeValue>{{ player.numberOfPlayers }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.nationality') }}:</template>
            <template v-slot:attributeValue>{{ player.averageAge }}</template>
          </SingleAttribute>
        </template>
      </MiniWhiteFrame>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>