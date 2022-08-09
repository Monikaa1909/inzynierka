<script setup lang="ts">

</script>
<template>
  <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
    <p class="w-1/2 justify-self-start font-medium">
        <slot name="inputName"></slot>
    </p>
    <slot name="inputValue"></slot>
  </div>
</template>
