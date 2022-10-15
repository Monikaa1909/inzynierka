<script setup lang="ts">

import 'v-calendar/dist/style.css';
const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const trainer = ref({
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthdayDate: new Date(1999, 8, 12),
  nationality: 'Poland',
  academy: 'Biebrza Goniądz',
  phoneNumber: '123644334',
  email: 'jbrzeczek@gmail.com',
},)

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:icon>
              <img src="../../../assets/trainer-icon2.png" class="h-150px cursor-pointer" />
            </template>
            <template v-slot:attributes>
              <NewTrainerForm :trainer-id="trainer.firstName"></NewTrainerForm>
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