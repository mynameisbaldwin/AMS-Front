<template>
<section class="test">
  <div class="container">
      <div class="LineChart">
        <line-chart></line-chart>
      </div>
      <div class="BarChart">
        <bar-chart></bar-chart>
      </div>
      <div class="DoughnutChart">
        <doughnut-chart></doughnut-chart>
      </div>
  </div>
  </section>
</template>

<script>
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import DoughnutChart from './DoughnutChart.vue'


export default {
  name: 'metrics',
  components: { LineChart, BarChart, DoughnutChart },
}
</script>

<style>
  .DoughnutChart {
    height: 500px;
    width: 500px;
  }
</style>