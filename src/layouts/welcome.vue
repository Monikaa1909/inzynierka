<template>
  <div class="h-full flex flex-col sm:(flex-row flex-wrap)">
    <div class="bg-#143547  flex-auto">
      <welcome-menu/>
    </div>
    <div class="bg-balls flex-auto">
      <router-view />
    </div>
  </div>
</template>
