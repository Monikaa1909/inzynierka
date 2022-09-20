<script setup lang="ts">
const { t } = useI18n()
// const router = useRouter()

const myMatches = [
  {
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Biebrza Goniądz',
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    goalsConceded: 1,
    goalsScored: 3,
    opponent: 'BVB',
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility2'
  },
  {
    goalsConceded: 2,
    goalsScored: 0,
    opponent: 'Promień Mońki',
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
]
const myTrainings = [
  {
    date: new Date(2022, 8, 12),
    team: 'team1',
    sportFaciility: 'facility1'
  },
  {
    date: new Date(2022, 8, 13),
    team: 'team2',
    sportFaciility: 'facility1'
  }
]
const myTournaments = [
  {
    name: 'Tymbark',
    startDate: new Date(2022, 8, 12),
    endDate: new Date(2022, 8, 15),
    team: 'team1',
    sportFaciility: 'facility1'
  },
]

interface Match {
  goalsConceded: number,
  goalsScored: number,
  opponent: string,
  date: Date,
  team: string,
  sportFaciility: string
}
const matches = ref<Array<Match>>([])
for (let match of myMatches) {
  matches.value.push(match)
}

interface Tournament {
  name: String,
  startDate: Date,
  endDate: Date,
  team: string,
  sportFaciility: string
}
const tournaments = ref<Array<Tournament>>([])
for (let tournament of myTournaments) {
  tournaments.value.push(tournament)
}

interface Training {
  date: Date,
  team: string,
  sportFaciility: string
}
const trainings = ref<Array<Training>>([])
for (let training of myTrainings) {
  trainings.value.push(training)
}

const events = ref<Array<any>>([])
for (let tournament of tournaments.value) {
  const event = {
    type: 'Tournament',
    dates: { start: tournament.startDate, end: tournament.endDate },
  }
  events.value.push(event)
}


</script>

<template>
  <BackgroundFrameCenter>
    <template v-slot>
      <MiniWhiteFrame v-for="event in events" v-bind:key="event.type">
        <template v-slot:nav>
          <button @click="goEditPlayer(event.type)">
            <img src="../../assets/edit-icon.png" class="h-24px" />
          </button>
          <button>
            <img src="../../assets/delete-icon.png" class="h-24px" />
          </button>
        </template>
        <template v-slot:icon>
          <img src="../../assets/player-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.first-name') }}:</template>
            <template v-slot:attributeValue>{{ event.type }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.last-name') }}:</template>
            <template v-slot:attributeValue>{{ event.dates.start }}</template>
          </SingleAttribute>
        </template>
      </MiniWhiteFrame>
      <MiniWhiteFrame v-for="event in events" v-bind:key="event.type">
        <template v-slot:nav>
          <button @click="goEditPlayer(event.type)">
            <img src="../../assets/edit-icon.png" class="h-24px" />
          </button>
          <button>
            <img src="../../assets/delete-icon.png" class="h-24px" />
          </button>
        </template>
        <template v-slot:icon>
          <img src="../../assets/player-icon2.png" class="h-150px" />
        </template>
        <template v-slot:attributes>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.first-name') }}:</template>
            <template v-slot:attributeValue>{{ event.type }}</template>
          </SingleAttribute>
          <SingleAttribute>
            <template v-slot:attributeName>{{ t('single-player.last-name') }}:</template>
            <template v-slot:attributeValue>{{ event.dates.start }}</template>
          </SingleAttribute>
        </template>
      </MiniWhiteFrame>
    </template>
  </BackgroundFrameCenter>
</template>

<route lang="yaml">
meta:
  layout: home
</route>