<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

// const accountType = ref('Academy')
// const accountType = ref('Parent')
const accountType = ref('Trainer')

const trainer = ref({
  id: 'cdsc',
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthdayDate: new Date(1999, 8, 12),
  nationality: 'Poland',
  academy: 'Biebrza Goniądz',
  phoneNumber: '123644334',
  email: 'jbrzeczek@gmail.com',
})
const parent = ref({
  id: 'cdsc',
  firstName: 'Jakub',
  lastName: 'Gruszka',
  phoneNumber: '123455432',
  email: 'mdsdoc@wp.pl'
})
const academy = ref({
  id: 'cdsc',
  name: 'Biebrza Goniądz'
})

const profile = ref({
  id: '',
  name: '',
  firstName: '',
  lastName: '',
  birthdayDate: new Date(),
  nationality: '',
  academy: '',
  phoneNumber: '',
  email: '',
})

if (accountType.value === 'Trainer') {
  profile.value.id = trainer.value.id
  profile.value.firstName = trainer.value.firstName
  profile.value.lastName = trainer.value.lastName
  profile.value.birthdayDate = trainer.value.birthdayDate
  profile.value.nationality = trainer.value.nationality
  profile.value.academy = trainer.value.academy
  profile.value.phoneNumber = trainer.value.phoneNumber
  profile.value.email = trainer.value.email
} else if (accountType.value === 'Parent') {
  profile.value.id = parent.value.id
  profile.value.firstName = parent.value.firstName
  profile.value.lastName = parent.value.lastName
  profile.value.phoneNumber = parent.value.phoneNumber
  profile.value.email = parent.value.email
} else if (accountType.value === 'Academy') {
  profile.value.id = academy.value.id
  profile.value.name = academy.value.name
}

const goEditYourProfile = (userId: any) => {
  return router.push(`/yourProfile/edit`)
}

const back = () => {
  return router.push(`/start`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:nav>
              <button @click="goEditYourProfile">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img v-if="accountType != 'Academy'" src="../../assets/player-icon2.png" class="h-150px" />
              <img v-else src="../../assets/academy-icon.png" class="h-150px" />
            </template>
            <template v-slot:attributes>
              <SingleAttribute v-if="accountType === 'Academy'">
                <template v-slot:attributeName>{{ t('your-profile.name') }}:</template>
                <template v-slot:attributeValue>{{ profile.name }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="accountType != 'Academy'">
                <template v-slot:attributeName>{{ t('your-profile.first-name') }}:</template>
                <template v-slot:attributeValue>{{ profile.firstName }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="accountType != 'Academy'">
                <template v-slot:attributeName>{{ t('your-profile.last-name') }}:</template>
                <template v-slot:attributeValue>{{ profile.lastName }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="accountType === 'Trainer'">
                <template v-slot:attributeName>{{ t('your-profile.birthday-date') }}:</template>
                <template v-slot:attributeValue>{{ profile.birthdayDate.toLocaleDateString(locale)  }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="accountType === 'Trainer'">
                <template v-slot:attributeName>{{ t('your-profile.nationality') }}:</template>
                <template v-slot:attributeValue>{{ profile.nationality }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="accountType != 'Academy'">
                <template v-slot:attributeName>{{ t('your-profile.phone-number') }}:</template>
                <template v-slot:attributeValue>{{ profile.phoneNumber }}</template>
              </SingleAttribute>
              <SingleAttribute v-if="accountType != 'Academy'">
                <template v-slot:attributeName>{{ t('your-profile.email') }}:</template>
                <template v-slot:attributeValue>{{ profile.email }}</template>
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