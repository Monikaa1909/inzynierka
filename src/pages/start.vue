<script setup lang="ts">

const token = useStorage('user:token', '')

</script>

<template>
  <div>
    {{token}}
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
