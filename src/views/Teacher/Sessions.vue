<template>
  <div class="sessions">
    <NavSide/>
    <div class="teacher-wrapper">
      <h1 class="teacher-head">Today's Sessions</h1>
      <b-table id="table-sessions" striped hover :items="sessions" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
        <template slot="presence" slot-scope="data">
          <b-badge class="presence-badge" variant="success">{{ data.item.presents }}</b-badge>
          <b-badge class="presence-badge" variant="warning">{{ data.item.tardies }}</b-badge>
          <b-badge class="presence-badge" variant="danger">{{ data.item.absents }}</b-badge>
          <b-link style="float: right" @click="viewSesh(data.item.id)">View</b-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import NavSide from "../../components/NavSide.vue";
import axios from "axios";
import sesh from "../../assets/sessions.json";
export default {
  name: "sessions",
  components: {
    NavSide
  },
  data() {
    return {
      sortBy: 'date',
      sortDesc: true,
      fields: {
        date: {
          label: "Date",
          sortable: true
        },
        class_name: {
          label: "Class Name"
        },
        presence: {
          label: "Students P / T / A"
        }
      },
      filter: null,
      sessions: sesh
    };
  },
  methods: {
    viewSesh(id) {
      this.$router.push({name:'view_session', params:{sessionId: id}});
    }
  }
};
</script>

<style>
#table-sessions {
  width: 700px;
}

.presence-badge {
  margin-right: 10px;
}
</style>
