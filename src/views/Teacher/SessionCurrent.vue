<!-- TODO: change route to .../classes/:classID/current_session -->
<template>
  <!-- Refer to bootstrap-vue documentation for info on how the tables work -->
  <div id="currentSession">
    <TeacherTitle title="Current Session"/>
    <div class="session-datetime">
      <h2>{{course}}</h2>
      <h3>{{currentDate}} {{currentTime}}</h3>
    </div>
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
        <b-button variant="primary" @click="checkSession">Save Session</b-button>
      </div>
    </div>

    <!-- Modals -->
    <b-modal
      id="cancel"
      ref="cancel"
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
      ref="save"
      centered
      title="Save Session"
      cancel-variant="outline-secondary"
      @ok="saveSession"
    >Are you sure you want to save session for {{course}}?</b-modal>
    <b-modal id="unfinished" ref="unfinished" centered v-model="unfinishedSesh" @ok="saveSession">
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
import { setTimeout } from 'timers';
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
      classes: [],
      currentDate: null,
      currentTime: null,
      course: null,
      reqSave: false,
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
    cancelSession() {
      let self=this;
      setTimeout(function() {
        self.$router.push("/teacher/sessions");
      }, 500);
    },
    checkSession() {
      if (this.unaccounted.length > 0) this.showUnfinsishedModal();
      else this.showSaveModal();
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
        .catch(err => console.log(err));

        let self = this;
        setTimeout(function() {
          self.$router.push("/teacher/sessions");
        }, 500);
        
    },
    rowClass(item) {
      //method responsible for changing row colors
      if (!item) return;
      if (item.statusId == 1) return "table-success";
      if (item.statusId == 2) return "table-danger";
      if (item.statusId == 3) return "table-warning";
    },
    formatDate(date) {
      this.currentDate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
    },
    formatTime(date) {
      let hour = date.getHours();
      let minute = date.getMinutes();
      let minuteDisp = minute;
      let ampm = "AM";
      if(hour > 12) {
        hour -= 12;
        ampm = "PM";
      }
      else if(hour == 12) ampm = "PM"

      if(Number(minute) < 10) minuteDisp = "0" + minute;
      this.currentTime = hour + ':' + minuteDisp + ' ' + ampm;
    },
    showCancelModal() {
      this.$refs.cancel.show();
    },
    showSaveModal() {
      this.$refs.save.show();
    },
    showUnfinsishedModal() {
      this.$refs.unfinished.show();
    },
    handleSave(bvEvt) {
      console.log(bvEvt);
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
        self.classes = self.classes.filter(course => course.id == self.$route.params.classId);
        self.course = self.classes[0].courseName;
      })
      .catch(err => console.log(err));
    
    let date = new Date();
    this.formatDate(date);
    this.formatTime(date);
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
