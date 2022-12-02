<script setup lang="ts">
import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { useJwt } from '@vueuse/integrations/useJwt'

const props = defineProps<{ id: string }>()

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const url = computed(() => {
  if (props.id === 'all')
    return `/api/players`
  else
    return `/api/players/team/${props.id}`
})

whenever(url, (data) => {
  refechPlayers()
})

const {
  data: players,
  isFetching,
  isFinished,
  error,
  execute: refechPlayers
} = useFetch(url, {
  initialData: [], async beforeFetch({ url, options, cancel }) {
    const myToken = token.value
    if (!myToken)
      cancel()

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${myToken}`,
    }

    return {
      options,
    }
  }
}).json<Player[]>()

const today = computed(() => {
  return new Date()
})

const goEditPlayer = (playerId: any) => {
  return router.push(`/players/edit/${playerId}`)
}

const goCheckStatistic = () => {
  return router.push(`/players/statistic/${props.id}`)
}

const goAddPlayer = () => {
  if (props.id != 'all') {
    return router.push(`/players/add/newPlayer/${props.id}`)
  }
  return router.push(`/players/add/newPlayer/all`)
}

function goToPlayer(playerId: any) {
  return router.push(`/players/${playerId}`)
}

function goCheckMedialExamination() {
  return router.push(`/players/medicalExamination/${props.id}`)
}

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
  const { error: deleteError } = await useFetch(`/api/player/${deletingPlayer.value?._id}`, {
    async beforeFetch({ url, options, cancel }) {
      const myToken = token.value
      if (!myToken)
        cancel()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${myToken}`,
      }

      return {
        options,
      }
    }
  }).delete()

  if (deleteError.value) alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
  refechPlayers()
}

const viewType = ref('grid')

const sorting = ref({
  firstName: true,
  lastName: false,
  team: false,
  birthdayDate: false,
})

const sortType = ref('lastNameUp')
const isHidden = ref(true)

const sortedPlayers = computed(() => {
  switch (sortType.value) {
    case 'lastNameUp':
      players.value?.sort((a, b) => a.lastName.localeCompare(b.lastName, locale.value))
      return players.value

    case 'lastNameDown':
      players.value?.sort((a, b) => a.lastName.localeCompare(b.lastName, locale.value))
      return players.value?.reverse()

    case 'firstNameUp':
      players.value?.sort((a, b) => a.firstName.localeCompare(b.firstName, locale.value))
      return players.value

    case 'firstNameDown':
      players.value?.sort((a, b) => a.firstName.localeCompare(b.firstName, locale.value))
      return players.value?.reverse()

    case 'teamNameUp':
      players.value?.sort(function (a: any, b: any) {
        if (a.team.teamName < b.team.teamName) return 1
        else return -1
      })
      return players.value

    case 'teamNameDown':
      players.value?.sort(function (a: any, b: any) {
        if (a.team.teamName < b.team.teamName) return -1
        else return 1
      })
      return players.value

    case 'birthdayDateUp':
      players.value?.sort(function (a: any, b: any) {
        if (a.birthdayDate < b.birthdayDate) return 1
        else return -1
      })
      return players.value

    case 'birthdayDateDown':
      players.value?.sort(function (a: any, b: any) {
        if (a.birthdayDate < b.birthdayDate) return -1
        else return 1
      })
      return players.value


    default:
      return players.value
  }
})

</script>

