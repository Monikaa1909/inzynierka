<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { Player } from 'backend/database/schemas/Player';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const player = ref({} as Omit<Player, '_id'>)

const {
  data: playerData,
  isFinished
} = useFetch(`/api/player/${props.id}`, { initialData: {} }).json<Player>()

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

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement v-if="isFinished">
        <MiniWhiteFrame>
          <template #nav>
            <button @click="goEditPlayer(props.id)">
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
                <template v-slot:attributeValue>{{ player.birthdayDate }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.nationality') }}:</template>
                <template v-slot:attributeValue>{{ player.nationality }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.validity-of-medical-examinations') }}:</template>
                <template v-slot:attributeValue>
                  <p v-if="new Date(player.validityOfMedicalExaminations) > today">
                    {{ player.validityOfMedicalExaminations }}
                  </p> 
                  <p v-else class="text-red">
                    {{ player.validityOfMedicalExaminations }}
                  </p>
                </template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.team') }}:</template>
                <template v-slot:attributeValue>{{ player.team?.name }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="player?.parent">
                <template v-slot:attributeName>{{ t('single-player.parent') }}:</template>
                <template v-slot:attributeValue>{{ player.parent.firstName }} {{ player.parent.lastName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.remarks') }}:</template>
                <template v-slot:attributeValue>{{ player?.remarks }}</template>
              </SingleAttribute>
            </template>
          <template v-slot:footer>
            <SingleButton @click="router.go(-1)">
              <template v-slot:buttonName>{{ t('button.back') }}</template>
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