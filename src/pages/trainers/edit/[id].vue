<script setup lang="ts">

const props = defineProps<{ id: string }>()

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
          <template #icon>
            <img src="../../../assets/trainer-icon2.png" class="h-150px cursor-pointer" />
          </template>
          <template #attributes>
            <NewTrainerForm :trainer-id="props.id"></NewTrainerForm>
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