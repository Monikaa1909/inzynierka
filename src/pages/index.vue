<script setup lang="ts">
import { useLogto } from "@logto/vue"

const { t } = useI18n()

const { signIn } = useLogto()
const doSignIn = () => signIn(`${location.origin}/callback`)
</script>

<template>
  <div class="flex flex-col h-full justify-center p-4">
    <div class="text-center p-4 text-2xl">
      {{ t('intro.start') }}
    </div>
    <a class="bg-#143547 color-#FFFFFF self-center w-300px m-2 p-2 shadow-lg text-center"  @click="doSignIn">
      {{ t('login.sign-in') }}
    </a>
    <p class="bg-#143547 color-#FFFFFF w-300px self-center m-2 p-2 shadow-lg text-center">
      {{ t('login.register') }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: welcome
</route>
