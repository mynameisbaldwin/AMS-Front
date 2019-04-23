<script>
  //Importing Line class from the vue-chartjs wrapper
  //import percentage from '../assets/percentage.json'
  import classes from '../assets/classes.json'
  import { Doughnut } from 'vue-chartjs'
  import axios from "axios"

  //Exporting this so it can be used in other components
  export default {
    extends: Doughnut,
    data () {
      return {
        datacollection: {
        },
        options: {
          title: {
            display: true,
            text: 'Attendance Percentage - All Classes'
          }
        }
        //Chart.js options that controls the appearance of the chart
      }
    },
    async created () {
      var data_sets = [{present: 0, absent: 0, tardy: 0}];
      await axios.get(this.$api + "metrics/percentage",  {
         params: {
          userId: localStorage.userId
        },
         headers: {
           Authorization: "Bearer " + localStorage.token
         }
       })
       .then(function(res){
         for(var i=0; i < res.data.length; i++){
           data_sets[0].present = data_sets[0].present + res.data[i].present;
           data_sets[0].absent = data_sets[0].absent + res.data[i].absent;
           data_sets[0].tardy = data_sets[0].tardy + res.data[i].tardy;
         }
         console.log(res.data);
         console.log(data_sets);         
       })
       .catch(err => console.log(err));
      //renderChart function renders the chart with the datacollection and options object.
      this.datacollection = {
        labels: ['Present', 'Absent', 'Tardy'],
        datasets: [{
          backgroundColor: [
                    '#41B883',
                    '#E46651',
                    'blue'
          ],
        data: [data_sets[0].present, data_sets[0].absent, data_sets[0].tardy]  
        }]
      }
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>