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

const player = ref({} as Omit<Player, '_id'>)

const {
  data: playerData,
  isFinished,
  isFetching,
  error
} = useFetch(`/api/player/${props.id}`, {
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
}).json<Player>()

whenever(playerData, (data) => {
  player.value = data
  player.value.birthdayDate = new Date(data.birthdayDate).toLocaleDateString(locale.value)
  player.value.validityOfMedicalExaminations = new Date(data.validityOfMedicalExaminations).toLocaleDateString(locale.value)
})

const today = computed(() => {
  return new Date()
})

const goEditPlayer = (playerId: any) => {
  return router.push(`/players/edit/${playerId}`)
}

const isDeleting = ref(false)

const deletePlayer = () => {
  isDeleting.value = true
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  const { error: deleteError } = await useFetch(`/api/player/${props.id}`, {
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
  return router.go(-1)
}

</script>

<template>
  <BackgroundFrame  v-if="payload">
    <template #data>

      <DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ player.firstName }} {{ player.lastName }}
        </template>
      </DeletingMessageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyCenterElement v-if="isFinished && !isDeleting && !error && player">

        <MiniWhiteFrame>
          <template #nav>
            <button @click="goEditPlayer(props.id)" v-if="payload?.type === 'AcademyManager' || payload?.type === 'Trainer'">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deletePlayer()" v-if="payload?.type === 'AcademyManager'">
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
              <template #attributeValue>{{ player.birthdayDate }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.nationality') }}:</template>
              <template #attributeValue>{{ player.nationality }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.validity-of-medical-examinations') }}:</template>
              <template #attributeValue>
                <p v-if="new Date(player.validityOfMedicalExaminations) > today">
                  {{ player.validityOfMedicalExaminations }}
                </p>
                <p v-else class="text-red">
                  {{ player.validityOfMedicalExaminations }}
                </p>
              </template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.team') }}:</template>
              <template #attributeValue>{{ player.team?.teamName }}</template>
            </SingleAttribute>

            <SingleAttribute v-if="player?.parent">
              <template #attributeName>{{ t('single-player.parent') }}:</template>
              <template #attributeValue>{{ player.parent.firstName }} {{ player.parent.lastName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-player.remarks') }}:</template>
              <template #attributeValue>{{ player?.remarks }}</template>
            </SingleAttribute>
          </template>

          <template #footer>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.back') }}</template>
            </SingleButton>
          </template>
        </MiniWhiteFrame>
      </MyCenterElement>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && !player">
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