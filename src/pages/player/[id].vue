<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const player = {
  name: 'imie',
  years: 'xdcs',
  trainer: 'trainer1',
  numberOfPlayers: 'players1',
  averageAge: 'average age1'
}
const cancel = () => {
  return router.push('/players')
}
</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
        <template v-slot:icon>
          <img src="../../assets/player-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.first-name') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="player.name"
                placeholder="{{player.name}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              />
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.last-name') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="player.name"
                placeholder="{{player.name}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              />
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.birthday-date') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="player.trainer"
                placeholder="{{player.trainer}}"
                class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg"
              />
            </template>
          </SingleInput>
          <SingleInput>
            <template v-slot:inputName>{{ t('single-player.nationality') }}:</template>
            <template v-slot:inputValue>
              <input
                v-model="player.trainer"
                placeholder="{{player.trainer}}"
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
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>