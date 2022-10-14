<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const teams = ref([
  {
    id: 'cdsc',
    name: 'team1',
    startYear: 'years1',
    endYear: 'players1',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'cdsc',
    name: 'team1',
    startYear: 'years1',
    endYear: 'players1',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'cdsc',
    name: 'team1',
    startYear: 'years1',
    endYear: 'players1',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'cdsc',
    name: 'team1',
    startYear: 'years1',
    endYear: 'players1',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'cdsc',
    name: 'team1',
    startYear: 'years1',
    endYear: 'players1',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'cdsc',
    name: 'team1',
    startYear: 'years1',
    endYear: 'players1',
    trainer: 'Jerzy Brzęczek'
  },
])

const goEditTeam = (teamId: any) => {
  return router.push(`/team/edit/${teamId}`)
}

const goAddTeam = () => {
  return router.push(`/team/add/newTeam`)
}

function goToTeam(teamId: any) {
  return router.push(`/team/${teamId}`)
}


</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button @click="goAddTeam" class="flex flex-row gap-2 items-center">
        <img src="../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-team')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-3) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="team in teams" v-bind:key="team.id" class="hover:bg-#E3E3E3" clickable="cursor-pointer" @go-to="goToTeam(team.id)">
            <template v-slot:nav>
              <button @click="goEditTeam(team.id)">
                <img src="../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../assets/team-icon2.png" class="h-150px cursor-pointer"/>
            </template>
            <template v-slot:attributes>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-team.name') }}:</template>
                <template v-slot:attributeValue>{{ team.name }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-team.years') }}:</template>
                <template v-slot:attributeValue>{{ team.startYear }} - {{ team.endYear }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-team.trainer') }}:</template>
                <template v-slot:attributeValue>{{ team.trainer }}</template>
              </SingleAttribute>
            </template>
          </MiniWhiteFrame>
        </template>
      </MyGrid>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>