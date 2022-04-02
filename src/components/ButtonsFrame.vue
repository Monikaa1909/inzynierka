<script setup>

</script>

<template>
  <div class="flex-grow-0 flex-shrink flex-auto flex flex-col m-2 text-xl sm:(flex-row)">
    <slot></slot>
<!--    <div :key="btn.btnType" v-for="btn in buttons" class="flex-grow flex-shrink-1 basis-auto">-->
<!--      <button @click="toggleLocales" class="w-full m-0.5 py-2 font-normal text-#FFFFFF flex flex-row justify-center items-center sm:(py-1)">-->
<!--        <img src="../assets/settings-icon.svg" class="h-24px mr-2">-->
<!--        &lt;!&ndash; TODO [#2]: add <slot /> &ndash;&gt;-->
<!--&lt;!&ndash;        <p>{{btn.btnName}}</p>&ndash;&gt;-->
<!--        <p v-if="btn.btnType === 'Function'"> {{t('button.functions')}} </p>-->
<!--        <p v-else-if="btn.btnType === 'Contact'"> {{t('button.contact')}} </p>-->
<!--        <p v-else-if="btn.btnType === 'Set-language'">{{ t('button.set-language') }}</p>-->
<!--        <p v-else>No name button:(</p>-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>
