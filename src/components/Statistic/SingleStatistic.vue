<script setup lang="ts">

</script>

<template>
  <div class="self-center justify-self-center font-medium text-xs block md:(hidden)">
    <slot name="name"></slot>
  </div>
  <div class="self-center justify-self-center col-span-1 text-xs md:()">
    <slot name="data">
    </slot>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

