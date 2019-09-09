<template>
  <div id="classes">
    <TeacherTitle title="Edit Classes"/>
    <div id="classBtns" class="classForms">
        <b-btn
          v-if="toggleForm == false"
          variant="outline-primary"
          style="margin-bottom:30px;"
          @click="toggleForm = !toggleForm"
        >+ Create New Class</b-btn>
        <b-btn v-if="showDelete && toggleForm == false" variant="danger" style="margin-bottom:30px; float:right;" v-b-modal.deleteCheck>Delete Class</b-btn>
    </div>
    
    <div class="classForms" id="editClass" v-if="toggleForm == false">
      <b-form-select v-model="selectedClass" :options="classNames" @change="changeClass">
        <template slot="first">
          <option :value="null" disabled>Choose a class to edit...</option>
        </template>
      </b-form-select>
      <b-form id="form-edit" @submit.prevent="showSubmitCheck">
        <b-form-group id="className" label="Class Name" label-for="classNameIn">
          <b-form-input id="classNameIn" v-model="form.courseName" placeholder="Class Name" required></b-form-input>
        </b-form-group>
         <b-form-group class="times" id="startDate" label="Start Date" label-for="startDateIn">
          <b-form-input
            id="startDateIn"
            v-model="form.startDate"
            placeholder="Start Date"
            type="date"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="times endTime" label="End Date" label-for="endDateeIn">
          <b-form-input
            id="endDateIn"
            v-model="form.endDate"
            placeholder="End Date"
            type="date"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="times" id="startTime" label="Start Time" label-for="startTimeIn">
          <b-form-input
            id="startTimeIn"
            v-model="form.startTime"
            placeholder="Start Time"
            type="time"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="times endTime" label="End Time" label-for="endTimeIn">
          <b-form-input
            id="endTimeIn"
            v-model="form.endTime"
            placeholder="End Time"
            type="time"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox-group
          id="weekdays"
          v-model="form.weekDays"
          :options="weekdays"
          name="weekdays"
        ></b-form-checkbox-group>
        <b-form-invalid-feedback :state="formEditWeekDay">Please select one weekday</b-form-invalid-feedback>
        <div class="btn-form" v-if="showSubmit">
          <b-button type="submit" variant="primary" style="float:right;">Save Changes</b-button>
        </div>
      </b-form>
    </div>

    <div class="classForms" id="createClass" v-if="toggleForm == true">
      <b-form id="form-create"  @submit.prevent="createClass">
        <b-form-group id="className" label="Class Name" label-for="classNameIn">
          <b-form-input
            id="classNameIn"
            v-model="newClass.courseName"
            placeholder="Class Name"
            required
            ></b-form-input>
        </b-form-group>
        <b-form-group class="times" id="startDate" label="Start Date" label-for="startDateIn">
          <b-form-input
            id="startDateIn"
            v-model="newClass.startDate"
            placeholder="Start Date"
            type="date"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="times endTime" label="End Date" label-for="endDateeIn">
          <b-form-input
            id="endDateIn"
            v-model="newClass.endDate"
            placeholder="End Date"
            type="date"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="times" id="startTime" label="Start Time" label-for="startTimeIn">
          <b-form-input
            id="startTimeIn"
            v-model="newClass.startTime"
            placeholder="Start Time"
            type="time"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="times endTime" label="End Time" label-for="endTimeIn">
          <b-form-input
            id="endTimeIn"
            v-model="newClass.endTime"
            placeholder="End Time"
            type="time"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox-group
          id="weekdays"
          v-model="newClass.weekDays"
          :options="weekdays"
          name="weekdays"
        ></b-form-checkbox-group>
        <b-form-invalid-feedback :state="formCreateWeekDay">Please select one weekday</b-form-invalid-feedback>
        <div class="btn-form">
          <b-button
            variant="outline-secondary"
            style="float:left;"
            @click="toggleForm = !toggleForm"
          >Cancel</b-button>
          <b-button type="submit" variant="primary" style="float:right;">Submit</b-button>
        </div>
      </b-form>
    </div>

    <div style="margin-top:100px;" v-if="toggleForm">
      <b-link v-b-modal.backCheck>Back to classes</b-link>
    </div>
    <div style="margin-top:20px;" v-else>
      <b-link v-b-modal.backCheck>Back to classes</b-link>
    </div>

    <b-modal
      id="backCheck"
      cancel-variant="outline-secondary"
      centered
      hide-header
      ok-title="Yes, go back"
      @ok="$router.push('/teacher/classes')"
    >
      Are you sure you want to go exit? All unsaved progress will be lost.
    </b-modal>
    <b-modal
      id="submitCheck"
      ref="submitCheck"
      cancel-variant="outline-secondary"
      centered
      hide-header
      @ok="onSubmit"
    >Are you sure you want to save changes?</b-modal>
    <b-modal
      id="deleteCheck"
      cancel-variant="outline-secondary"
      title="Delete Class"
      centered
      header-bg-variant="danger"
      header-text-variant="light"
      ok-title="Delete Class"
      ok-variant="danger"
      @ok="deleteClass"
    >
      Are you sure you want to delete "{{form.courseName}}"? All class data will be erased, including the students in the roster.
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import TeacherTitle from "../../components/TeacherTitle.vue";
import Classes from "../../assets/classes.json";
export default {
  name: "EditClasses",
  components: {
    TeacherTitle
  },
  data() {
    return {
      classes: [],
      classNames: [],
      toggleForm: false, //false for edit, true for add new class
      showDelete: false, //true for delete btn to appear
      selectedClass: null,
      showSubmit: false, //flag to show submit btn on edit page
      weekDayReq: false, //checks if number of weekdays is > 0 in new class
      form: {
        id: null,
        courseName: "",
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        weekDays: []
      },
      newClass: {
        courseName: null,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        weekDays: []
      },
      weekdays: [
        { value: "M", text: "Monday" },
        { value: "T", text: "Tuesday" },
        { value: "W", text: "Wednesday" },
        { value: "R", text: "Thursday" },
        { value: "F", text: "Friday" }
      ],
      selectedWeekdays: []
    };
  },
  methods: {
    changeClass() {
      var current = this.selectedClass;
      this.form.id = current.id;
      this.form.courseName = current.courseName;
      this.form.startDate = this.formatDate(current.startDate);
      this.form.endDate = this.formatDate(current.endDate);
      this.form.startTime = current.startTime;
      this.form.endTime = current.endTime;
      this.form.weekDays = [];
      for(let i = 0; i < current.weekDays.length; i++) {
        this.form.weekDays.push(current.weekDays[i]);
      }
      this.showSubmit = true;
      this.showDelete = true;
    },
    formatDate(date) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    },
     addClassOption() {
      for (let i = 0; i < this.classes.length; i++) {
        let course = this.classes[i];
        const classOption = {
          value: course,
          text:
           course.courseName + " - " + this.formatDays(course.weekDays) + " - " + this.formatTime(course.startTime, course.endTime)
        };
        this.classNames = [...this.classNames, classOption];
      }
    },
    showSubmitCheck() {
      this.$refs.submitCheck.show();
    },
    onSubmit() {
      if(this.form.weekDays.length > 0) {
        let self = this;
        axios
          .put(this.$api + "classes", self.form, {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          })
          .then(function (response) {
            self.$router.push("/teacher/classes");
          })
          .err(err => (console.log(err)));
      }
    },
    createClass() {
      let self = this;
      if(this.newClass.weekDays.length > 0) {
        axios.post(this.$api + "classes", self.newClass, {
          params: {
            userId: localStorage.userId
          },
          headers: {
              Authorization: "Bearer " + localStorage.token
          }
        })
        .then(function (response) {
          self.$router.push("/teacher/classes");
        })
        .catch(err => (console.log(err)));
      }
      
    },
    deleteClass() {
      let self = this;
      axios.delete(this.$api + "classes/" + this.form.id, {
        params: {
          userId: localStorage.userId
        },
        headers: {
            Authorization: "Bearer " + localStorage.token
        }
      })
      .then(function (response) {
        console.log(response);
        self.$router.push("/teacher/classes");
      })
      .catch(err => (console.log(err)));
    },
    formatTime(start, end) {
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
      if(endHour > 12) {
        endHour -= 12;
        endAMPM = "PM";
      }

      let newStart = stHour + ':' + stMinute + startAMPM;
      let newEnd = endHour + ':' + endMinute + endAMPM;
      return "(" + newStart + " - " + newEnd + ")";
    },
    formatDays(days) {
      return days.join('');
    }
  },
  computed: {
    formEditWeekDay() {
      return this.form.weekDays.length > 0;
    },
    formCreateWeekDay() {
      return this.newClass.weekDays.length > 0;
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
        self.addClassOption();
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.classForms {
  width: 700px;
}

#form-edit {
  margin-top: 30px;
}

.times {
  width: 45%;
  display: inline-block;
}

.endTime {
  margin-left: 5%;
}

.btn-form {
  margin-top: 20px;
}

.nav-back-classes {
  margin-top: 20px;
}
</style>
