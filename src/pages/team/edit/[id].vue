<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const team = ref({
  name: 'team1',
  startYear: 'years1',
  endYear: 'players1',
  trainer: 'Jerzy'
})

const trainers = [
{
    firstName: 'Jerzy',
    lastName: 'Brzęczek',
    birthdayDate: new Date(1999, 8, 12),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
  {
    firstName: 'Czesław',
    lastName: 'Michniewicz',
    birthdayDate: new Date(1978, 8, 12),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    birthdayDate: new Date(1978, 8, 12),
    nationality: 'Poland',
    academy: 'Biebrza Goniądz',
    phoneNumber: '123644334',
    email: 'jbrzeczek@gmail.com',
  },
]

const cancel = () => {
  return router.push('/teams')
}
</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
    <template v-slot>
      <MiniWhiteFrame>
        <template v-slot:icon>
          <img src="../../../assets/team-icon2.png" class=" h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-team.name') }}:</template>
            <template v-slot:inputValue>
              <input v-model="team.name" placeholder="{{team.name}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-team.years') }}:</template>
            <template v-slot:inputValue>
              <div class="flex w-full flex-row items-center gap-2">
                <input v-model="team.startYear" placeholder="{{team.startYear}}"
                  class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                <p>-</p>
                <input v-model="team.endYear" placeholder="{{team.endYear}}"
                  class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
              </div>
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-team.trainer') }}:</template>
            <template v-slot:inputValue>
              <select class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" v-model="team.trainer">
                <option v-for="trainer in trainers" :value="trainer.firstName">{{trainer.firstName}} {{trainer.lastName}}</option>
              </select>
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
  </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>