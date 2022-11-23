<script setup lang="ts">
import { Parent } from 'backend/database/schemas/Parent.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'

const token = useStorage('user:token', '')
const { payload: payloadData } = useJwt(() => token.value ?? '')
const payload = ref({} as JwtPayload)
payload.value = payloadData.value as unknown as JwtPayload

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const props = defineProps<{ id: string }>()

const {
  data: parent,
  isFinished,
  isFetching,
  error
} = useFetch(`/api/parent/${props.id}`, {
  initialData: {}, async beforeFetch({ url, options, cancel }) {
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
}).json<Parent>()

const goEditParent = (parentId: any) => {
  return router.push(`/parents/edit/${parentId}`)
}

const goEditPassword = (parentId: any) => {
  return router.push(`/parents/edit/password/${parentId}`)
}

const isDeleting = ref(false)

const deleteParent = () => {
  isDeleting.value = true
}

const cancelDeleting = () => {
  isDeleting.value = false
}

const confirmDelete = async () => {
  isDeleting.value = false
  const { error: deleteError } = await useFetch(`/api/parent/${props.id}`, {
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
  return router.go(-1)
}
</script>

<template>
  <BackgroundFrame>

    <template #data>

      <DeletingMessageDialog v-if="isDeleting" @cancelDeleting="cancelDeleting" @confirmDelete="confirmDelete">
        <template #deletedItem>
          {{ parent?.firstName }} {{ parent?.lastName }}
        </template>
      </DeletingMessageDialog>

      <LoadingCircle v-else-if="isFetching"></LoadingCircle>

      <MyCenterElement v-if="isFinished && !isDeleting && !error && parent">
        <MiniWhiteFrame>
          <template #nav>
            <button @click="goEditPassword(props.id)" v-if="payload.type === 'AcademyManager'">
              <img src="../../assets/password-icon.png" class="h-24px" />
            </button>
            <button @click="goEditParent(parent?._id)" v-if="payload.type === 'AcademyManager' || payload.type === 'Trainer'">
              <img src="../../assets/edit-icon.png" class="h-24px" />
            </button>
            <button @click="deleteParent()" v-if="payload.type === 'AcademyManager'">
              <img src="../../assets/delete-icon.png" class="h-24px" />
            </button>
          </template>

          <template #icon>
            <img src="../../assets/team-icon2.png" class="h-150px cursor-pointer" />
          </template>

          <template #attributes>
            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.first-name') }}:</template>
              <template #attributeValue>{{ parent?.firstName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.last-name') }}:</template>
              <template #attributeValue>{{ parent?.lastName }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.phone-number') }}:</template>
              <template #attributeValue>{{ parent?.phoneNumber }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.email') }}:</template>
              <template #attributeValue>{{ parent?.email }}</template>
            </SingleAttribute>

            <SingleAttribute>
              <template #attributeName>{{ t('single-parent.remarks') }}:</template>
              <template #attributeValue>{{ parent?.remarks }}</template>
            </SingleAttribute>
          </template>

          <template #footer>
            <SingleButton @click="router.go(-1)">
              <template #buttonName>{{ t('button.back') }}</template>
            </SingleButton>
          </template>
        </MiniWhiteFrame>
      </MyCenterElement>

      <ErrorMessageInfo v-else-if="!isDeleting && isFinished && !parent">
        {{ t('error-messages.no-data') }}
      </ErrorMessageInfo>
      <ErrorMessageInfo v-else-if="!isDeleting && error"></ErrorMessageInfo>
    </template>
  </BackgroundFrame>
</template>

<route lang="yaml">
meta:
  layout: home
</route>