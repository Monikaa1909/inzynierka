<template>
  <div class="flex flex-col w-full h-full welcomeBox sm:(flex-row)">
    <div class="flex-grow-0 flex-shrink basis-768px bg-#143547 flex flex-col">
      <welcome-menu/>
    </div>
    <div class="flex-grow flex-shrink basis-auto bg-balls flex justify-center items-center">
      <router-view />
    </div>
  </div>
</template>
