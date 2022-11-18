<template>
  <div class="h-full flex w-full flex-col sm:(flex-row flex-wrap)">
    <div class="bg-#143547 flex-auto sm:( w-3/5)">
      <welcome-menu />
    </div>
    <div class="bg-balls flex-auto sm:(w-2/5) px-8px sm:(px-40px) md:(px-80px)">
      <router-view />
    </div>
  </div>
</template>