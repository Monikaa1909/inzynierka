<script setup lang="ts">

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>

       <UserAccount :edit="true"></UserAccount>

      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>