<script setup lang="ts">

const props = defineProps({
  clickable: { type: String, required: false },
})

</script>
<template>
  <div class="min-h-100px bg-white frame-shadow flex border border-#d9e0e8 flex-col gap-4 p-4">
    <div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
      <slot name="nav"></slot>
    </div>
    <div class="h-full flex flex-col gap-2 justify-center sm:(flex-row flex-wrap)" :class="props.clickable" @click="$emit('goTo', 1)">
      <div class="flex justify-center items-center flex-basis">
        <slot name="icon"></slot>
      </div>
      <div class="flex flex-col gap-2 place-content-center flex-auto">
        <slot name="attributes"></slot>
      </div>
    </div>
    <div class="h-full w-full flex flex-row items-center justify-end gap-2 flex-wrap sm:(flex-nowrap)">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
