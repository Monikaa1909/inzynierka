<script setup lang="ts">

const { t } = useI18n()

</script>

<template>
  <div class="flex flex-col gap-8 h-full justify-center py-10  ">

    <p class="overflow-clip text-xl font-normal">
      {{t('about-us.pb')}}
    </p>

    <div class="w-full flex flex-col gap-2 flex-wrap">
      <p class="overflow-clip text-xl">
        {{t('about-us.questions')}}:
      </p>
      <p class="overflow-clip text-xl font-normal">
        crewassistanthelp@gmail.com.
      </p>
      <p class="overflow-clip text-xl">
        {{t('about-us.answer')}}
      </p>
    </div>

  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
