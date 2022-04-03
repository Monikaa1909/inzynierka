<template>
  <div class="h-full flex flex-col sm:(flex-row flex-wrap)">
    <div class="bg-#143547 flex-wrap flex-auto">
      <welcome-menu/>
    </div>
    <div class="bg-balls flex-wrap flex-auto">
      <router-view />
    </div>
  </div>
<!--  <div class="flex flex-col w-full min-h-full sm:(flex-row)">-->
<!--    <div class="flex-grow-0 flex-shrink basis-auto bg-#143547 flex flex-col">-->
<!--      <welcome-menu/>-->
<!--    </div>-->
<!--    <div class="flex-grow flex-shrink basis-auto bg-balls flex justify-center items-center">-->
<!--      <router-view />-->
<!--    </div>-->
<!--  </div>-->
</template>
