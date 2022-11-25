<script setup lang="ts">
import { JwtPayload } from 'backend/database/schemas/User'
import { Team } from 'backend/database/schemas/Team'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const router = useRouter()
const { t } = useI18n()

const goEditTeam = (teamId: any) => {
  return router.push(`/teams/edit/${teamId}`)
}

function goToTeam(teamId: any) {
  return router.push(`/teams/${teamId}`)
}

const {
  data: teams,
  isFetching,
  isFinished,
  error,
  execute: refechTeams
} = useFetch(`/api/teams`, { initialData: [],
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
  },
}).json<Team[]>()

whenever(isFinished, (data) => {
  if (data) {
    if (teams.value != null && teams.value.length > 0)
      teams.value.sort((a, b) => {
        if (a.startYear > b.startYear) return 1
        else return -1
      })
  }
})

const isDeleting = ref(false)
const deletingTeam = ref<Team>()

const goTeamsPlayers = (teamId: any) => {
  return router.push(`/players/team/${teamId}`)
}

const deleteTeam = (team: Team) => {
  isDeleting.value = true
  deletingTeam.value = team
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  const { error: deleteError } = await useFetch(`/api/team/${deletingTeam.value?._id}`, {
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
    },
  }).delete()

  if (deleteError.value) alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
  refechTeams()
}

</script>

<template>
  <BackgroundFrame v-if = "payload">

    <template #nav>
      <router-link v-if="payload.type === 'AcademyManager'" to="/teams/add/newTeam"
        class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-team') }}</p>
      </router-link>
    </template>

    <template #data>

      <DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ deletingTeam?.teamName }}
        </template>
      </DeletingMessageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyGrid v-if="isFinished && !isDeleting && !error && teams?.length != 0"
        class="lg:(grid-cols-3) md:(grid-cols-2)">

        <MiniWhiteFrame v-for="team in teams" v-bind:key="team._id" class="hover:bg-#E3E3E3" clickable="cursor-pointer"
          @go-to="goToTeam(team._id)">

          <template #nav>
            <button @click="goTeamsPlayers(team._id)" v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'">
              <img src="../../assets/academy-icon.png" class="h-24px" />
            </button>
            <button @click="goEditTeam(team._id)"
              v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteTeam(team)" v-if="payload.type === 'AcademyManager'">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/team-icon2.png" class="h-150px cursor-pointer" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-team.name') }}:</template>
              <template #attributeValue>{{ team.teamName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-team.years') }}:</template>
              <template #attributeValue>{{ team.startYear }} - {{ team.endYear }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-team.trainer') }}:</template>
              <template #attributeValue>{{ team.trainer?.firstName }} {{ team.trainer?.lastName }}</template>
            </SingleAttribute>
          </template>
        </MiniWhiteFrame>
      </MyGrid>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && teams?.length === 0">
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