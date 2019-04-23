<!-- TODO: change route to .../classes/:classID/current_session -->
<template>
  <!-- Refer to bootstrap-vue documentation for info on how the tables work -->
  <div id="currentSession">
    <TeacherTitle title="Current Session"/>
    <h2 class="session-datetime">((Local Datetime))</h2>
    <div id="attendance-wrapper">
      <div class="table-session" id="unaccounted">
        <h3 class="table-title">Unnaccounted Students ({{ unaccounted.length }})</h3>
        <b-form-input id="unaccounted-filter" v-model="filter" placeholder="Filter by name..."></b-form-input>
        <b-table :items="unaccounted" :fields="fields" :filter="filter">
          <template slot="presence" slot-scope="data">
            <!-- Should make these into a component -->
            <button
              class="btn-mark-presence btn-tardy"
              @click="markPresence(
                  data.item.id,
                  data.item.firstName,
                  data.item.lastName,
                  'Tardy', 
                  3)"
            >T</button>
            <button
              class="btn-mark-presence btn-absent"
              @click="markPresence(
                  data.item.id,
                  data.item.firstName,
                  data.item.lastName,
                  'Absent',  
                  2)"
            >A</button>
            <button
              class="btn-mark-presence btn-present"
              @click="markPresence(
                  data.item.id,
                  data.item.firstName,
                  data.item.lastName,
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
            <span v-if="data.item.statusId == 1">{{data.item.status = "Present"}}</span>
            <span v-if="data.item.statusId == 2">{{data.item.status = "Absent"}}</span>
            <span v-if="data.item.statusId == 3">{{data.item.status = "Tardy"}}</span>
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
        <b-button
          variant="outline-secondary"
          style="margin-right: 20px;"
          v-b-modal.cancel
        >Cancel Session</b-button>
        <b-button variant="primary" v-b-modal.save>Save Session</b-button>
      </div>
    </div>

    <!-- Modals -->
    <b-modal
      id="cancel"
      centered
      title="Cancel Session"
      cancel-variant="outline-secondary"
      @ok="cancelSession"
    >
      Are you sure you want to cancel the session?
      All progress will be lost.
      <div slot="modal-ok">Yes, cancel session</div>
      <div slot="modal-cancel">No, do not cancel session</div>
    </b-modal>
    <b-modal
      id="save"
      centered
      title="Save Session"
      cancel-variant="outline-secondary"
      @ok="checkSession"
    >Are you sure you want to save session for CLASSNAME?</b-modal>
    <b-modal id="unfinished" centered v-model="unfinishedSesh" @ok="saveSession">
      There are still students who haven't been marked.
      Do you still want to save the session?
      Unmarked students will not be saved.
    </b-modal>
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
        ClassId: null,
        Students: []
      },
      presenceMarks: [
        { value: 1, text: "Present" },
        { value: 2, text: "Absent" },
        { value: 3, text: "Tardy" }
      ], //options for dropdowns in accounted table
      unfinishedSesh: false //flag for modal to detect unfinished session after save
    };
  },
  methods: {
    markPresence(id, first, last, presence, status) {
      //deletes row from unaccounted table and adds object to accounted table
      this.unaccounted = this.unaccounted.filter(
        student => student.id != id
      );
      const newMarkedStudent = {
        studentId: id,
        firstName: first,
        lastName: last,
        status: presence,
        statusId: status
      };
      this.accounted.push(newMarkedStudent);
    },
    cancelSession(evt) {
      this.$router.push("/teacher/sessions");
    },
    checkSession() {
      if (this.unaccounted.length > 0) this.unfinishedSesh = true;
      else this.saveSession();
    },
    saveSession() {
      this.savedSession.ClassId = this.$route.params.classId;
      for (var i = 0; i < this.accounted.length; i++) {
        const newStudent = {
          studentId: this.accounted[i].studentId,
          statusId: this.accounted[i].statusId
        };
        this.savedSession.Students.push(newStudent);
      }
      axios
        .post(this.$api + "classes/" + this.$route.params.classId + "/sessions", this.savedSession, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.$router.push("/teacher/sessions");
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
      .get(this.$api + "classes/" + this.$route.params.classId + "/students", {
        params: {
          id: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
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
  margin-bottom: 50px;
}

#attendance-wrapper {
  width: 700px;
}

#unaccounted {
  margin-bottom: 50px;
}

#unaccounted-filter {
  width: 350px;
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
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 200px;
}
</style>
