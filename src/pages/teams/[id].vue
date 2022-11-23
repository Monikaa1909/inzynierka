<script setup lang="ts">
import { JwtPayload } from 'backend/database/schemas/User'
import { Team } from 'backend/database/schemas/Team'
import { useJwt } from '@vueuse/integrations/useJwt'

const props = defineProps<{ id: string }>()

const router = useRouter()
const { t } = useI18n()

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const {
  data: team,
  isFinished,
  isFetching,
  error
} = useFetch(`/api/team/${props.id}`, {
  initialData: {}, async beforeFetch({ url, options, cancel }) {
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
}).json<Team>()

const goEditTeam = (teamId: any) => {
  return router.push(`/teams/edit/${teamId}`)
}

const goTeamsPlayers = (teamId: any) => {
  return router.push(`/players/team/${teamId}`)
}

const isDeleting = ref(false)

const deleteTeam = () => {
  isDeleting.value = true
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false

  const { error } = await useFetch(`/api/team/${props.id}`, {
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

  if (error.value) alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')

  return router.go(-1)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>

      <DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ team?.teamName }}
        </template>
      </DeletingMessageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyCenterElement v-if="isFinished && !isDeleting && !error && team">
        <MiniWhiteFrame class="px-8">

          <template #nav>
            <button @click="goTeamsPlayers(team?._id)">
              <img src="../../assets/academy-icon.png" class="h-24px" />
            </button>
            <button @click="goEditTeam(team?._id)"
              v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteTeam()" v-if="payload.type === 'AcademyManager'">
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

          <template #footer>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.back') }}</template>
            </SingleButton>
          </template>
        </MiniWhiteFrame>
      </MyCenterElement>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && !team">
        {{ t('error-messages.no-data') }}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>