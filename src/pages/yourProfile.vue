<script setup lang="ts">
import BackgroundFrameCenter from '~/components/BackgroundFrameCenter.vue';
const { t, availableLocales, locale } = useI18n()

const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const goEditYourProfile = (userId: any) => {
  return router.push('/editProfile')
}

var profile = {
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthday: new Date(2010, 1, 12),
  nationality: 'Poland',
}
console.log(locale.value)
const birthdayDate = computed(() => {
  return profile.birthday.toLocaleDateString(locale.value)
})
</script>

<template>
  <BackgroundFrameCenter>
    <template v-slot>
      <MiniWhiteFrame>
        <template v-slot:nav>
          <button @click="goEditYourProfile(profile.firstName)">
            <img src="../assets/edit-icon.png" class="h-24px" />
          </button>
          <button>
            <img src="../assets/delete-icon.png" class="h-24px" />
          </button>
        </template>
        <template v-slot:icon>
          <img src="../assets/player-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.first-name') }}:</template>
            <template v-slot:attributeValue>{{profile.firstName}}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.last-name') }}:</template>
            <template v-slot:attributeValue>{{profile.lastName}}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.birthday-date') }}:</template>
            <template v-slot:attributeValue>{{birthdayDate}}</template>
            <!-- <template v-slot:attributeValue>{{profile.birthday.getDay()}}.{{profile.birthday.getMonth()}}.{{profile.birthday.getFullYear()}}</template> -->
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.nationality') }}:</template>
            <template v-slot:attributeValue>{{profile.nationality}}</template>
          </SingleAttribute>
        </template>
      </MiniWhiteFrame>
    </template>
  </BackgroundFrameCenter>
</template>

<route lang="yaml">
meta:
  layout: home
</route>