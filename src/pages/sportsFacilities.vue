<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const sportsFacilities = [
  {
    id: 'cdsc',
    name: 'Stadion Miejski w Białymstoku',
    street: 'Słoneczna',
    houseNumber: 1,
    postalCode: '15-323',
    city: 'Białystok',
  },
  {
    id: 'cdsc',
    name: 'Stadion2',
    street: 'Kwiatowa',
    houseNumber: 13,
    postalCode: '15-323',
    city: 'Białystok',
  },
  {
    id: 'cdsc',
    name: 'Stadion3',
    street: 'Różana',
    houseNumber: 16,
    postalCode: '15-323',
    city: 'Białystok',
  },
  {
    id: 'cdsc',
    name: 'Stadion Miejski w Białymstoku',
    street: 'Kolorowa',
    houseNumber: 1,
    postalCode: '15-323',
    city: 'Białystok',
  },
  {
    id: 'cdsc',
    name: 'Stadion Miejski w Białymstoku',
    street: 'Zielona',
    houseNumber: 5,
    postalCode: '15-323',
    city: 'Białystok',
  }
]

const goEditObject = (sportsFacilityId: any) => {
  return router.push(`/sportsFacility/edit/${sportsFacilityId}`)
}

const goAddNewSportsFacility = () => {
  return router.push(`/sportsFacility/add/newSportsFacility`)
}

function goToObject(sportsFacilityId: any) {
  return router.push(`/sportsFacility/${sportsFacilityId}`)
}
</script>

<template>
  <BackgroundFrame>
    <template v-slot:nav>
      <button @click="goAddNewSportsFacility()" class="flex flex-row gap-2 items-center">
        <img src="../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-object')}}</p>
      </button>
    </template>
    <template v-slot:data>
      <MyGrid class="lg:(grid-cols-2) md:(grid-cols-2)">
        <template v-slot>
          <MiniWhiteFrame v-for="sportsFacility in sportsFacilities" v-bind:key="sportsFacility.id" class="hover:bg-#E3E3E3" clickable="cursor-pointer" @go-to="goToObject(sportsFacility.name)"> 
            <template v-slot:nav>
              <button @click="goEditObject(sportsFacility.id)">
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
                <template v-slot:attributeValue>{{ sportsFacility.name }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-object.street') }}:</template>
                <template v-slot:attributeValue>{{ sportsFacility.street }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-object.number') }}:</template>
                <template v-slot:attributeValue>{{ sportsFacility.houseNumber }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-object.postal-code') }}:</template>
                <template v-slot:attributeValue>{{ sportsFacility.postalCode }}</template>
              </SingleAttribute>
              <SingleAttribute>
                <template v-slot:attributeName>{{ t('single-object.city') }}:</template>
                <template v-slot:attributeValue>{{ sportsFacility.city }}</template>
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