<script setup lang="ts">
import type { Team } from 'backend/database/schemas/Team'

const router = useRouter()
const { t } = useI18n()

const props = defineProps<{ id: string }>()

const {
  data: team,
  isFinished,
  isFetching,
  error
} = useFetch(`/api/team/${props.id}`, { initialData: {} }).json<Team>()


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
  await useFetch(`/api/team/${props.id}`).delete()
  return router.go(-1)
}

</script>

<template>
  <BackgroundFrame>
    <template #data>

      <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ team?.teamName }}
        </template>
      </DeletingMesageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyCenterElement v-if="isFinished && !isDeleting && !error && team">
        <MiniWhiteFrame class="px-8">

          <template #nav>
            <button @click="goTeamsPlayers(team?._id)">
              <img src="../../assets/academy-icon.png" class="h-24px" />
            </button>
            <button @click="goEditTeam(team?._id)">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteTeam()">
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
              <template #attributeValue>{{ team.trainer.firstName }} {{ team.trainer.lastName }}</template>
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