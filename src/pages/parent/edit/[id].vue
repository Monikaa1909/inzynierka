<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const parent = ref({
  firstName: 'Jakub',
  lastName: 'Gruszka',
  phoneNumber: '123455432',
  email: 'mdsdoc@wp.pl'
})

const cancel = () => {
  return router.push('/parents')
}

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
              <SingleInput>
                <template v-slot:inputName>{{ t('single-parent.first-name') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="parent.firstName" placeholder="{{parent.firstName}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-parent.last-name') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="parent.lastName" placeholder="{{parent.lastName}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-parent.phone-number') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="parent.phoneNumber" placeholder="{{parent.phoneNumber}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-parent.email') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="parent.email" placeholder="{{parent.email}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
            </template>
            <template v-slot:footer>
              <SingleButton>
                <template v-slot:buttonName>{{ t('button.save') }}</template>
              </SingleButton>
              <SingleButton @click="cancel">
                <template v-slot:buttonName>{{ t('button.cancel') }}</template>
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