<script setup lang="ts">

</script>
<template>
  <div class="flex flex-row w-full items-center gap-2 flex-wrap sm:(flex-nowrap)">
    <p class="flex justify-self-start font-medium w-full sm:(w-full)">
        <slot name="inputName"></slot>
    </p>
    <div class="flex w-full sm:(w-full min-w-210px)">
      <slot name="inputValue"></slot>
    </div>
    
  </div>
</template>
