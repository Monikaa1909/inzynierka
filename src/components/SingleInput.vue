<script setup lang="ts">
</script>
<template>
  <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
    <p class="flex justify-self-start font-medium flex-auto">
        <slot name="inputName"></slot>
    </p>
    <div class="flex w-full flex-col sm:(w-210px)">
      <slot name="inputValue"></slot>
      <slot name="errorMessage"></slot>
    </div>
  </div>
</template>