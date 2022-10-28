<script setup lang="ts">
import { SportsFacility } from 'backend/database/schemas/SportsFacility';

const { t } = useI18n()
const router = useRouter()

const academy = 'AP Jagiellonia Białystok'

const goEditObject = (sportsFacilityId: any) => {
  return router.push(`/sportsFacilities/edit/${sportsFacilityId}`)
}

function goToObject(sportsFacilityId: any) {
  return router.push(`/sportsFacilities/${sportsFacilityId}`)
}

const {
  data: sportsFacilities,
  isFetching,
  isFinished,
  error,
  execute: refechSportsFacilities
} = useFetch(`/api/sportsFacilities/${academy}`, { initialData: [] }).json<SportsFacility[]>()

const isDeleting = ref(false)
const deletingSportsFacility = ref<SportsFacility>()

const deleteSportsFacility = (sportsFacility: SportsFacility) => {
  isDeleting.value = true
  deletingSportsFacility.value = sportsFacility
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  await useFetch(`/api/sportsFacility/${deletingSportsFacility.value?._id}`).delete()
  refechSportsFacilities()
}
</script>

<template>
  <BackgroundFrame>

    <template #nav>
      <router-link to="/sportsFacilities/add/newSportsFacility" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-object') }}</p>
      </router-link>
    </template>

    <template #data>

      <DeletingMesageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ deletingSportsFacility?.name }}
        </template>
      </DeletingMesageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyGrid v-if="isFinished && !isDeleting && !error && sportsFacilities?.length != 0"
        class="lg:(grid-cols-2) md:(grid-cols-2)">
        <MiniWhiteFrame v-for="sportsFacility in sportsFacilities" v-bind:key="sportsFacility._id"
          class="hover:bg-#E3E3E3" clickable="cursor-pointer" @go-to="goToObject(sportsFacility._id)">
          
          <template #nav>
            <button @click="goEditObject(sportsFacility._id)">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteSportsFacility(sportsFacility)">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/object-icon2.png" class="h-150px" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-object.name') }}:</template>
              <template v-slot:attributeValue>{{ sportsFacility.name }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.street') }}:</template>
              <template #attributeValue>{{ sportsFacility.street }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.number') }}:</template>
              <template #attributeValue>{{ sportsFacility.houseNumber }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.postal-code') }}:</template>
              <template #attributeValue>{{ sportsFacility.postalCode }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-object.city') }}:</template>
              <template #attributeValue>{{ sportsFacility.city }}</template>
            </SingleAttribute>
          </template>
        </MiniWhiteFrame>
      </MyGrid>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && sportsFacilities?.length === 0">
        {{t('error-messages.no-data')}}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>