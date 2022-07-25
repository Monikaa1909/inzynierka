<script setup lang="ts">
const matches = [
  {
    oponent: 'oponent1',
    date: new Date(1995,11,17)
  },
  {
    oponent: 'oponent2',
    date: new Date(2001,2,1)
  },
]

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <div class="h-full w-full border flex flex-col justify-center place-items-center gap-2">
        <div class="w-full border flex flex-col justify-center place-items-center gap-2 md:(flex-row)">
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad1</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad2</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad3</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad4</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad5</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad6</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">sad7</div>
        </div>
        <div class="w-full border flex flex-col justify-center place-items-center gap-2 md:(flex-row)">
          <div class="flex border">sad9</div>
          <div class="flex border">sad9</div>
          <div class="flex border">sad10</div>
          <div class="flex border">sad11</div>
          <div class="flex border">sad12</div>
          <div class="flex border">sad13</div>
          <div class="flex border">sad14</div>
        </div>
        <div class="w-full border flex flex-col justify-center place-items-center gap-2 md:(flex-row)">
          <div class="flex border">sad15</div>
          <div class="flex border">sad16</div>
          <div class="flex border">sad17</div>
          <div class="flex border">sad18</div>
          <div class="flex border">sad19</div>
          <div class="flex border">sad20</div>
          <div class="flex border">sad21</div>
        </div>

      </div>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>