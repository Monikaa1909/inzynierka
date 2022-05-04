<script setup>
import { useTrainer } from '../stores/trainer'
import { useParent } from '../stores/parent'

const trainer = useTrainer()
const parent = useParent()

const teams = [
  {
    name: 'team1',
    years: '2014-2015',
    checks: [
      { name: 'check1.1' },
      { name: 'check1.2' },
    ],
  },
  {
    name: 'team2',
    years: '2011-2012',
    checks: [
      { name: 'check2.1' },
      { name: 'check2.2' },
    ],
  },
  {
    name: 'team3',
    years: '2014-2015',
    checks: [
      { name: 'check3.1' },
      { name: 'check3.2' },
    ],
  },
  {
    name: 'team4',
    years: '2011-2012',
    checks: [
      { name: 'check4.1' },
      { name: 'check4.2' },
    ],
  },
]

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        <div v-for="team in teams" v-bind:key="team.name">
          <SingleTeam>
            <template v-slot:name>
              {{team.name}}
            </template>
          </SingleTeam>
        </div>

<!--        <SingleTeam/>-->
<!--        <SingleTeam/>-->
<!--        <SingleTeam/>-->
<!--        <SingleTeam/>-->
<!--        <SingleTeam/>-->
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
  authorized:
    - trainer
</route>
