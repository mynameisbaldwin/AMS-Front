<<<<<<< HEAD
<template>
    <div id="session-view">
        <!-- <TeacherTitle v-bind:title="session.class_name + ' - ' + session.date" /> -->
        <div class="table-component">
            <h2 class="table-title">Roster</h2>
            <b-table :items="roster" :fields="fields" :tbody-tr-class="rowClass">
                <template slot="status" slot-scope="data">
                    {{ data.item.status }}
                    <b-form-select
                    id="change-presence-dropdown"
                    v-model="data.item.status"
                    :options="presenceMarks"
                    @change="changeSession"
                    >
                        <template slot="first">
                            <option :value="null" disabled>Change to...</option>
                        </template>
                    </b-form-select>
                </template>
            </b-table>
            <div v-if="changeSession">
                <b-link v-b-modal.backCheck>Back to Sessions</b-link>
            </div>
            <div v-else>
                <b-link to="/teacher/sessions">Back to Sessions</b-link>
            </div>
            <div v-if="statusChange">
                <b-button class="btn-saves" variant="primary" style="margin-left: 20px;" v-b-modal.submitCheck>Save Changes</b-button>
                <b-button class="btn-saves" variant="outline-secondary" v-on:click="cancelChanges">Cancel Changes</b-button>
            </div>
        </div>
        <b-modal centered hide-header id="backCheck" cancel-variant="outline-secondary" @ok="goBack">
            Are you sure you want to exit? All unsaved progress will be lost.
            <div slot="modal-ok">
                Yes
            </div>
        </b-modal>
        <b-modal 
        centered 
        hide-header 
        id="submitCheck" 
        cancel-variant="outline-secondary" 
        ok-title="Yes"
        @ok="saveChanges">
            Are you want to save changes?
        </b-modal>
    </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";
