<script setup>
import { useTrainer } from '../stores/trainer'
import { useParent } from '../stores/parent'

const trainer = useTrainer()
const parent = useParent()
</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        <SingleTeam>
        </SingleTeam>
        <SingleTeam/>
        <SingleTeam/>
        <SingleTeam/>
        <SingleTeam/>
        <SingleTeam/>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
  authorized:
    - trainer
</route>
