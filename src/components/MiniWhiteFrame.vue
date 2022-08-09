<script setup lang="ts">

</script>
<template>
  <div class="min-h-100px min-w-1/4 bg-white frame-shadow flex flex-col gap-4 p-4">
    <div
      class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)"
    >
      <slot name="nav"></slot>
    </div>
    <div class="h-full w-full flex flex-col gap-2 sm:(flex-row flex-wrap)">
      <div class="flex justify-center items-center">
        <slot name="icon"></slot>
      </div>
      <div class="flex flex-col flex-auto gap-2 place-content-around">
        <slot name="attributes"></slot>
      </div>
    </div>
    <div
      class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>
