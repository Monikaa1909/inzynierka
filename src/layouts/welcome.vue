<template>
  <div class="h-full flex flex-col sm:(flex-row flex-wrap)">
    <div class="bg-#143547 flex-wrap flex-auto">
      <welcome-menu/>
    </div>
    <div class="bg-balls flex-wrap flex-auto">
      <router-view />
    </div>
  </div>
</template>
