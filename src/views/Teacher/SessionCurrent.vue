<!-- TODO: change route to .../classes/:classID/current_session -->
<template>
  <!-- Refer to bootstrap-vue documentation for info on how the tables work -->
  <div id="currentSession">
      <TeacherTitle title="Current Session"/>
      <h2 class="session-datetime">March 30th, 9:30 - 10:30am</h2>
      <div class="table-session" id="unaccounted">
        <h3 class="table-title">Unnaccounted Students ({{ unaccounted.length }})</h3>
        <b-form-input id="unaccounted-filter" v-model="filter" placeholder="Filter by name..."></b-form-input>
        <b-table :items="unaccounted" :fields="fields" :filter="filter">
          <template slot="presence" slot-scope="data">
            <!-- Should make these into a component -->
            <button
              class="btn-mark-presence btn-tardy"
              @click="markPresence(
                data.item.StudentId,
                data.item.FirstName,
                data.item.LastName,
                'Tardy', 
                3)"
            >T</button>
            <button
              class="btn-mark-presence btn-absent"
              @click="markPresence(
                data.item.StudentId,
                data.item.FirstName,
                data.item.LastName,
                'Absent',  
                2)"
            >A</button>
            <button
              class="btn-mark-presence btn-present"
              @click="markPresence(
                data.item.StudentId,
                data.item.FirstName,
                data.item.LastName,
                'Present', 
                1)"
            >P</button>
          </template>
        </b-table>
      </div>
      <div class="table-session" id="accounted">
        <h3 class="table-title">Accounted Students ({{ accounted.length }})</h3>
        <b-table :items="accounted" :fields="fields" :tbody-tr-class="rowClass">
          <template slot="presence" slot-scope="data">
            <span v-if="data.item.statusId == 1">Present</span>
            <span v-if="data.item.statusId == 2">Absent</span>
            <span v-if="data.item.statusId == 3">Tardy</span>
            <b-form-select
              id="change-presence-dropdown"
              v-model="data.item.statusId"
              :options="presenceMarks"
            >
              <template slot="first">
                <option :value="null" disabled>Change to...</option>
              </template>
            </b-form-select>
          </template>
        </b-table>
      </div>
      <div id="session-save">
        <b-button variant="outline-secondary" style="margin-right: 20px;" v-on:click="cancelSession()">Cancel Session</b-button>
        <b-button variant="primary" v-on:click="saveSession()">Save Session</b-button>
      </div>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";
import bootbox from "bootbox";
export default {
  name: "SessionCurrent",
  components: {
    TeacherTitle
  },
  data() {
    return {
      //fields for both tables
      fields: { 
        lastName: {
          label: "Last Name",
          sortable: true
        },
        firstName: {
          label: "First Name",
          sortable: true
        },
        presence: {
          label: "Presence (Tardy, Absent, Present)"
        }
      },
      filter: null,
      unaccounted: [], //objects of unaccounted students
      accounted: [],
      savedSession: {
        ClassId: 1,
        Students: []
      },
      presenceMarks: [
        { value: 1, text: "Present" },
        { value: 2, text: "Absent" },
        { value: 3, text: "Tardy" }
      ], //options for dropdowns in accounted table
      markedStudent: null //model for accounted dropdowns
    };
  },
  methods: {
    markPresence(id, first, last, presence, status) {
      //deletes row from unaccounted table and adds object to accounted table
      this.unaccounted = this.unaccounted.filter(unaccounted => unaccounted.studentId != id);
      const newMarkedStudent = {
        studentId: id,
        firstName: first,
        lastName: last,
        status: presence,
        statusId: status
      };
      this.accounted.push(newMarkedStudent);
    },
    cancelSession() {
      //cancels session
      bootbox.confirm({
        message:
          "Are you sure you want to cancel the current session? All progress will be lost.",
        buttons: {
          confirm: {
            label: "Yes, Cancel"
          },
          cancel: {
            label: "No, don't cancel",
            className: "btn-outline-secondary"
          }
        },
        callback: function(result) {
          console.log(result);
        }
      });
    },
    saveSession() {
      //saves session data
      if (this.unaccounted.length > 0) {
        bootbox.confirm({
          message:
            "There are still students left unaccounted. Would you like to continue saving anyways? Remaining students will be left unmarked.",
          buttons: {
            confirm: {
              label: "Yes, save anyway"
            },
            cancel: {
              label: "Cancel",
              className: "btn-outline-secondary"
            }
          },
          callback: function(result) {
            if (result) {
              for(item in this.accounted) {
                const newStudent = {
                  studentId: item.studentId,
                  statusId: item.statusId
                }
                this.savedSession.Students.push(newStudent);
              }
              axios
                .post(
                  "http://ec2-18-220-213-7.us-east-2.compute.amazonaws.com/api/classes/1/sessions",
                  this.savedSession
                )
                .then(res => console.log(res))
                .catch(err => console.log(err));
            } //post results
          }
        });
      } 
      else {
        for(item in this.accounted) {
          const newStudent = {
            studentId: item.studentId,
            statusId: item.statusId
          }
          this.savedSession.Students.push(newStudent);
        }
        axios
          .post("http://ec2-18-220-213-7.us-east-2.compute.amazonaws.com/api/classes/1/sessions", this.savedSession)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      } //route to confirm page
    },
    rowClass(item) {
      //method responsible for changing row colors
      if (!item) return;
      if (item.statusId == 1) return "table-success";
      if (item.statusId == 2) return "table-danger";
      if (item.statusId == 3) return "table-warning";
    }
  },
  created() {
    //adds data to unaccounted table from outside source
    axios
      .get("http://ec2-18-220-213-7.us-east-2.compute.amazonaws.com/api/classes/1/students", {
        params: {
          id: localStorage.userId
        },
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(res => (this.unaccounted = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style>
.session-datetime {
  font-family: "Open Sans", "Roboto", "sans serif";
  margin-bottom: 100px;
}

.table-session {
  width: 700px;
}

#unaccounted {
  margin-bottom: 50px;
}

#unaccounted-filter {
  width: 50%;
  margin-bottom: 20px;
}

.btn-mark-presence {
  height: 50px;
  width: 50px;
  vertical-align: center;
  text-align: center;
  line-height: 50px;
  display: inline-block;
  border: none;
}

.btn-present {
  background-color: white;
  color: #44cf64;
}

.btn-present:hover {
  background-color: #44cf64;
  color: white;
}

.btn-absent {
  background-color: white;
  color: #dc3545;
}

.btn-absent:hover {
  background-color: #dc3545;
  color: white;
}

.btn-tardy {
  background-color: white;
  color: #ffc107;
}

.btn-tardy:hover {
  background-color: #ffc107;
  color: white;
}

#change-presence-dropdown {
  width: 150px;
  float: right;
}

#session-save {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 200px;
}
</style>
