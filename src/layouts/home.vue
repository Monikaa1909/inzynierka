<template>
  <div class="flex flex-col h-full w-full">
    <div class="bg-#143547 flex-initial">
      <nav-menu />
    </div>
    <div class="bg-balls flex-auto py-10 px-5 sm:(px-20)">
      <router-view />
    </div>
  </div>

  <!-- <main>
    <nav-menu />
    <router-view />
  </main> -->
</template>
