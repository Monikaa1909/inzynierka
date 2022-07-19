<script setup>
const { t } = useI18n()
</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col p-2 sm:(flex-row flex-wrap)">
    <div class="mx-2 flex justify-center">
      <img src="../assets/object-icon2.png" class="h-150px ">
    </div>
    <div class="flex flex-col flex-auto place-content-around">
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-object.name') }}: </p>
        <p class="flex-auto">
          <slot name="name">...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-object.street') }}: </p>
        <p class="flex-auto">
          <slot name="street" >...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-object.postal-code') }}: </p>
        <p class="flex-auto">
          <slot name="postalCode" >...</slot>
        </p>
      </div>
      <div class="bg-green-400/3 flex flex-row">
        <p class="justify-self-start font-medium mr-2">{{ t('single-object.city') }}: </p>
        <p class="flex-auto">
          <slot name="city" >...</slot>
        </p>
      </div>
    </div>
  </div>
</template>
