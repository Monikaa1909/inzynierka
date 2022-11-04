<script setup lang="ts">
import { Player } from 'backend/database/schemas/Player'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const academy = 'AP Jagiellonia Białystok'

const props = defineProps<{ id: string }>()

const urlPlayers = computed(() => {
  if (props.id === 'all')
    return `/api/players//${academy}`
  else
    return `/api/players/team/${props.id}`
})

const {
  data: players,
  isFetching,
  isFinished,
  error,
} = useFetch(urlPlayers.value, { initialData: [] }).json<Player[]>()

const isHidden = ref(true)
const medicalsFilter = ref('all')

const medicalExaminationValidity = computed(() => {
  if (medicalsFilter.value === 'upToDate') {
    if (players.value != null && players.value.length > 0) {
      return players.value.filter(item => new Date(item.validityOfMedicalExaminations) >= new Date())
    }
  }

  else if (medicalsFilter.value === 'outOfDate') {
    if (players.value != null && players.value.length > 0) {
      return players.value.filter(item => new Date(item.validityOfMedicalExaminations) < new Date())
    }
  }

  else if (medicalsFilter.value === 'all') {
    if (players.value != null && players.value.length > 0) {
      return players.value
    }
  }

  else return players.value
})

function goToPlayer(playerId: any) {
  return router.push(`/players/${playerId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>

        <MiniWhiteFrame>
          <template #nav>
            <button @click="isHidden = !isHidden">
              <img src="../../../assets/filter-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../../assets/medical-examinations-icon.png" class="h-150px" />
          </template>

          <template #attributes>
            <LoadingCircle v-if="isFetching"></LoadingCircle>

            <div v-if="!isHidden"
              class="w-full flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
              <button @click="medicalsFilter = 'upToDate'" class="p-1 w-full rounded-xl">
                <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
                  :class="[medicalsFilter === 'upToDate' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                  {{ t('button.up-to-date') }}
                </p>
              </button>
              <button @click="medicalsFilter = 'outOfDate'" class="p-1 w-full rounded-xl">
                <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
                  :class="[medicalsFilter === 'outOfDate' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                  {{ t('button.out-of-date') }}
                </p>
              </button>
              <button @click="medicalsFilter = 'all'" class="p-1 w-full rounded-xl">
                <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-center"
                  :class="[medicalsFilter === 'all' ? 'bg-#2F4D5E text-white' : 'text-gray-700']">
                  {{ t('button.all') }}
                </p>
              </button>
            </div>

            <div v-if="isFinished && !error" class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

              <div class="h-full w-full grid gap-2 px-2">

                <div class="h-full w-full grid  grid-cols-2">
                  <StatisticHeader> {{ t('match-statistic.player') }} </StatisticHeader>
                  <StatisticHeader> {{ t('single-player.validity') }} </StatisticHeader>
                </div>

                <div v-if="players" v-for="player in medicalExaminationValidity" v-bind:key="player._id"
                  class="h-full w-full grid grid-cols-1 md:(grid-cols-2 )">

                  <button @click="goToPlayer(player._id)" class="text-center md:(text-left)">{{ player.lastName }} {{ player.firstName }}</button>
                  <button @click="goToPlayer(player._id)" class="text-center text-red" v-if="new Date(player.validityOfMedicalExaminations) <= new Date()">{{ new Date(player.validityOfMedicalExaminations).toLocaleDateString(locale) }}
                  </button>
                  <button @click="goToPlayer(player._id)" class="text-center" v-else>{{ new Date(player.validityOfMedicalExaminations).toLocaleDateString(locale) }}
                  </button>
                  
                </div>

                <ErrorMessageInfo v-else>
                  {{ t('error-messages.no-players-in-team') }}
                </ErrorMessageInfo>
              </div>

            </div>

          </template>

          <template #footer>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.back') }}</template>
            </SingleButton>
          </template>

        </MiniWhiteFrame>
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>