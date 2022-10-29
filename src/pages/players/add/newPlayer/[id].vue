<script setup lang="ts">
import 'v-calendar/dist/style.css';
const props = defineProps<{ id: string }>()
</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
          <template #icon>
            <img src="../../../../assets/player-icon2.png" class=" h-150px" />
          </template>
          <template #attributes>
            <NewPlayerForm :team-id="props.id"></NewPlayerForm>
          </template>
        </MiniWhiteFrame>
      </MyCenterElement>
    </template>
  </BackgroundFrame>

</template>

<route lang="yaml">
meta:
  layout: home
</route>