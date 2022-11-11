<script setup lang="ts">
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt(() => token.value ?? '')
</script>

<template>
  <div>
    {{token}}
    {{payload}}
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
