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

<!-- BackgroundFrameCenter -->
<!-- <script setup lang="ts">

</script>
<template>
  <div class="bg-#FFFFFF/60 h-full w-full frame-shadow p-4 flex flex-col justify-around place-items-center gap-8 sm:(flex-wrap)">
    <slot></slot>
  </div>
</template> -->

<!-- BackgroundFrameGrid -->
<!-- <script setup lang="ts">

</script>
<template>
  <div class="h-full w-full grid grid-cols-1 gap-4">
    <slot></slot>
  </div>
</template> -->