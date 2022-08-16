<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const { t } = useI18n()
const router = useRouter()

const cancel = () => {
  return router.push('/yourProfile')
}



var profile = {
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthday: new Date(2010, 1, 12),
  nationality: 'Poland',
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <MiniWhiteFrame>
        <template v-slot:icon>
          <img src="../assets/player-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.first-name') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="profile.firstName"
                placeholder="{{profile.firstName}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              />
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.last-name') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="profile.lastName"
                placeholder="{{profile.lastName}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              />
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.birthday-date') }}:</template>
            <template v-slot:inputValue>
              <Datepicker v-model="profile.birthday" format="yyyy-MM-dd" :clearable="false" class="border-1 rounded-none"></Datepicker>
              <!-- <input
                v-model="profile.birthday"
                placeholder="{{profile.birthday.getDay()}}.{{profile.birthday.getMonth()}}.{{profile.birthday.getFullYear()}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              /> -->
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.nationality') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="profile.nationality"
                placeholder="{{profile.nationality}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              />
            </template>
          </SingleInput>
        </template>
        <template v-slot:footer>
          <SingleButton>
            <template v-slot:buttonName>{{ t('button.save') }}</template>
          </SingleButton>
          <SingleButton @click="cancel">
            <template v-slot:buttonName>{{ t('button.cancel') }}</template>
          </SingleButton>
        </template>
      </MiniWhiteFrame>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>