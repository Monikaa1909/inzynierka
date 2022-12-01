<script setup lang="ts">

</script>
<template>
  <div class="bg-#FFFFFF/60 frame-shadow p-2 h-full w-full flex flex-col gap-2 sm:(p-4)">
    <div class="h-auto w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
      <slot name="nav"></slot>
    </div>
    <slot name="data"></slot>
  </div>
</template>