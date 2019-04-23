<template>
  <div id="sessions">
    <TeacherTitle title="Recent Sessions"/>
    <b-table
      id="table-sessions"
      striped
      hover
      :items="sessionDisplays"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template slot="sessionDate" slot-scope="data">{{formatDate(data.item.sessionDate)}}</template>
      <template slot="presence" slot-scope="data">
        <b-badge class="presence-badge" variant="success">{{data.item.p}}</b-badge>
        <b-badge class="presence-badge" variant="warning">{{data.item.t}}</b-badge>
        <b-badge class="presence-badge" variant="danger">{{data.item.a}}</b-badge>
        <b-link style="float: right" @click="viewSesh(data.item.sessionId)">View</b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";

export default {
  name: "Sessions",
  components: {
    TeacherTitle
  },
  data() {
    return {
      sortBy: "sessionDate",
      sortDesc: true,
      fields: {
        sessionDate: {
          label: "Date",
          sortable: true
        },
        courseName: {
          label: "Class Name"
        },
        presence: {
          label: "Students P / T / A"
        }
      },
      filter: null,
      sessions: null, //TODO: add up P/A/T
      sessionDisplays: []
    };
  },
  methods: {
    viewSesh(id) {
      this.$router.push({ name: "view_session", params: { sessionId: id } });
    },
    formatDate(item) {
      let date = new Date(item);
      let formattedDate =
        date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
      return formattedDate;
    },
    computePAT() {
      //
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
        self.sessions = response.data;
        for(let i = 0; i < self.sessions.length; i++) {
          let sesh = {
            sessionId: self.sessions[i].sessionId,
            courseName: self.sessions[i].courseName,
            sessionDate: self.sessions[i].sessionDate,
            students: self.sessions[i].students.splice(),
            p: 0,
            t: 0,
            a: 0
          }
          let students = self.sessions[i].students;
          for(let j = 0; j < students.length; j++) {
            if(students[j].statusId == 1) sesh.p += 1
            else if (students[j].statusId == 2) sesh.a += 1
            else if(students[j].statusId == 3) sesh.t += 1
          }
          self.sessionDisplays.push(sesh);
        }
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
#btn-new-session {
  float: right;
}

#table-sessions {
  width: 700px;
}

.presence-badge {
  margin-right: 10px;
}
</style>
