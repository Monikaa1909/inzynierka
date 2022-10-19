<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const trainer = ref({
  id: 'trainerid1',
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthdayDate: new Date("1999, 8, 12"),
  nationality: 'Poland',
  academy: 'Biebrza Goniądz',
  phoneNumber: '123644334',
  email: 'jbrzeczek@gmail.com',
  remarks: ''
},)

const goEditTrainer = (trainerId: any) => {
  return router.push(`/trainers/edit/${trainerId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:nav>
              <button @click="goEditTrainer(trainer.id)">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../../assets/trainer-icon2.png" class="h-150px cursor-pointer" />
            </template>
            <template v-slot:attributes>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.first-name') }}:</template>
                <template v-slot:attributeValue>{{ trainer.firstName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.last-name') }}:</template>
                <template v-slot:attributeValue>{{ trainer.lastName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.birthday-date') }}:</template>
                <template v-slot:attributeValue>{{ trainer.birthdayDate.toLocaleDateString(locale) }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.nationality') }}:</template>
                <template v-slot:attributeValue>{{ trainer.nationality }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.phone-number') }}:</template>
                <template v-slot:attributeValue>{{ trainer.phoneNumber }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.email') }}:</template>
                <template v-slot:attributeValue>{{ trainer.email }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-trainer.remarks') }}:</template>
                <template v-slot:attributeValue>{{ trainer.remarks }}</template>
              </SingleAttribute>
            </template>
            <template v-slot:footer>
              <SingleButton @click="router.go(-1)">
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