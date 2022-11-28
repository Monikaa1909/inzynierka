<script setup lang="ts">
import type { Parent } from 'backend/database/schemas/Parent.user';
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload } = useJwt<JwtPayload>(() => token.value ?? '')

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const goEditParent = (parentId: any) => {
  return router.push(`/parents/edit/${parentId}`)
}

const goEditPassword = (parentId: any) => {
  return router.push(`/parents/edit/password/${parentId}`)
}

function goToParent(parentId: any) {
  return router.push(`/parents/${parentId}`)
}

const {
  data: parents,
  isFetching,
  isFinished,
  error,
  execute: refechParents
} = useFetch(`/api/parents`, {
  initialData: [], async beforeFetch({ url, options, cancel }) {
    const myToken = token.value
    if (!myToken)
      cancel()

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${myToken}`,
    }

    return {
      options,
    }
  }
}).json<Parent[]>()

const isDeleting = ref(false)
const deletingParent = ref<Parent>()

const deleteParent = (parent: Parent) => {
  isDeleting.value = true
  deletingParent.value = parent
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  const { error: deleteError } = await useFetch(`/api/parent/${deletingParent.value?._id}`, {
    async beforeFetch({ url, options, cancel }) {
      const myToken = token.value
      if (!myToken)
        cancel()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${myToken}`,
      }

      return {
        options,
      }
    }
  }).delete()
  
  if (deleteError.value) alert(t('error-messages.unknow-error') + ' crewAssistantHelp@gmail.com')
  refechParents()
}

</script>

<template>
  <BackgroundFrame v-if = "payload">

    <template #nav v-if="payload.type === 'AcademyManager'">
      <router-link to="/parents/add/newParent" class="flex flex-row gap-2 items-center">
        <img src="../../assets/add-icon2.png" class="h-48px flex" />
        <p class="h-full flex items-center text-base font-bold color-#464646">{{ t('button.add-parent') }}</p>
      </router-link>
    </template>

    <template #data>
      <DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ deletingParent?.firstName }} {{ deletingParent?.lastName }}
        </template>
      </DeletingMessageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyGrid v-if="isFinished && !isDeleting && !error && parents?.length != 0"
        class="lg:(grid-cols-3) md:(grid-cols-2)">
        <MiniWhiteFrame v-for="parent in parents" v-bind:key="parent._id" class="hover:bg-#E3E3E3"
          clickable="cursor-pointer" @go-to="goToParent(parent._id)">

          <template #nav>
            <button @click="goEditPassword(parent._id)" v-if="payload.type === 'AcademyManager'">
              <img src="../../assets/password-icon.png" class="h-24px" />
            </button>
            <button @click="goEditParent(parent._id)" v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteParent(parent)" v-if="payload.type === 'AcademyManager'">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/parent-icon2.png" class="h-150px" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.first-name') }}:</template>
              <template #attributeValue>{{ parent.firstName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.last-name') }}:</template>
              <template #attributeValue>{{ parent.lastName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.phone-number') }}:</template>
              <template #attributeValue>{{ parent.phoneNumber }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.email') }}:</template>
              <template #attributeValue>{{ parent.email }}</template>
            </SingleAttribute>
          </template>
        </MiniWhiteFrame>
      </MyGrid>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && parents?.length === 0">
        {{ t('error-messages.no-data') }}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>

  <GoSignIn v-else></GoSignIn>
</template>

<route lang="yaml">
meta:
  layout: home
</route>