<script setup lang="ts">import { useLogto } from '@logto/vue';

const { isAuthenticated } = useLogto()
</script>

<template>
  <div>
    {{ isAuthenticated }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
