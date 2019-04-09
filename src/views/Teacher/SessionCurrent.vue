<template>
  <!-- Refer to bootstrap-vue documentation for info on how the tables work -->
  <div id="currentSession">
    <NavSide/>
    <div class="teacher-wrapper">
      <h1 class="teacher-head">Current Session - Class Name</h1>
      <h2 class="session-datetime">March 30th, 9:30 - 10:30am</h2>
      <div class="table-session" id="unaccounted">
        <h3 class="table-title">Unnaccounted Students ({{ unaccounted.length }})</h3>
        <b-form-input id="unaccounted-filter" v-model="filter" placeholder="Filter by name..."></b-form-input>
        <b-table :items="unaccounted" :fields="fields" :filter="filter">
          <template slot="presence" slot-scope="data">
            <!-- Should make these into a component -->
            <button
              class="btn-mark-presence btn-tardy"
              @click="markPresence(data.item.id, data.item.name, 'Tardy')"
            >T</button>
            <button
              class="btn-mark-presence btn-absent"
              @click="markPresence(data.item.id, data.item.name, 'Absent')"
            >A</button>
            <button
              class="btn-mark-presence btn-present"
              @click="markPresence(data.item.id, data.item.name, 'Present')"
            >P</button>
          </template>
        </b-table>
      </div>
      <div class="table-session" id="accounted">
        <h3 class="table-title">Accounted Students ({{ accounted.length }})</h3>
        <b-table :items="accounted" :fields="fields" :tbody-tr-class="rowClass">
          <!-- Add change-presence component to last column -->
          <template slot="presence" slot-scope="data">
            {{ data.item.presence }}
            <b-form-select
              id="change-presence-dropdown"
              v-model="data.item.presence"
              :options="presenceMarks"
            ></b-form-select>
          </template>
        </b-table>
      </div>
      <div id="session-save">
        <b-button
          variant="outline-secondary"
          style="margin-right: 20px;"
          v-on:click="cancelSession()"
        >Cancel Session</b-button>
        <b-button variant="primary" v-on:click="saveSession()">Save Session</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavSide from "../../components/NavSide.vue";
import axios from "axios";
import bootbox from "bootbox";
export default {
  name: "SessionCurrent",
  components: {
    NavSide
  },
  data() {
    return {
      //fields for both tables
      fields: {
        id: {
          label: "ID"
        },
        name: {
          label: "Name",
          sortable: true
        },
        presence: {
          label: "Presence (Tardy, Absent, Present)"
        }
      },
      filter: null,
      unaccounted: [], //objects of unaccounted students
      accounted: [], //objects of accounted students
      presenceMarks: [
        { value: null, text: "Change to..." },
        { value: "Present", text: "Present" },
        { value: "Absent", text: "Absent" },
        { value: "Tardy", text: "Tardy" }
      ], //options for dropdowns in accounted table
      markedStudent: null //model for accounted dropdowns
    };
  },
  methods: {
    markPresence(id, name, presence) {
      //deletes row from unaccounted table and adds object to accounted table
      this.unaccounted = this.unaccounted.filter(
        unaccounted => unaccounted.id != id
      );
      const newMarkedStudent = {
        id: id,
        name: name,
        presence: presence
      };
      this.accounted = [...this.accounted, newMarkedStudent];
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
              label: "Yes, save anway"
            },
            cancel: {
              label: "Cancel",
              className: "btn-outline-secondary"
            }
          },
          callback: function(result) {
            if (result) {
              axios
                .post(
                  "https://jsonplaceholder.typicode.com/users",
                  this.accounted
                )
                .then(res => console.log(res))
                .catch(err => console.log(err));
            } //post results
          }
        });
      } else {
        axios
          .post("https://jsonplaceholder.typicode.com/users", this.accounted)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      } //route to confirm page
    },
    rowClass(item) {
      //method responsible for changing row colors
      if (!item) return;
      if (item.presence === "Present") return "table-success";
      if (item.presence === "Absent") return "table-danger";
      if (item.presence === "Tardy") return "table-warning";
    }
  },
  created() {
    //adds data to unaccounted table from outside source
    axios
      .get("https://jsonplaceholder.typicode.com/users")
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
  width: 500px;
}

.table-title {
  font-family: "Open Sans", "Roboto", "sans serif";
  font-weight: bold;
  font-size: 22pt;
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
