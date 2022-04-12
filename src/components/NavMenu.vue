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

const goTeams = () => {
  return router.push('/teams')
}

const logout = async() => {
  parent.value.token = null
  academy.value.token = null
  trainer.value.token = null
  return router.push('/login')
}

</script>

<template>
  <div class="flex flex-col md:(flex-row justify-between)">
    <div class="flex flex-row flex-shrink-0 self-center">
      <img src="../assets/logo.png " class="px-2 py-2 h-80px self-center">
      <img src="../assets/name.png" class="px-2 h-60px self-center">
    </div>
    <div class="flex-auto justify-around flex flex-col m-2 md:(flex-row flex-wrap)">
      <SingleButton @click="goTeams">
        <template v-slot:icon><img src="../assets/team-icon.png" class="h-24px mr-2"></template>
        <template v-slot:buttonName>{{t('button.teams')}}</template>
      </SingleButton>
      <SingleButton>
        <template v-slot:icon><img src="../assets/calendar-icon.png" class="h-24px mr-2"></template>
        <template v-slot:buttonName>{{t('button.calendar')}}</template>
      </SingleButton>
      <SingleButton>
        <template v-slot:icon><img src="../assets/object-icon.png" class="h-24px mr-2"></template>
        <template v-slot:buttonName>{{t('button.objects')}}</template>
      </SingleButton>
      <SingleButton>
        <template v-slot:icon><img src="../assets/object-icon.png" class="h-24px mr-2"></template>
        <template v-slot:buttonName>{{t('button.objects')}}</template>
      </SingleButton>
    </div>
    <div class="flex flex-row self-center flex-shrink-0">
      <div class="px-2 py-0.5 self-center justify-items-center flex flex-col">
        <p class="px-2 justify-items-center text-lg font-medium color-white">Jan Kowalski</p>
        <div class="flex flex-row">
          <p class="px-2 justify-items-center text-base font-medium color-#32B3A3">Trener</p>
          <button>
            <img src="../assets/settings-icon.svg" class="px-2 py-0.5 h-24px" >
          </button>
        </div>
      </div>
      <img src="../assets/default-trainer.jpg" alt="Avatar" class="px-2 py-0.5 h-80px w-auto self-center rounded-1/2" >
    </div>
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
