<template>
  <div class="flex flex-col w-full h-full text-xs welcomeBox sm:(text-lg flex-row)">
    <div class="flex-grow-0 flex-shrink basis-2/4 bg-#143547 flex flex-col">
      <welcome-menu/>
    </div>
    <div class="flex-grow flex-shrink basis-auto bg-balls">
      <router-view />
    </div>
  </div>
</template>
