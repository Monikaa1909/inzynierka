<script setup lang="ts">
import { AcademyManager } from 'backend/database/schemas/AcademyManager.user'
import { Trainer } from 'backend/database/schemas/Trainer.user'
import { Parent } from 'backend/database/schemas/Parent.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Academy } from 'backend/database/schemas/Academy'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const router = useRouter()
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  isHidden.value = true
}

const {
  data: academy,
  error: academyError,
  execute: refechAcademy
} = useFetch(`/api/academy/${payload.value?.academy}`, {
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
}).json<Academy>()

const {
  data: manager,
  error: managerError,
  execute: refechManager
} = useFetch(`/api/manager/${payload.value?.id}`, {
  initialData: {}, immediate: false, async beforeFetch({ url, options, cancel }) {
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
}).json<AcademyManager>()

const {
  data: trainer,
  error: trainerError,
  execute: refechTrainer
} = useFetch(`/api/trainer/${payload.value?.id}`, {
  initialData: {}, immediate: false, async beforeFetch({ url, options, cancel }) {
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
}).json<Trainer>()

const {
  data: parent,
  error: parentError,
  execute: refechParent
} = useFetch(`/api/parent/${payload.value?.id}`, {
  initialData: {}, immediate: false, async beforeFetch({ url, options, cancel }) {
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
}).json<Parent>()

const user = ref({} as AcademyManager | Trainer | Parent)
if (payload.value?.type === 'AcademyManager') refechManager()
else if (payload.value?.type === 'Trainer') refechTrainer()
else if (payload.value?.type === 'Parent') refechParent()

whenever(manager, (data) => {
  user.value = data
  refechAcademy()
})

whenever(trainer, (data) => {
  user.value = data
  refechAcademy()
})

whenever(parent, (data) => {
  user.value = data
  refechAcademy()
})

const error = computed(() => {
  return parentError.value && managerError.value && trainerError.value && academyError.value
})

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

const deleteAcademy = () => {
  isHidden.value = true
  return router.push('/delete')
}

const logout = async () => {
  isHidden.value = true
  token.value = null
  router.push('/')
}

</script>

<template>
  <div class="flex flex-col md:(flex-row justify-between)">

    <router-link to="/start" @click="isHidden = true" class="flex flex-row flex-wrap flex-shrink-0 self-center">
      <img src="../assets/logo.png " class="px-2 py-2 h-80px self-center" />
      <img src="../assets/name.png" class="px-2 h-60px self-center" />
    </router-link>

    <div v-if="payload" class="flex-auto justify-around flex flex-col m-2 md:(flex-row flex-wrap)">

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

      <SingleButton v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'" @click="goParents">
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

    <div v-if="!error && payload" class="flex flex-row self-center flex-shrink-0">
      <div class="px-2 py-0.5 self-center justify-items-center flex flex-col">
        <p class="px-2 justify-items-center text-lg font-medium color-white">{{ user?.firstName }} {{ user?.lastName }}
        </p>

        <div class="flex flex-row">
          <p v-if="payload.type === 'Trainer'" class="px-2 justify-items-center text-base font-medium color-#32B3A3">
            {{ t('account.trainer') }}
          </p>
          <p v-else-if="payload.type === 'AcademyManager'"
            class="px-2 justify-items-center text-base font-medium color-#32B3A3">
            {{ t('account.academy') }}
          </p>
          <p v-else-if="payload.type === 'Parent'"
            class="px-2 justify-items-center text-base font-medium color-#32B3A3">
            {{ t('account.parent') }}
          </p>
          <button @click="settingsMenu">
            <img src="../assets/settings-icon.png" class="px-2 py-0.5 h-24px" />
          </button>
        </div>
        <p class="px-2 justify-items-center text-xs color-white">{{ academy?.academyName }}</p>

        <div>
          <div v-if="payload.type === 'AcademyManager'" id="dropdownNavbar" :class="[isHidden ? 'hidden' : '']"
            class="z-10 bg-white absolute divide-y divide-gray-100 shadow w-44">
            <div>
              <button @click="goYourProfile" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.your-profile') }}
                </p>
              </button>
              <button @click="toggleLocales" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.change-language') }}
                </p>
              </button>
              <button v-if="payload.type === 'AcademyManager'" @click="deleteAcademy()" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.delete-academy') }}
                </p>
              </button>
            </div>
            <button @click="logout" class="p-1 w-full">
              <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('login.log-out') }}</p>
            </button>
          </div>

          <div v-else id="dropdownNavbar" :class="[isHidden ? 'hidden' : '']"
            class="z-10 bg-white absolute divide-y divide-gray-100 shadow w-44  right-15">
            <div>
              <button @click="goYourProfile" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.your-profile') }}
                </p>
              </button>
              <button @click="toggleLocales" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.change-language') }}
                </p>
              </button>
            </div>
            <button @click="logout" class="p-1 w-full">
              <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('login.log-out') }}</p>
            </button>
          </div>
        </div>

      </div>
    </div>

    <div v-else class="flex flex-row self-center flex-shrink-0">
      <div class="px-2 py-0.5 self-center justify-items-center flex flex-col">

        <div class="flex flex-row">
          <button @click="settingsMenu">
            <img src="../assets/settings-icon.png" class="px-2 py-0.5 h-24px" />
          </button>
        </div>

        <div class="place-self-center">
          <div id="dropdownNavbar" :class="[isHidden ? 'hidden' : '']"
            class="z-10 border bg-white absolute divide-y divide-gray-100 shadow w-44 place-self-center right-15 md:(right-7)">
            <div>
              <button @click="toggleLocales" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.change-language') }}
                </p>
              </button>
              <button @click="logout" class="p-1 w-full">
                <p class="px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 text-left">{{ t('button.go-start') }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