<template>
  <BackgroundFrame v-if="payload">
    <template #nav>
      <div class=" h-auto w-full flex flex-col items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
        <div class=" h-auto w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
          <button v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'"
            @click="goCheckMedialExamination()" class="flex flex-row gap-2 mr-8 items-center">
            <img src="../../../assets/medical-examinations-icon.png" class="h-48px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{
                t('button.check-medical-examination')
            }}</p>
          </button>

          <button v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'" @click="goCheckStatistic()" class="flex flex-row gap-2 mr-8 items-center">
            <img src="../../../assets/statistic-icon.png" class="h-48px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.check-statistic') }}</p>
          </button>
          <button v-else @click="goCheckStatistic()" class="flex flex-row gap-2 items-center">
            <img src="../../../assets/statistic-icon.png" class="h-48px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.check-statistic') }}</p>
          </button>

          <button v-if="payload.type === 'AcademyManager'" @click="goAddPlayer()"
            class="flex flex-row gap-2 items-center">
            <img src="../../../assets/add-icon2.png" class="h-48px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-player') }}</p>
          </button>
        </div>

        <div class=" h-auto w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
          <button v-if="viewType === 'grid'" @click="viewType = 'list'" class="flex flex-row gap-2 mr-8 items-center">
            <img src="../../../assets/grid-icon.png" class="h-24px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">
              {{ t('button.change-layout') }}</p>
          </button>

          <button v-else-if="viewType === 'list'" @click="viewType = 'grid'"
            class="flex flex-row gap-2 mr-8 items-center">
            <img src="../../../assets/list-icon.png" class="h-24px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">
              {{ t('button.change-layout') }}</p>
          </button>

          <button @click="isHidden = !isHidden" class="flex flex-row gap-2 items-center">
            <img src="../../../assets/filter-icon.png" class="h-24px flex" />
            <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.sort') }}</p>
          </button>
        </div>

        <div v-if="!isHidden" class="w-full flex flex-col bg-white rounded-xl border border-#d9e0e8 justify-center sm:(flex-row)">
          <button v-if="!sorting.lastName" @click="sorting.lastName = !sorting.lastName, sortType = 'lastNameDown'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.last-name') }} ↓
            </p>
          </button>
          <button v-else-if="sorting.lastName" @click="sorting.lastName = !sorting.lastName, sortType = 'lastNameUp'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.last-name') }} ↑
            </p>
          </button>
          <button v-if="!sorting.firstName" @click="sorting.firstName = !sorting.firstName, sortType = 'firstNameDown'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.first-name') }} ↓
            </p>
          </button>
          <button v-else @click="sorting.firstName = !sorting.firstName, sortType = 'firstNameUp'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.first-name') }} ↑
            </p>
          </button>
          <button v-if="!sorting.team" @click="sorting.team = !sorting.team, sortType = 'teamNameDown'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.team') }} ↓
            </p>
          </button>
          <button v-else @click="sorting.team = !sorting.team, sortType = 'teamNameUp'" class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.team') }} ↑
            </p>
          </button>
          <button v-if="!sorting.birthdayDate"
            @click="sorting.birthdayDate = !sorting.birthdayDate, sortType = 'birthdayDateDown'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.birthday-date') }} ↓
            </p>
          </button>
          <button v-else @click="sorting.birthdayDate = !sorting.birthdayDate, sortType = 'birthdayDateUp'"
            class="p-1 w-full rounded-xl">
            <p class=" rounded-xl text-xs hover:(bg-#2F4D5E text-white) py-2 text-gray-700 text-center">
              {{ t('single-player.birthday-date') }} ↑
            </p>
          </button>
        </div>
      </div>
    </template>

    <template #data>

      <DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ deletingPlayer?.firstName }} {{ deletingPlayer?.lastName }}
        </template>
      </DeletingMessageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyGrid v-if="isFinished && !isDeleting && !error && players?.length != 0 && viewType === 'grid'"
        class="lg:(grid-cols-3) md:(grid-cols-2)">
        <MiniWhiteFrame v-for="player in sortedPlayers" :key="player._id" class="hover:bg-#E3E3E3"
          clickable="cursor-pointer" @go-to="goToPlayer(player._id)">

          <template #nav>
            <button @click="goEditPlayer(player._id)"
              v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'">
              <img src="../../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deletePlayer(player)" v-if="payload.type === 'AcademyManager'">
              <img src="../../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../../assets/player-icon2.png" class="h-150px" />
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
              <template #attributeName>{{ t('single-player.team') }}:</template>
              <template #attributeValue>{{ player.team?.teamName ?? '-' }}</template>
            </SingleAttribute>
          </template>
        </MiniWhiteFrame>
      </MyGrid>

      <MyCenterElement v-else-if="isFinished && !isDeleting && !error && players?.length != 0 && viewType === 'list'">
        <MiniWhiteFrame>
          <template #attributes>
            <div class="w-full h-full flex flex-col flex-auto gap-2 place-content-center">

              <div class="h-full w-full grid gap-1 px-2">

                <div class="h-full w-full grid gap-4 invisible md:(visible) grid-cols-4">
                  <p class="text-center text-xs font-medium md:(text-left)"> {{ t('single-player.last-name') }} </p>
                  <p class="text-center text-xs font-medium md:(text-left)"> {{ t('single-player.first-name') }} </p>
                  <p class="text-center text-xs font-medium md:(text-left)"> {{ t('single-player.team') }} </p>
                  <p class="text-center text-xs font-medium md:(text-left)"> {{ t('single-player.birthday-date') }} </p>
                </div>

                <div v-if="players && players.length > 0" v-for="player in sortedPlayers" v-bind:key="player._id"
                  class="h-full w-full grid grid-cols-2 gap-4 md:(grid-cols-4 )">

                  <p class="text-center text-xs font-medium md:(text-left hidden)"> {{ t('single-player.last-name') }}
                  </p>
                  <button @click="goToPlayer(player._id)"
                    class="text-center text-xs overflow-clip md:(text-sm text-left)">{{ player.lastName }}</button>

                  <p class="text-center text-xs font-medium md:(text-left hidden)"> {{ t('single-player.first-name') }}
                  </p>
                  <button @click="goToPlayer(player._id)"
                    class="text-center text-xs overflow-clip md:(text-sm text-left)">{{ player.firstName }}</button>

                  <p class="text-center text-xs font-medium md:(text-left hidden)"> {{ t('single-player.team') }} </p>
                  <button @click="goToPlayer(player._id)"
                    class="text-center text-xs overflow-clip md:(text-sm text-left)">{{ player.team?.teamName
                    }}</button>

                  <p class="text-center text-xs font-medium md:(text-left hidden)"> {{ t('single-player.birthday-date')
                  }} </p>
                  <button @click="goToPlayer(player._id)"
                    class="text-center text-xs overflow-clip md:(text-sm text-left)">{{ new
                        Date(player.birthdayDate).toLocaleDateString(locale)
                    }}</button>

                  <div class="self-center justify-self-center col-span-2 block md:(hidden)">
                    <img src="../../../assets/line-icon.png" class="w-full" />
                  </div>

                </div>

                <ErrorMessageInfo v-else>
                  {{ t('error-messages.no-players') }}
                </ErrorMessageInfo>
              </div>

            </div>
          </template>
        </MiniWhiteFrame>
      </MyCenterElement>


      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && players?.length === 0 && !error">
        {{ t('error-messages.no-data') }}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>

  <GoSignIn v-else></GoSignIn>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

