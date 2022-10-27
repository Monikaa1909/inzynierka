<script setup lang="ts">
  import { useHandleSignInCallback } from '@logto/vue';
  
  const router = useRouter()
  const { isLoading } = useHandleSignInCallback(() => {
    router.push('/start')
  });
</script>

<template>
  <!-- When it's working in progress -->
  <p v-if="isLoading">Redirecting...</p>
</template>