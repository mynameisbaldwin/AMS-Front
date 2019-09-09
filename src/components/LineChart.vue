<script>
  //LineChart has the capability to span gaps in data, this simplifies the api request because some 
  //classes will not have sessions while others do
  //Importing Line class from the vue-chartjs wrapper
  import attendance from '../assets/attendance.json'
  import { Line } from 'vue-chartjs'
  import axios from "axios"
  function random_rgba() {
       var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.2' + ')';
  }
  //Exporting this so it can be used in other components
  export default {
    extends: Line,
    datacollection: null,
    data () {
      return {
        datacollection: {
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          title: {
            display: true,
            text: 'Presence Over Time'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      var chart_labels = [];
      var t = attendance[0].data.length;
      var i = attendance.length;
      for(var j=0; j<t; j++){
        chart_labels.push(attendance[0].data[j].date);
      }
      var color;
      var attendance_data =[];
      var container = [];
      for(var j=0; j < i; j++){
        container = [];
        for(var k=0; k < attendance[j].data.length; k++){
          container.push(attendance[j].data[k].present);
        }
        var Label = attendance[j].className;
        color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        color = random_rgba();
        console.log(random_rgba());
        attendance_data.push({
          label: Label,
          spanGaps: true,
          pointBackgroundColor: color,
          borderColor: color,
          backgroundColor: color,
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          data: container
        });
      }
      this.datacollection = {
        labels: chart_labels,
        datasets: attendance_data
      }
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>