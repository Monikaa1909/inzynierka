<script setup lang="ts">
const { availableLocales, locale } = useI18n()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const parent = ref({
  id: 'rfwefew',
  firstName: 'Jakub',
  lastName: 'Gruszka',
  phoneNumber: '123455432',
  email: 'mdsdoc@wp.pl'
})

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:icon>
              <img src="../../../assets/team-icon2.png" class="h-150px cursor-pointer" />
            </template>
            <template v-slot:attributes>
              <NewParentForm :parentId="parent.id">
              </NewParentForm>
            </template>
          </MiniWhiteFrame>
        </template>
      </MyCenterElement>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>