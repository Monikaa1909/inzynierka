<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const players = [
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    team: 'Biebrza Goniądz',
    parent: 'Filip Gruszka',
  },
]

const goEditPlayer = (playerId: any) => {
  return router.push(`/player/${playerId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button class="flex flex-row gap-2 items-center">
        <img src="../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-player')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-3) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="player in players" v-bind:key="player.firstName">
            <template v-slot:nav>
              <button @click="goEditPlayer(player.firstName)">
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
                <template v-slot:attributeName>{{ t('single-player.team') }}:</template>
                <template v-slot:attributeValue>{{ player.team }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.parent') }}:</template>
                <template v-slot:attributeValue>{{ player.parent }}</template>
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