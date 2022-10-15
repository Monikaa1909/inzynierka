<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const parent = ref({
  id: 'cdsc',
  firstName: 'Jakub',
  lastName: 'Gruszka',
  phoneNumber: '123455432',
  email: 'mdsdoc@wp.pl'
},)

const goEditParent = (parentId: any) => {
  return router.push(`/parents/edit/${parentId}`)
}

const back = () => {
  return router.go(-1)
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:nav>
              <button @click="goEditParent(parent.id)">
                <img src="../../assets/edit-icon.png" class="h-24px" />
              </button>
              <button>
                <img src="../../assets/delete-icon.png" class="h-24px" />
              </button>
            </template>
            <template v-slot:icon>
              <img src="../../assets/team-icon2.png" class="h-150px cursor-pointer" />
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
            <template v-slot:footer>
							<SingleButton @click="back">
								<template v-slot:buttonName>{{ t('button.back') }}</template>
							</SingleButton>
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