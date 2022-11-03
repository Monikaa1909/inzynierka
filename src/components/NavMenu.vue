<script setup lang="ts">
import { useLogto } from '@logto/vue'

const router = useRouter()

const { signOut } = useLogto()
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  isHidden.value = true
}

const isHidden = ref(true)

const settingsMenu = () => {
  isHidden.value = !isHidden.value
}

const goTeams = () => {
  isHidden.value = true
  return router.push('/teams/all')
}

const goPlayers = () => {
  isHidden.value = true
  return router.push('/players/team/all')
}

const goTrainers = () => {
  isHidden.value = true
  return router.push('/trainers/all')
}

const goCalendar = () => {
  isHidden.value = true
  return router.push('/calendar')
}

const goObjects = () => {
  isHidden.value = true
  return router.push('/sportsFacilities/all')
}

const goParents = () => {
  isHidden.value = true
  return router.push('/parents/all')
}

const goYourProfile = () => {
  isHidden.value = true
  return router.push('/yourProfile/personalData')
}

const logout = async () => {
  isHidden.value = true
  signOut('/')
}

</script>

<template>
  <div class="flex flex-col md:(flex-row justify-between)">

    <router-link to="/start" @click="isHidden = true" class="flex flex-row flex-shrink-0 self-center">
      <img src="../assets/logo.png " class="px-2 py-2 h-80px self-center" />
      <img src="../assets/name.png" class="px-2 h-60px self-center" />
    </router-link>

    <div class="flex-auto justify-around flex flex-col m-2 md:(flex-row flex-wrap)">

      <SingleButton @click="goTeams">
        <template #icon>
          <img src="../assets/team-icon.png" class="h-24px mr-2" />
        </template>
        <template #buttonName>{{ t('button.teams') }}</template>
      </SingleButton>

      <SingleButton @click="goPlayers">
        <template #icon>
          <img src="../assets/player-icon.png" class="h-24px mr-2" />
        </template>
        <template #buttonName>{{ t('button.players') }}</template>
      </SingleButton>
      
      <SingleButton @click="goCalendar">
        <template #icon>
          <img src="../assets/calendar-icon.png" class="h-24px mr-2" />
        </template>
        <template #buttonName>{{ t('button.calendar') }}</template>
      </SingleButton>

      <SingleButton @click="goTrainers">
        <template #icon>
          <img src="../assets/trainer-icon.png" class="h-24px mr-2" />
        </template>
        <template #buttonName>{{ t('button.trainers') }}</template>
      </SingleButton>

      <SingleButton @click="goParents">
        <template #icon>
          <img src="../assets/parent-icon.png" class="h-24px mr-2" />
        </template>
        <template #buttonName>{{ t('button.parents') }}</template>
      </SingleButton>

      <SingleButton @click="goObjects">
        <template #icon>
          <img src="../assets/object-icon.png" class="h-24px mr-2" />
        </template>
        <template #buttonName>{{ t('button.objects') }}</template>
      </SingleButton>
    </div>

    <div class="flex flex-row self-center flex-shrink-0">
      <div class="px-2 py-0.5 self-center justify-items-center flex flex-col">
        <p class="px-2 justify-items-center text-lg font-medium color-white">Jan Kowalski</p>
        <div class="flex flex-row">
          <p
            class="px-2 justify-items-center text-base font-medium color-#32B3A3"
          >{{ t('account.trainer') }}</p>
          <button @click="settingsMenu">
            <img src="../assets/settings-icon.png" class="px-2 py-0.5 h-24px" />
          </button>
        </div>
        <div>
          <div
            id="dropdownNavbar"
            :class="[isHidden ? 'hidden' : '']"
            class="z-10 bg-white absolute divide-y divide-gray-100 shadow w-44"
          >
            <div>
              <button @click="goYourProfile" class="p-1 w-full">
                <p
                  class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left"
                >{{ t('button.your-profile') }}</p>
              </button>
              <button @click="toggleLocales" class="p-1 w-full">
                <p
                  class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left"
                >{{ t('button.change-language') }}</p>
              </button>
            </div>
            <button @click="logout" class="p-1 w-full">
              <p
                class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left"
              >{{ t('login.log-out') }}</p>
            </button>
          </div>
        </div>
      </div>
      <img
        src="../assets/default-trainer.jpg"
        alt="Avatar"
        class="px-2 py-0.5 h-80px w-auto self-center rounded-1/2"
      />
    </div>
  </div>
</template>
