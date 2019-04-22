<template>
  <div id="sessions">
    <TeacherTitle title="Recent Sessions"/>
    <b-table
      id="table-sessions"
      striped
      hover
      :items="sessions"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template slot="sessionDate" slot-scope="data">{{formatDate(data.item.sessionDate)}}</template>
      <template slot="presence" slot-scope="data">
        <b-badge class="presence-badge" variant="success">0</b-badge>
        <b-badge class="presence-badge" variant="warning">0</b-badge>
        <b-badge class="presence-badge" variant="danger">0</b-badge>
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
      sessions: null //TODO: add up P/A/T
    };
  },
  methods: {
    viewSesh(id) {
      console.log(id);
      this.$router.push({ name: "view_session", params: { sessionId: id } });
    },
    formatDate(item) {
      let date = new Date(item);
      let formattedDate =
        date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
      return formattedDate;
    }
  },
  created() {
    axios
      .get(this.$api + "sessions", {
        params: {
          id: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => (this.sessions = res.data))
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
