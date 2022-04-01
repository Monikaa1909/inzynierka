<script setup>
import { useTrainer } from '~/stores/trainer'
import { useParent } from '~/stores/parent'
import { useAcademy } from '~/stores/academy'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const trainer = useTrainer()
const parent = useParent()
const academy = useAcademy()

const router = useRouter()

const logout = async() => {
  parent.value.token = null
  academy.value.token = null
  trainer.value.token = null
  return router.push('/login')
}

</script>

<template>
  <div class="flex flex-col sm:(flex-row)">
    <div class="flex-grow-0 flex-shrink basis-auto flex flex-row self-center">
      <img src="../assets/logo.png " class="px-2 py-2 flex-grow-0 flex-shrink basis-auto h-80px w-auto self-center">
      <img src="../assets/name.png" class="px-2 flex-grow-0 flex-shrink basis-auto h-60px self-center">
    </div>
    <ButtonsFrame>
      <SingleButton>
        <template v-slot:icon><img src="../assets/team-icon.png" class="h-24px mr-2"></template>
        <template v-slot:buttonName>{{t('button.teams')}}</template>
      </SingleButton>
      <SingleButton>
        <template v-slot:icon><img src="../assets/calendar-icon.png" class="h-24px mr-2"></template>
        <template v-slot:buttonName>{{t('button.calendar')}}</template>
      </SingleButton>
    </ButtonsFrame>
  </div>
<!--    <div class="container mx-auto flex">-->
<!--      <div class="ml-auto"></div>-->
<!--      <router-link v-if="!trainer.token && !parent.token && !academy.token" to="/login">-->
<!--        Zaloguj-->
<!--      </router-link>-->
<!--      <router-link v-else @click="logout" to="/login">-->
<!--        Wyloguj-->
<!--      </router-link>-->
<!--    </div>-->
<!--    <p v-if="trainer.token">Konto trenera</p>-->
<!--    <p v-else-if="parent.token">Konto rodzica</p>-->
<!--    <p v-else-if="academy.token">Konto akademii</p>-->
</template>
