<template>
<section class="test">
  <div class="container">
      <div class="LineChart">
        <line-chart></line-chart>
      </div>
      <div class="BarChart">
        <bar-chart></bar-chart>
      </div>
      <div class="BubbleChart">
        <bubble-chart></bubble-chart>
      </div>
  </div>
  </section>
</template>

<script>
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import BubbleChart from './BubbleChart.vue'


export default {
  name: 'metrics',
  components: { LineChart, BarChart, BubbleChart },
}
</script>