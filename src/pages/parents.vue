<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const parents = [
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    phoneNumber: '123455432',
    email: 'mdsdoc@wp.pl'
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    phoneNumber: '123455432',
    email: 'mdsdoc@wp.pl'
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    phoneNumber: '123455432',
    email: 'mdsdoc@wp.pl'
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    phoneNumber: '123455432',
    email: 'mdsdoc@wp.pl'
  },
  {
    firstName: 'Jakub',
    lastName: 'Gruszka',
    phoneNumber: '123455432',
    email: 'mdsdoc@wp.pl'
  },
]

const goEditParent = (parentId: any) => {
  return router.push(`/player/${parentId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button class="flex flex-row gap-2 items-center">
        <img src="../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-parent')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-3) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="parent in parents" v-bind:key="parent.firstName">
            <template v-slot:nav>
              <button @click="goEditParent(parent.firstName)">
                <img src="../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../assets/parent-icon2.png" class="h-150px" />
            </template>
            <template v-slot:attributes>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-parent.first-name') }}:</template>
                <template v-slot:attributeValue>{{ parent.firstName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-parent.last-name') }}:</template>
                <template v-slot:attributeValue>{{ parent.lastName }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-parent.phone-number') }}:</template>
                <template v-slot:attributeValue>{{ parent.phoneNumber }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-parent.email') }}:</template>
                <template v-slot:attributeValue>{{ parent.email }}</template>
              </SingleAttribute>
            </template>
          </MiniWhiteFrame>
        </template>
      </MyGrid>
    </template>
  </BackgroundFrame>

</template>

<route lang="yaml">
meta:
  layout: home
</route>