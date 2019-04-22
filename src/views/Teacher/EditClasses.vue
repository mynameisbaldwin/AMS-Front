<template>
  <div id="classes">
    <TeacherTitle title="Edit Classes"/>
    <div v-if="toggleForm == false">
      <b-btn
        variant="outline-primary"
        style="margin-bottom:30px;"
        @click="toggleForm = !toggleForm"
      >+ Create New Class</b-btn>
    </div>

    <div class="classForms" id="editClass" v-if="toggleForm == false" @submit="onSubmit">
      <b-form-select v-model="selectedClass" :options="classNames" @change="onChange">
        <template slot="first">
          <option :value="null" disabled>Choose a class to edit...</option>
        </template>
      </b-form-select>
      <b-form id="form-edit">
        <b-form-group id="className" label="Class Name" label-for="classNameIn">
          <b-form-input id="classNameIn" v-model="form.className" placeholder="Class Name" required></b-form-input>
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
          v-model="form.weekdays"
          :options="weekdays"
          name="weekdays"
        ></b-form-checkbox-group>
        <b-form-invalid-feedback :state="formEditWeekDay">Please select one weekday</b-form-invalid-feedback>
        <div class="btn-form" v-if="showSubmit">
          <b-button variant="primary" type="submit" style="float:right;">Save Changes</b-button>
        </div>
      </b-form>
    </div>

    <div class="classForms" id="createClass" v-if="toggleForm == true">
      <b-form id="form-create">
        <b-form-group id="className" label="Class Name" label-for="classNameIn">
          <b-form-input
            id="classNameIn"
            v-model="newClass.courseName"
            placeholder="Class Name"
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
          v-model="newClass.weekdays"
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
          <b-button variant="primary" style="float:right;">Submit</b-button>
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
      @ok="$router.push('/teacher/classes')"
    >
      Are you sure you want to go exit? All unsaved progress will be lost.
      <div slot="modal-ok">Yes, go back</div>
    </b-modal>
    <b-modal
      id="submitCheck"
      cancel-variant="outline-secondary"
      centered
      hide-header
      @ok="onSubmit"
    >Are you sure you want to save changes?</b-modal>
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
      selectedClass: null,
      showSubmit: false, //flag to show submit btn on edit page
      form: {
        id: null,
        className: "",
        startTime: null,
        endTime: null,
        weekdays: []
      },
      newClass: {
        courseName: null,
        startTime: null,
        endTime: null,
        weekdays: [],
        students: []
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
    onChange() {
      var current = this.selectedClass;
      this.form.id = current.id;
      this.form.className = current.name;
      this.form.startTime = current.start_time;
      this.form.endTime = current.end_time;
      this.form.weekdays = [];
      for (var i = 0; i < current.weekdays.length; i++) {
        this.form.weekdays = [...this.form.weekdays, current.weekdays[i]];
      }
      this.showSubmit = true;
    },
    onSubmit() {
      //post data
      // this.$router.push("/teacher/classes");
    }
  },
  computed: {
    formEditWeekDay() {
      return this.form.weekdays.length > 0;
    },
    formCreateWeekDay() {
      return this.newClass.weekdays.length > 0;
    }
  },
  mounted: function() {
    this.classes = Classes;
    var i = this.classes.length;
    for (var j = 0; j < i; j++) {
      const classOption = {
        value: this.classes[j],
        text:
          this.classes[j].name +
          " (" +
          this.classes[j].weekdays +
          ") " +
          this.classes[j].start_time +
          " - " +
          this.classes[j].end_time
      };
      this.classNames = [...this.classNames, classOption];
    }
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
