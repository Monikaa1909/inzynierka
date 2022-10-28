<script setup lang="ts">

const props = defineProps<{ id: string }>()

</script>

<template>
  <BackgroundFrame>
    <template #data>
      <MyCenterElement>
        <MiniWhiteFrame>
          <template #icon>
            <img src="../../../assets/team-icon2.png" class=" h-150px" />
          </template>
          <template #attributes>
            <NewTeamForm :team-id="props.id"></NewTeamForm>
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