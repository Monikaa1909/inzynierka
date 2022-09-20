<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const teams = [
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

const goEditTeam = (teamId: any) => {
  console.log(teamId)
  return router.push(`/team/${teamId}`)
}

</script>

<template>
  <BackgroundFrame class="lg:(grid-cols-3) md:(grid-cols-2)">
    <template v-slot>
      <MiniWhiteFrame v-for="team in teams" v-bind:key="team.name">
        <template v-slot:nav>
          <button @click="goEditTeam(team.name)">
            <img src="../assets/edit-icon.png" class="h-24px" />
          </button>
          <button>
            <img src="../assets/delete-icon.png" class="h-24px" />
          </button>
        </template>
        <template v-slot:icon>
          <img src="../assets/team-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-team.name') }}:</template>
            <template v-slot:attributeValue>{{ team.name }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-team.years') }}:</template>
            <template v-slot:attributeValue>{{ team.years }} - {{ team.years }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-team.number-of-players') }}:</template>
            <template v-slot:attributeValue>{{ team.numberOfPlayers }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-team.the-average-age') }}:</template>
            <template v-slot:attributeValue>{{ team.averageAge }}</template>
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