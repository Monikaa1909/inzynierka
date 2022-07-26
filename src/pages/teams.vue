<script setup lang="ts">

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
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        <SingleTeam @edit-team-event="goEditTeam" :team-id="team.name" v-for="team in teams" v-bind:key="team.name">
          <template v-slot:name>
            {{team.name}}
          </template>
          <template v-slot:years>
            {{team.years}} - {{team.years}}
          </template>
          <template v-slot:years2>
            {{team.years}}
          </template>
          <template v-slot:numberOfPlayers>
            {{team.numberOfPlayers}}
          </template>
          <template v-slot:averageAge>
            {{team.averageAge}}
          </template>
        </SingleTeam>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>