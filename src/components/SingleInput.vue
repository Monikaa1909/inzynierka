<script setup lang="ts">

</script>
<template>
  <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
    <p class="justify-self-start font-medium sm:(w-1/2)">
        <slot name="inputName"></slot>
    </p>
    <div class="sm:(w-1/2)">
      <slot name="inputValue"></slot>
    </div>
    
  </div>
</template>
