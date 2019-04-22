<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
  
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: '2018 Sales',
              borderColor: 'rgba(50, 115, 220, 0.5)',
              backgroundColor: 'rgba(50, 115, 220, 0.1)',
              data: [300, 700, 450, 750, 450]
            }, {
              label: '2017 Sales',
              borderColor: 'rgba(255, 56, 96, 0.5)',
              backgroundColor: 'rgba(255, 56, 96, 0.1)',
              data: [600, 550, 750, 250, 700]
            }
          ]
        }
      },
    }
  }
</script>

<style>
  .small {
    max-width: 800px;
    margin:  150px auto;
  }
</style>