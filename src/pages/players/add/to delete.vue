<script setup lang="ts">

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
          <template #icon>
            <img src="../../../assets/player-icon2.png" class=" h-150px" />
          </template>
          <template #attributes>
            <NewPlayerForm></NewPlayerForm>
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