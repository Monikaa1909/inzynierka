<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const players = ref([
  {
    id: 'cdcjf1',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
  {
    id: 'cdcjf2',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
  {
    id: 'cdcjf3',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
  {
    id: 'cdcjf4',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
  {
    id: 'cdcjf5',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
  {
    id: 'cdcjf6',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
  {
    id: 'cdcjf7',
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    remarks: '',
    team: 'Młodzik',
    validityOfMedicalExaminations: new Date(2022, 12, 12),
    parent: "cdsca1"
  },
])

const goEditPlayer = (playerId: any) => {
  return router.push(`/players/edit/${playerId}`)
}

const goAddPlayer = (playerId: any) => {
  return router.push(`/players/add/newPlayer`)
}

function goToPlayer(playerId: any) {
  return router.push(`/players/${playerId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button @click="goAddPlayer" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-player')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-3) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="player in players" v-bind:key="player.id" class="hover:bg-#E3E3E3"
            clickable="cursor-pointer" @go-to="goToPlayer(player.id)">
            <template v-slot:nav>
              <button @click="goEditPlayer(player.id)">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../../assets/player-icon2.png" class="h-150px" />
            </template>
            <template v-slot:attributes>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.first-name') }}:</template>
                <template v-slot:attributeValue>{{ player.firstName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.last-name') }}:</template>
                <template v-slot:attributeValue>{{ player.lastName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.birthday-date') }}:</template>
                <template v-slot:attributeValue>{{ player.birthdayDate.toLocaleDateString(locale) }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.nationality') }}:</template>
                <template v-slot:attributeValue>{{ player.nationality }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.validity-of-medical-examinations-short') }}:</template>
                <template v-slot:attributeValue>{{ player.validityOfMedicalExaminations.toLocaleDateString(locale) }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.team') }}:</template>
                <template v-slot:attributeValue>{{ player.team }}</template>
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