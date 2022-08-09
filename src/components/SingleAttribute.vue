<script setup lang="ts">

</script>
<template>
  <div class="flex flex-row items-center gap-2 flex-wrap sm:(flex-nowrap)">
    <p class="justify-self-start font-medium mr-2">
        <slot name="attributeName"></slot>
    </p>
    <slot name="attributeValue"></slot>
  </div>
</template>
