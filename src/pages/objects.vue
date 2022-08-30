<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const objects = [
  {
    name: 'Stadion Miejski w Białymstoku',
	  street: 'Słoneczna 1',
	  postalCode: '15-323',
	  city: 'Białystok',
  },
  {
    name: 'Stadion2',
	  street: 'Słoneczna 1',
	  postalCode: '15-323',
	  city: 'Białystok',
  },
  {
    name: 'Stadion3',
	  street: 'Słoneczna 1',
	  postalCode: '15-323',
	  city: 'Białystok',
  },
  {
    name: 'Stadion Miejski w Białymstoku',
	  street: 'Słoneczna 1',
	  postalCode: '15-323',
	  city: 'Białystok',
  },
  {
    name: 'Stadion Miejski w Białymstoku',
	  street: 'Słoneczna 1',
	  postalCode: '15-323',
	  city: 'Białystok',
  },
  {
    name: 'Stadion Miejski w Białymstoku',
	  street: 'Słoneczna 1',
	  postalCode: '15-323',
	  city: 'Białystok',
  },
]

const goEditObject = (objectId: any) => {
  return router.push(`/object/${objectId}`)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot>
      <MiniWhiteFrame class="w-3/7" v-for="object in objects" v-bind:key="object.name">
        <template v-slot:nav>
          <button @click="goEditObject(object.name)">
            <img src="../assets/edit-icon.png" class="h-24px" />
          </button>
          <button>
            <img src="../assets/delete-icon.png" class="h-24px" />
          </button>
        </template>
        <template v-slot:icon>
          <img src="../assets/object-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-object.name') }}:</template>
            <template v-slot:attributeValue>{{ object.name }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-object.street') }}:</template>
            <template v-slot:attributeValue>{{ object.street }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-object.postal-code') }}:</template>
            <template v-slot:attributeValue>{{ object.postalCode }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-object.city') }}:</template>
            <template v-slot:attributeValue>{{ object.city }}</template>
          </SingleAttribute>
        </template>
      </MiniWhiteFrame>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>