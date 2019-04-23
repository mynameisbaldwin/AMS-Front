<script>
//Importing Bar class from the vue-chartjs wrapper
import { Bar } from "vue-chartjs";
import axios from "axios";
//Exporting this so it can be used in other components
export default {
  extends: Bar,
  datacollection: null,
  data() {
    return {
      datacollection: {},
      //Chart.js options that controls the appearance of the chart
      options: {
        title: {
          display: true,
          text: "Attendance Counts By Class"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false,
        classes: []
      }
    };
  },
  async created() {
    let self = this;
    //reset these values to prevent duplicate data from rendering
    this.datacollection.labels = [];
    this.datacollection.datasets = [];
    var container = [];
    var data_sets = [];
    var constructed_labels = [];
    await axios
      .get(this.$api + "classes", {
        params: {
          userId: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => (this.classes = res.data))
      .catch(err => console.log(err));

    await axios
      .get(this.$api + "metrics/percentage", {
        params: {
          userId: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
          container.push(res.data[i]);
        }
        for (var i = 0; i < res.data.length; i++) {
          var temp = [];
          temp.push(res.data[i].present);
          temp.push(res.data[i].tardy);
          temp.push(res.data[i].absent);
          var color =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
          let course = self.classes.filter(
            cls => cls.id == res.data[i].classId
          )[0];
          data_sets.push({
            label: "(" + res.data[i].classId + ") " + course.courseName,
            backgroundColor: color,
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: temp
          });
        }
        constructed_labels.push("present");
        constructed_labels.push("tardy");
        constructed_labels.push("absent");
      })
      .catch(err => console.log(err));

    this.datacollection = {
      labels: constructed_labels,
      datasets: data_sets
    };
    this.renderChart(this.datacollection, this.options);
  }
};
</script>