<script setup lang="ts">
import 'v-calendar/dist/style.css';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const player = ref({
  id: 'dscs',
  firstName: 'Jerzy',
	lastName: 'Brzęczek',
	birthdayDate: new Date(1999, 8, 12),
	nationality: 'Poland',
	remarks: '',
	team: 'Młodzik',
	validityOfMedicalExaminations: new Date(2022, 12, 12),
	parent: "cdsca1"
})

const goEditPlayer = (playerId: any) => {
  return router.push(`/player/edit/${playerId}`)
}

const back = () => {
  return router.push(`/players`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:nav>
              <button @click="goEditPlayer(player.firstName)">
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
                <template v-slot:attributeName>{{ t('single-player.remarks') }}:</template>
                <template v-slot:attributeValue>{{ player.remarks }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-player.validity-of-medical-examinations') }}:</template>
                <template v-slot:attributeValue>{{ player.validityOfMedicalExaminations.toLocaleDateString(locale) }}</template>
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
            <template v-slot:footer>
							<SingleButton @click="back">
								<template v-slot:buttonName>{{ t('button.back') }}</template>
							</SingleButton>
						</template>
          </MiniWhiteFrame>
        </template>
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>