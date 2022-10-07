<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

const trainer = ref({
  firstName: 'Jerzy',
  lastName: 'Brzęczek',
  birthdayDate: new Date(1999, 8, 12),
  nationality: 'Poland',
  academy: 'Biebrza Goniądz',
  phoneNumber: '123644334',
  email: 'jbrzeczek@gmail.com',
},)

const cancel = () => {
  return router.push('/trainers')
}

</script>

<template>
  <BackgroundFrame>
    <template v-slot:data>
      <MyCenterElement>
        <template v-slot>
          <MiniWhiteFrame>
            <template v-slot:icon>
              <img src="../../../assets/trainer-icon2.png" class="h-150px cursor-pointer" />
            </template>
            <template v-slot:attributes>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-trainer.first-name') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="trainer.firstName" placeholder="{{trainer.firstName}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-trainer.last-name') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="trainer.lastName" placeholder="{{trainer.lastName}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-trainer.birthday-date') }}:</template>
                <template v-slot:inputValue>
                  <DatePicker v-model="trainer.birthdayDate" format="yyyy-MM-dd" :clearable="false"
                    class="inline-block h-full" :locale='locale'>
                    <template v-slot="{ inputValue, togglePopover }">
                      <div class="flex items-center">
                        <button class="p-2 bg-#143547 border border-#143547 hover:bg-#143547-200 text-white"
                          @click="togglePopover()">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current">
                            <path
                              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
                          </svg>
                        </button>
                        <input :value="inputValue"
                          class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border focus:outline-none focus:border-blue-500"
                          readonly />
                      </div>
                    </template>
                  </DatePicker>
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-trainer.nationality') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="trainer.nationality" placeholder="{{trainer.nationality}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-trainer.phone-number') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="trainer.phoneNumber" placeholder="{{trainer.phoneNumber}}"
                    class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
                </template>
              </SingleInput>
              <SingleInput>
                <template v-slot:inputName>{{ t('single-trainer.email') }}:</template>
                <template v-slot:inputValue>
                  <input v-model="trainer.email" placeholder="{{trainer.email}}"
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