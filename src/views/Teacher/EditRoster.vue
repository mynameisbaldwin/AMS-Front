<template>
  <div id="edit-roster">
    <TeacherTitle title="Edit Roster"/>
    <div id="roster">
      <!-- <h3 class="table-title">Roster - CRN {{classInfo.id}} {{classInfo.name}} - {{classInfo.startTime}} - {{classInfo.endTime}}</h3> -->
      <b-table striped fixed hover :items="roster" :fields="fields">
        <template slot="lastName" slot-scope="data">
          {{ data.item.lastName }}
          <b-link
            style="float: right;"
            v-b-modal.checkRemove
            @click="checkRemove(data.item.id, data.item.firstName, data.item.lastName)"
          >Remove</b-link>
          <!-- Putting b-modal here results in crash -->
        </template>
      </b-table>
      <b-link v-if="!hideAdd" v-on:click="switchAdd">+ Add Student...</b-link>
      <b-form v-if="!hideNew" id="add-student-fields">
        <b-form-group id="new-student-first" class="student-field">
          <b-form-input class="student-field" v-model="selectedStudent.firstName" placeholder="First Name"></b-form-input>
        </b-form-group>
        <b-form-group id="new-student-last" class="student-field">
          <b-form-input class="student-field" v-model="selectedStudent.lastName" placeholder="Last Name"></b-form-input>
        </b-form-group>
        <b-form-group id="new-student-btns">
          <b-button v-on:click="switchNew" variant="outline-secondary">Cancel</b-button>
          <b-button
            id="submit-student"
            variant="primary"
            v-on:click="addStudent"
          >Add Student</b-button>
        </b-form-group>
      </b-form>
      <div style="margin-top:20px;">
        <b-link to="/teacher/classes">Back to classes</b-link>
      </div>
    </div>
    <b-modal id="checkRemove" centered hide-header @ok="removeStudent(selectedStudent.id)">
      Are you sure you want to remove
      {{selectedStudent.first}} {{selectedStudent.last}}
      from the roster?
    </b-modal>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle";
import Roster from "../../assets/roster1.json";
import axios from "axios";
export default {
  name: "EditRoster",
  components: {
    TeacherTitle
  },
  data() {
    return {
      roster: [],
      fields: {
        firstName: {
          label: "First Name",
          sortable: true
        },
        lastName: {
          label: "Last Name",
          sortable: true
        }
      },
      class: [],
      classInfo: {
        id: null,
        name: null,
        startTime: null,
        endTime: null
      },
      hideNew: true,
      hideAdd: false,
      selectedStudent: {
        id: null,
        firstName: null,
        lastName: null
      }
    };
  },
  methods: {
    checkRemove(id, first, last) {
      this.selectedStudent.id = id;
      this.selectedStudent.firstName = first;
      this.selectedStudent.lastName = last;
    },
    switchAdd() {
      this.hideAdd = true;
      this.hideNew = false;
    },
    switchNew() {
      this.hideAdd = false;
      this.hideNew = true;
    },
    removeStudent(id) {
      this.roster = this.roster.filter(student => student.id != id);
      axios.delete(this.$api + "classes/" + this.$route.params.classId + "/students/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => (console.log(res)))
      .catch(err => (console.log(err)));
    },
    addStudent() {
      const newStudent = {
        firstName: this.selectedStudent.firstName,
        lastName: this.selectedStudent.lastName
      }
      this.roster.push(newStudent);

      axios.post(this.$api + "classes/" + this.$route.params.classId + "/students", newStudent, {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => (console.log(res)))
      .catch(err => (console.log(err)));

      this.selectedStudent.firstName = null;
      this.selectedStudent.lastName = null;
      this.hideAdd = false;
      this.hideNew = true;
    }
  },
  created() {
    axios
      .get(this.$api + "classes/" + this.$route.params.classId + "/students", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => (this.roster = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
#roster {
  width: 500px;
}

.student-field {
  width: 240px;
  display: inline-block;
}

#new-student-last {
  margin-left: 20px;
}

#new-student-btns {
  float: right;
}

#submit-student {
  margin-left: 20px;
}
</style>
