<script setup lang="ts">
import type { Player } from 'backend/database/schemas/Player'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const academy = 'AP Jagiellonia Białystok'

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const today = computed(() => {
  return new Date()
})

const goEditPlayer = (playerId: any) => {
  return router.push(`/players/edit/${playerId}`)
}

function goToPlayer(playerId: any) {
  return router.push(`/players/${playerId}`)
}

const {
  data: players,
  isFetching,
  isFinished,
  error,
  execute: refechPlayers
} = useFetch(`/api/players/${academy}`, { initialData: [] }).json<Player[]>()

const isDeleting = ref(false)
const deletingPlayer = ref<Player>()

const deletePlayer = (player: Player) => {
  isDeleting.value = true
  deletingPlayer.value = player
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  await useFetch(`/api/player/${deletingPlayer.value?._id}`).delete()
  refechPlayers()
}

</script>

<template>
  <BackgroundFrame>

    <template #nav>
      <router-link to="/players/statistic" class="flex flex-row gap-2 mr-8 items-center">
        <img src="../../assets/statistic-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.check-statistic') }}</p>
      </router-link>
      <router-link to="/players/add/newPlayer" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-player') }}</p>
      </router-link>
    </template>

    <template #data>
      
      <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem> 
          {{deletingPlayer?.firstName}} {{deletingPlayer?.lastName}}
        </template>
      </DeletingMesageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyGrid v-if="isFinished && !isDeleting && !error && players?.length != 0" class="lg:(grid-cols-3) md:(grid-cols-2)">
        <MiniWhiteFrame v-for="player in players" :key="player._id" class="hover:bg-#E3E3E3" clickable="cursor-pointer"
          @go-to="goToPlayer(player._id)">

          <template #nav>
            <button @click="goEditPlayer(player._id)">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deletePlayer(player)">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/player-icon2.png" class="h-150px" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-player.first-name') }}:</template>
              <template #attributeValue>{{ player.firstName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.last-name') }}:</template>
              <template #attributeValue>{{ player.lastName }}</template>
            </SingleAttribute>
            <SingleAttribute>
              <template #attributeName>{{ t('single-player.birthday-date') }}:</template>
              <template #attributeValue>{{ new Date(player.birthdayDate).toLocaleDateString(locale) }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.nationality') }}:</template>
              <template #attributeValue>{{ player.nationality }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.validity-of-medical-examinations-short') }}:</template>
              <template #attributeValue>
                <p v-if="new Date(player.validityOfMedicalExaminations) > today">
                  {{ new Date(player.validityOfMedicalExaminations).toLocaleDateString(locale) }}
                </p>
                <p v-else class="text-red">
                  {{ new Date(player.validityOfMedicalExaminations).toLocaleDateString(locale) }}
                </p>
              </template>
            </SingleAttribute>

            <SingleAttribute>
              <template v-slot:attributeName>{{ t('single-player.team') }}:</template>
              <template v-slot:attributeValue>{{ player.team?.teamName ?? 'Brak' }}</template>
            </SingleAttribute>
          </template>
        </MiniWhiteFrame>
      </MyGrid>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && players?.length === 0">
        {{t('error-messages.no-data')}}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

