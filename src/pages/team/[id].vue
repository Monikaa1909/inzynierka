<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const team = ref({
  name: 'team1',
  startYear: 'years1',
  endYear: 'players1',
  trainer: 'Jerzy'
})

const goEditTeam = (teamId: any) => {
  return router.push(`/team/edit/${teamId}`)
}

const back = () => {
  return router.push(`/teams`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame class="px-8">
            <template v-slot:nav>
              <button @click="goEditTeam(team.name)">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../../assets/team-icon2.png" class="h-150px cursor-pointer" />
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
            <template v-slot:footer>
              <SingleButton @click="back">
                <template v-slot:buttonName>{{ t('button.back') }}</template>
              </SingleButton>
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