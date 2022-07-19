<script setup lang="ts">
import YourProfile from '~/components/YourProfile.vue';

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full flex flex-col justify-around place-items-center gap-8 sm:(flex-row flex-wrap)">
        
        <YourProfile>
          <template v-slot:firstName>
            
          </template>
          <template v-slot:lastName>
            
          </template>
          <template v-slot:birthdayDate>
            
          </template>
          <template v-slot:nationality>
            
          </template>
        </YourProfile>
      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>