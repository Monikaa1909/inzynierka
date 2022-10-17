<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const teams = ref([
  {
    id: 'idteam1',
    name: 'Młodzik D1',
    startYear: '2011',
    endYear: '2012',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'idteam2',
    name: 'Młodzik D2',
    startYear: '2010',
    endYear: '2011',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'idteam3',
    name: 'Trampkarz C1',
    startYear: '2009',
    endYear: '2010',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'idteam4',
    name: 'Trampkarz C2',
    startYear: '2008',
    endYear: '2009',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'idteam5',
    name: 'Junior Młodszy B1',
    startYear: '2006',
    endYear: '2007',
    trainer: 'Jerzy Brzęczek'
  },
  {
    id: 'idteam6',
    name: 'Junior Młodszy B2',
    startYear: '2007',
    endYear: '2008',
    trainer: 'Jerzy Brzęczek'
  },
])

const goEditTeam = (teamId: any) => {
  return router.push(`/teams/edit/${teamId}`)
}

const goAddTeam = () => {
  return router.push(`/teams/add/newTeam`)
}

function goToTeam(teamId: any) {
  return router.push(`/teams/${teamId}`)
}


</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button @click="goAddTeam" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-team')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-3) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="team in teams" v-bind:key="team.id" class="hover:bg-#E3E3E3" clickable="cursor-pointer" @go-to="goToTeam(team.id)">
            <template v-slot:nav>
              <button @click="goEditTeam(team.id)">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../../assets/team-icon2.png" class="h-150px cursor-pointer"/>
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