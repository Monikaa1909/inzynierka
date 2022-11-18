<script setup lang="ts">

const { t } = useI18n()

</script>

<template>
  <div class="flex flex-col gap-8 h-full justify-center py-10  ">

    <div class="w-full flex flex-row gap-1 flex-wrap">
      <p class="overflow-clip text-xl font-normal">{{t('functions.crew-assistant')}}</p>
      <p class="overflow-clip text-xl">{{t('functions.let-you')}}:</p>
    </div>

    <div class="w-full flex flex-col gap-2">
      <p class="overflow-clip">
        • {{t('functions.function1')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function2')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function3')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function4')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function5')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function6')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function7')}}
      </p>
    </div>

    <div class="w-full flex flex-row gap-1 flex-wrap">
      <p class="overflow-clip text-xl">{{t('functions.thanks-to')}}:</p>
    </div>

    <div class="w-full flex flex-col gap-2">
      <p class="overflow-clip">
        • {{t('functions.function8')}}
      </p>
      <p class="overflow-clip">
        • {{t('functions.function9')}}
      </p>
      <div class="w-full flex flex-row gap-1 flex-wrap">
        <p class="overflow-clip">• {{t('functions.function10')}}</p>
        <p class="overflow-clip font-normal">{{t('functions.function11')}}</p>
      </div>
    </div>

  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