import bootbox from "bootbox";
export default {
    name: "SessionView",
    components: {
        TeacherTitle
    },
    data() {
        return {
            session: null,
            roster: [],
            rosterBackup: null,
            statusChange: false,
            fields: ['firstName', 'lastName', 'status'],
            presenceMarks: [
                { value: "Present", text: "Present" },
                { value: "Absent", text: "Absent" },
                { value: "Tardy", text: "Tardy" }
            ]
        }
    },
    methods: {
        rowClass(item) {
            //method responsible for changing row colors
            if (!item) return;
            if (item.status === "Present") return "table-success";
            if (item.status === "Absent") return "table-danger";
            if (item.status === "Tardy") return "table-warning";
        },
        changeSession() {
            this.statusChange = true;
        },
        goBack() {
            this.$router.push('/teacher/sessions');
        },
        saveChanges() {
            for(let i = 0; i < this.roster.length; i++) {
                let student = this.roster[i];
                if(student.status == "Present") student.statusId = 1
                else if(student.status == "Tardy") student.statusId = 3
                else if(student.status == "Absent") student.statusId = 2
            }
            this.session[0].students = this.roster.slice();
            let self = this;
            axios.put(this.$api + "classes/" + this.session[0].classId + "/sessions", this.session[0], {
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            })
            .then(function (response) {
                self.$router.push("/teacher/sessions");
            })
            .catch(err => (console.log(err)));

        },
        cancelChanges() {
            if(this.change) 
            {
                bootbox.confirm({
                    message: "Are you sure you want to cancel your changes? All progress will be lost.",
                    buttons: {
                        confirm: {
                            label: "Yes",
                        },
                        cancel: {
                            label: "No",
                            classname: "btn-outline-secondary"
                        }
                    },
                    callback: function(result) {
                        if(result) 
                        {
                            console.log("Changes canceled");
                            this.roster = [... this.rosterBackup];
                        }
                        else {return;}
                    }
                })
            }
        }
    },
    created() {
        let self = this;
        axios
        .get(this.$api + "sessions", {
            params: {
                userId: localStorage.userId
            },
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
        .then(function (response) {
            let temp = [];
            temp = response.data;
            self.session = temp.filter(sesh => sesh.sessionId == self.$route.params.sessionId);
            for(let i = 0; i < self.session[0].students.length; i++) {
                self.roster.push(self.session[0].students[i]);
            }
        })
        .catch(err => console.log(err));
        }
}
</script>

<style>
.table-component {
    width: 700px;
}

.btn-saves {
    float: right;
}

#change-presence-dropdown {
  width: 150px;
  float: right;
}
</style>
=======
<template>
  <div id="session-view">
    <!-- <TeacherTitle v-bind:title="session.class_name + ' - ' + session.date" /> -->
    <div class="table-component">
      <h2 class="table-title">Roster</h2>
      <b-table :items="roster" :fields="fields" :tbody-tr-class="rowClass">
        <template slot="status" slot-scope="data">
          {{ data.item.status }}
          <b-form-select
            id="change-presence-dropdown"
            v-model="data.item.status"
            :options="presenceMarks"
            @change="changeSession"
          >
            <template slot="first">
              <option :value="null" disabled>Change to...</option>
            </template>
          </b-form-select>
        </template>
      </b-table>
      <div v-if="changeSession">
        <b-link v-b-modal.backCheck>Back to Sessions</b-link>
      </div>
      <div v-else>
        <b-link to="/teacher/sessions">Back to Sessions</b-link>
      </div>
      <div v-if="statusChange">
        <b-button
          class="btn-saves"
          variant="primary"
          style="margin-left: 20px;"
          v-b-modal.submitCheck
        >Save Changes</b-button>
        <b-button
          class="btn-saves"
          variant="outline-secondary"
          v-on:click="cancelChanges"
        >Cancel Changes</b-button>
      </div>
    </div>
    <b-modal
      centered
      hide-header
      id="backCheck"
      ref="backCheck"
      cancel-variant="outline-secondary"
      @ok="goBack"
    >
      Are you sure you want to exit? All unsaved progress will be lost.
      <div slot="modal-ok">Yes</div>
    </b-modal>
    <b-modal
      centered
      hide-header
      id="submitCheck"
      cancel-variant="outline-secondary"
      ok-title="Yes"
      @ok="saveChanges"
    >Are you want to save changes?</b-modal>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";
import bootbox from "bootbox";
export default {
  name: "SessionView",
  components: {
    TeacherTitle
  },
  data() {
    return {
      session: null,
      roster: [],
      rosterBackup: null,
      statusChange: false,
      fields: ["firstName", "lastName", "status"],
      presenceMarks: [
        { value: "Present", text: "Present" },
        { value: "Absent", text: "Absent" },
        { value: "Tardy", text: "Tardy" }
      ]
    };
  },
  methods: {
    rowClass(item) {
      //method responsible for changing row colors
      if (!item) return;
      if (item.status === "Present") return "table-success";
      if (item.status === "Absent") return "table-danger";
      if (item.status === "Tardy") return "table-warning";
    },
    changeSession() {
      this.statusChange = true;
    },
    goBack() {
      this.$router.push("/teacher/sessions");
    },
    saveChanges() {
      for (let i = 0; i < this.roster.length; i++) {
        let student = this.roster[i];
        if (student.status == "Present") student.statusId = 1;
        else if (student.status == "Tardy") student.statusId = 3;
        else if (student.status == "Absent") student.statusId = 2;
      }
      this.session[0].students = this.roster.slice();
      let self = this;
      axios
        .put(
          this.$api + "classes/" + this.session[0].classId + "/sessions",
          this.session[0],
          {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          }
        )
        .then(function(response) {
          self.$router.push("/teacher/sessions");
        })
        .catch(err => console.log(err));
    },
    showCancelModal() {
      this.$refs.backCheck.show();
    },
    cancelChanges() {
      this.showCancelModal();
    }
  },
  created() {
    let self = this;
    axios
      .get(this.$api + "sessions", {
        params: {
          userId: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(function(response) {
        let temp = [];
        temp = response.data;
        self.session = temp.filter(
          sesh => sesh.sessionId == self.$route.params.sessionId
        );
        for (let i = 0; i < self.session[0].students.length; i++) {
          self.roster.push(self.session[0].students[i]);
        }
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
.table-component {
  width: 700px;
}

.btn-saves {
  float: right;
}

#change-presence-dropdown {
  width: 150px;
  float: right;
}
</style>
>>>>>>> e23387a8a1dd9a64a333caacc7a0229a4774ac0c
