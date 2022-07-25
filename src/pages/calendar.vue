<script setup lang="ts">

const { t } = useI18n()

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

const startDate = new Date(2022,1,1)

console.log(days[startDate.getDay()])

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
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.monday') }}</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.tuesday') }}</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.wednesday') }}</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.thursday') }}</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.friday') }}</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.saturday') }}</div>
          <div class="flex flex-auto border min-w-full md:(min-w-auto)">{{ t('days-of-week.sunday') }}</div>
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