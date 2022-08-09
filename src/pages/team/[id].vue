<script setup lang="ts">
const { t } = useI18n()

defineProps({
  id: String
})

const team = {
  name: 'team1',
  years: 'years1',
  trainer: 'trainer1',
  numberOfPlayers: 'players1',
  averageAge: 'average age1'
}
const router = useRouter()

const cancel = () => {
  return router.push('/teams')
}
</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div
        class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)"
      >
        <MiniWhiteFrame>
          <template v-slot:icon>
            <img src="/workspace/inzynierka/src/assets/team-icon2.png" class="h-150px" />
          </template>
          <template v-slot:attributes>
            <SingleInput>
              <template v-slot:inputName>{{ t('single-team.name') }}:</template>
              <template v-slot:inputValue>
                <input
                  v-model="team.name"
                  placeholder="{{team.name}}"
                  class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
                />
              </template>
            </SingleInput>
            <SingleInput>
              <template v-slot:inputName>{{ t('single-team.years') }}:</template>
              <template v-slot:inputValue>
                <div class="flex w-full flex-row items-center gap-2">
                  <input
                    v-model="team.years"
                    placeholder="{{team.years}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
                  />
                  <p>-</p>
                  <input
                    v-model="team.years"
                    placeholder="{{team.years}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
                  />
                </div>
              </template>
            </SingleInput>
            <SingleInput>
              <template v-slot:inputName>{{ t('single-team.trainer') }}:</template>
              <template v-slot:inputValue>
                <input
                  v-model="team.trainer"
                  placeholder="{{team.trainer}}"
                  class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
                />
              </template>
            </SingleInput>
            <SingleInput>
              <template v-slot:inputName>{{ t('single-team.number-of-players') }}:</template>
              <template v-slot:inputValue>{{ team.numberOfPlayers }}</template>
            </SingleInput>
            <SingleInput>
              <template v-slot:inputName>{{ t('single-team.the-average-age') }}:</template>
              <template v-slot:inputValue>{{ team.averageAge }}</template>
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
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>