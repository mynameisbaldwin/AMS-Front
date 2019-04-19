<template>
  <div id="sessions">
      <TeacherTitle title="Recent Sessions"/>
      <b-table id="table-sessions" striped hover :items="sessions" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
        <template slot="presence" slot-scope="data">
            <b-badge class="presence-badge" variant="success">0</b-badge>
            <b-badge class="presence-badge" variant="warning">0</b-badge>
            <b-badge class="presence-badge" variant="danger">0</b-badge>
            <b-link style="float: right" @click="viewSesh(data.item.id)">View</b-link>
        </template>
      </b-table>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";

export default {
  name: "sessions",
  components: {
    TeacherTitle
  },
  data() {
    return {
      sortBy: 'sessionDate',
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
      sessions: null //TODO: convert utc time to local time, add up P/A/T
    };
  },
  methods: {
    viewSesh(id) {
      this.$router.push({name:'view_session', params:{sessionId: id}});
    }
  },
  created() {
    axios.get("http://ec2-18-220-213-7.us-east-2.compute.amazonaws.com/api/sessions", {
      params: {
        id: localStorage.userId
      },
      headers: {
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(res => (this.sessions = res.data))
    .catch(err => console.log(err));
  }
};
</script>

<style>
#btn-new-session {
  float:right;
}

#table-sessions {
  width: 700px;
}

.presence-badge {
  margin-right: 10px;
}
</style>
