<template>
  <div class="flex flex-col h-full">
    <div class="bg-#143547 flex-initial">
      <nav-menu />
    </div>
    <div class="bg-balls flex-auto py-50px px-100px">
      <router-view />
    </div>
  </div>

  <!-- <main>
    <nav-menu />
    <router-view />
  </main> -->
</template>
