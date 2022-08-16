<script setup lang="ts">
const { t } = useI18n()

var profile = {
	firstName: 'Jerzy',
	lastName: 'Brzęczek',
	birthday: new Date(2010, 1, 12),
	nationality: 'Poland',
}

</script>
<template>
	<div
		class="min-w-3/8 min-h-3/5 bg-white frame-shadow flex justify-center items-center content-center"
	>
		<div class="flex flex-col p-2 sm:(flex-row flex-wrap)">
			<div class="mx-2 flex justify-center content-center">
				<img src="../assets/player-icon2.png" class="h-150px" />
			</div>
			<div class="flex flex-col flex-auto place-content-around">
				<div class="bg-green-400/3 flex flex-row">
					<p class="justify-self-start font-medium mr-2">{{ t('single-player.first-name') }}:</p>
					<p class="flex-auto">
						<slot name="firstName">{{ profile.firstName }}</slot>
					</p>
				</div>
				<div class="bg-green-400/3 flex flex-row">
					<p class="justify-self-start font-medium mr-2">{{ t('single-player.last-name') }}:</p>
					<p class="flex-auto">
						<slot name="lastName">{{ profile.lastName }}</slot>
					</p>
				</div>
				<div class="bg-green-400/3 flex flex-row">
					<p class="justify-self-start font-medium mr-2">{{ t('single-player.birthday-date') }}:</p>
					<p class="flex-auto">
						<slot
							name="birthdayDate"
						>{{ profile.birthday.getDay() }}.{{ profile.birthday.getMonth() }}.{{ profile.birthday.getFullYear() }}</slot>
					</p>
				</div>
				<div class="bg-green-400/3 flex flex-row">
					<p class="justify-self-start font-medium mr-2">{{ t('single-player.nationality') }}:</p>
					<p class="flex-auto">
						<slot name="nationality">{{ profile.nationality }}</slot>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
