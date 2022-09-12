<script setup lang="ts">
import 'v-calendar/dist/style.css';
import { DatePicker } from 'v-calendar';
const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]


const event = ref({
  type: 'training',
	date: new Date(),
  street: 'Słoneczna 1',
  postalCode: '15-323',
  city: 'Białystok',
})

const cancel = () => { 
	return router.push('/calendar')
}
</script>
    
<template>
	<BackgroundFrame>
		<template v-slot>
			<MiniWhiteFrame>
				<template v-slot:icon>
					<img src="../assets/calendar-icon2.png" class=" h-150px" />
				</template>
				<template v-slot:attributes>
					<SingleInput>
						<template v-slot:inputName>Typ:</template>
						<template v-slot:inputValue>
							<select v-model="event.type"
								class="flex flex-auto w-full border-1 p-1 border-#143547 shadow-lg">
								<option value="training">Trening</option>
								<option value="match">Mecz</option>
								<option value="tournament">Turniej</option>
							</select>
						</template>

					</SingleInput>
					<SingleInput>
						<template v-slot:inputName>Data:</template>
						<template v-slot:inputValue>
							<DatePicker v-model="event.date" mode="dateTime" :timezone="timezone" :clearable="false" 
								class="inline-block h-full min-w-full" :locale="locale">
								<template v-slot="{ inputValue, togglePopover }">
									<div class="flex items-center min-w-200px">
										<button
											class="p-2 bg-#143547 border border-#143547 hover:bg-#143547-200 text-white"
											@click="togglePopover()">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
												class="w-4 h-4 fill-current">
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
						<template v-slot:inputName>{{ t('single-object.postal-code') }}:</template>
						<template v-slot:inputValue>
							<input v-model="event.postalCode" placeholder="{{event.postalCode}}"
								class="flex flex-auto w-full border-1 border-#143547 p-1 shadow-lg" />
						</template>
					</SingleInput>
					<SingleInput>
						<template v-slot:inputName>{{ t('single-object.city') }}:</template>
						<template v-slot:inputValue>
							<input v-model="event.city" placeholder="{{event.city}}"
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
	</BackgroundFrame>
</template>
    
    <route lang="yaml">
    meta:
      layout: home
    </route>