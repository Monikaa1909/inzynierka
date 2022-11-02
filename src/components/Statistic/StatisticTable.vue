<script setup lang="ts">

const { t, availableLocales, locale } = useI18n()
const locales = availableLocales
locale.value = locales[(locales.indexOf(locale.value)) % locales.length]

</script>

<template>
  <div class="h-full w-full grid gap-2 px-2">
    <div class="h-full w-full grid  invisible md:(visible)"
      :class="[props.statisticType != 'all' ? 'grid-cols-7' : 'grid-cols-6']">
      <StatisticHeader><template v-slot> {{ t('match-statistic.player')}} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.attendance') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.goals-scored') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.yellow-cards') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.red-cards') }} </template></StatisticHeader>
      <StatisticHeader><template v-slot> {{ t('match-statistic.minutes-played') }} </template></StatisticHeader>
      <StatisticHeader v-if="props.statisticType != 'all'"><template v-slot> {{ t('match-statistic.remarks') }}
        </template></StatisticHeader>
    </div>

    <div v-for="statistic in sortedStatistic" v-bind:key="statistic.id" class="h-full w-full grid grid-cols-2 gap-2 "
      :class="[props.statisticType != 'all' ? 'md:(grid-cols-7 gap-0)' : 'md:(grid-cols-6 gap-0)']">
      <SingleStatistic>
        <template v-slot:name>{{ t('match-statistic.player') }}</template>
        <template v-slot:data>{{statistic.player}}</template>
      </SingleStatistic>
      <SingleStatistic v-if="props.statisticType === 'all'">
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>{{statistic.attendance}}%</template>
      </SingleStatistic>
      <SingleStatistic v-else>
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>
          <div>
            <img v-if="statistic.attendance2" src="../../assets/checkbox-checked-icon.png" class="h-18px" />
            <img v-else src="../../assets/checkbox-unchecked-icon.png" class="h-18px" />
          </div>
        </template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.goals-scored') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.goalsScored}}</template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.yellow-cards') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.yellowCards}}</template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.red-cards') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.redCards}}</template>
      </SingleStatistic>
      <SingleStatistic>
        <template v-slot:name>{{t('match-statistic.minutes-played') }}</template>
        <template v-if="props.statisticType === 'all' || (props.statisticType != 'all' && statistic.attendance2)" v-slot:data>{{statistic.minutesPlayed}}</template>
      </SingleStatistic>
      <SingleStatistic v-if="props.statisticType != 'all'">
        <template v-slot:name>{{t('match-statistic.remarks') }}</template>
        <template v-slot:data>{{statistic.remarks}}</template>
      </SingleStatistic>
      <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
        <img src="../../assets/line-icon.png" class="w-full" />
      </div>
    </div>
    
    <div v-if="props.statisticType === 'all'" class="h-full w-full grid grid-cols-2 gap-2 "
      :class="[props.statisticType != 'all' ? 'md:(grid-cols-7 gap-0)' : 'md:(grid-cols-6 gap-0)']">
      <SingleSummaryStatistic>
        <template v-slot:name></template>
        <template v-slot:data>{{ t('match-statistic.sum')}}</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>78%</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.goals-scored') }}</template>
        <template v-slot:data>34</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.yellow-cards') }}</template>
        <template v-slot:data>7</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.red-cards') }}</template>
        <template v-slot:data>3</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.minutes-played') }}</template>
        <template v-slot:data>1176</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic v-if="props.statisticType != 'all'">
        <template v-slot:name></template>
        <template v-slot:data></template>
      </SingleSummaryStatistic>
      <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
        <img src="../../assets/line-icon.png" class="w-full" />
      </div>
    </div>
    
    <div v-if="props.statisticType === 'all'" class="h-full w-full grid grid-cols-2 gap-2"
      :class="[props.statisticType != 'all' ? 'md:(grid-cols-7 gap-0)' : 'md:(grid-cols-6 gap-0)']">
      <SingleSummaryStatistic>
        <template v-slot:name></template>
        <template class="font-medium" v-slot:data>{{ t('match-statistic.average')}}</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.attendance') }}</template>
        <template v-slot:data>78%</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.goals-scored') }}</template>
        <template v-slot:data>34</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.yellow-cards') }}</template>
        <template v-slot:data>7</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.red-cards') }}</template>
        <template v-slot:data>3</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic>
        <template v-slot:name>{{t('match-statistic.minutes-played') }}</template>
        <template v-slot:data>1176</template>
      </SingleSummaryStatistic>
      <SingleSummaryStatistic v-if="props.statisticType != 'all'">
        <template v-slot:name></template>
        <template v-slot:data></template>
      </SingleSummaryStatistic>
      <div class="self-center justify-self-center col-span-2 block sm:(hidden)">
        <img src="../../assets/line-icon.png" class="w-full" />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

