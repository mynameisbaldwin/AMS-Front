<template>
  <div id="newSession">
    <TeacherTitle title="New Session"/>
    <div id="selectClass">
      <b-form>
        <b-form-group id="chooseClass" label="Choose a class" label-for="classSelect">
          <b-form-select v-model="selected" @change="show = true" :options="options">
            <template slot="first">
              <option :value="null" disabled>Choose a class...</option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-button variant="outline-secondary" style="float:left;" @click="$router.go(-1)">Go back</b-button>
        <div v-if="show">
          <b-button @click="selectClass" variant="primary" style="float:right;">Next</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";
export default {
  name: "SessionNew",
  components: {
    TeacherTitle
  },
  data() {
    return {
      show: false,
      selected: null,
      classes: [],
      options: []
    };
  },
  methods: {
    selectClass() {
      this.$router.push("/teacher/sessions/" + this.selected + "/current_session");
    },
    addOptions() {
      for(var i = 0; i < this.classes.length; i++) {
        const option = {
          value: this.classes[i].id,
          text: this.formatName(i)
        }
        this.options.push(option);
      }
    },
    formatName(index) {
      let course = this.classes[index];
      let days = course.weekDays.join('');
      let start = course.startTime;
      let end = course.endTime;
      start = start.split(':');
      end = end.split(':');

      let stHour = Number(start[0]);
      let stMinute = start[1];
      let endHour = Number(end[0]);
      let endMinute = end[1];
      let startAMPM = "AM";
      let endAMPM = "AM";

      if(stHour > 12) {
        stHour -= 12;
        startAMPM = "PM";
      }
      else if(stHour == 12) startAMPM = "PM";

      if(endHour > 12) {
        endHour -= 12;
        endAMPM = "PM";
      }
      else if(stHour == 12) startAMPM = "PM";
      
      let newStart = stHour + ':' + stMinute + startAMPM;
      let newEnd = endHour + ':' + endMinute + endAMPM;
      
      return course.courseName + " (" + days + ") " + newStart + " - " + newEnd;
    }
  },
  created() {
    let self = this;
    axios
      .get(this.$api + "classes", {
        params: {
          userId: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(function (response) {
        self.classes = response.data;
        self.addOptions();
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
#selectClass {
  width: 700px;
}
</style>
