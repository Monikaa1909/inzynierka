<script setup lang="ts">

</script>
<template>
  <button class="bg-#143547 p-2 text-#FFFFFF flex flex-row justify-center items-center hover:bg-#2F4D5E sm:(px-8)">
    <slot name="icon"></slot>
    <slot name="buttonName">Click me!</slot>
  </button>
</template>
