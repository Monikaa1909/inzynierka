<script setup>
import { useTrainer } from '../stores/trainer'
import { useParent } from '../stores/parent'

const trainer = useTrainer()
const parent = useParent()
</script>

<template>
  <div></div>
</template>

<route lang="yaml">
meta:
  layout: home
  authorized:
    - trainer
</route>
