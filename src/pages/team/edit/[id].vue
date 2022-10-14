<script setup lang="ts">

const team = ref({
  name: 'team1',
  startYear: 'years1',
  endYear: 'players1',
  trainer: 'Jerzy'
})
</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
    <template v-slot>
      <MiniWhiteFrame>
        <template v-slot:icon>
          <img src="../../../assets/team-icon2.png" class=" h-150px" />
        </template>
        <template v-slot:attributes>
          <NewTeamForm :teamId="team.name"></NewTeamForm>
        </template>
      </MiniWhiteFrame>
    </template>
  </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>