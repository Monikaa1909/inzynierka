<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const trainers = [
  {
    id: 'trainerid1',
    firstName: 'Jerzy',
    lastName: 'Brzęczek',
    birthdayDate: new Date("1999, 8, 12"),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
  {
    id: 'trainerid2',
    firstName: 'Czesław',
    lastName: 'Michniewicz',
    birthdayDate: new Date("1978, 8, 12"),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
  {
    id: 'trainerid3',
    firstName: 'Jan',
    lastName: 'Kowalski',
    birthdayDate: new Date("1978, 8, 12"),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
  {
    id: 'trainerid4',
    firstName: 'Piotr',
    lastName: 'Zając',
    birthdayDate: new Date("1978, 8, 12"),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
]

const goEditTrainer = (trainerId: any) => {
  return router.push(`/trainers/edit/${trainerId}`)
}

const goAddTrainer = () => {
  return router.push(`/trainers/add/newTrainer`)
}


function goToTrainer(trainerId: any) {
  return router.push(`/trainers/${trainerId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button @click="goAddTrainer" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-trainer')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-3) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="trainer in trainers" v-bind:key="trainer.id" class="hover:bg-#E3E3E3"
            clickable="cursor-pointer" @go-to="goToTrainer(trainer.id)">
            <template v-slot:nav>
              <button @click="goEditTrainer(trainer.id)">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../../assets/trainer-icon2.png" class="h-150px" />
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
            </template>
          </MiniWhiteFrame>
        </template>
      </MyGrid>
    </template>
  </BackgroundFrame>

</template>

<route lang="yaml">
meta:
  layout: home
</route>