<template>
  <div id="classes">
    <TeacherTitle title="Classes"/>
    <h4 id="table-instruct">Click on a class to see its roster.</h4>
    <div id="tables">
      <div id="classes">
        <b-table
          fixed
          selectable
          id="table-classes"
          :items="classes"
          :fields="fields"
          :select-mode="selectMode"
          @row-selected="rowSelect"
        ></b-table>
        <b-link to="/teacher/classes/edit_classes">Edit Classes...</b-link>
      </div>
      <div id="roster">
        <b-table fixed id="table-roster" striped :items="roster" :fields="rosterFields"></b-table>
        <b-link v-if="classId != null" v-on:click="editRoster">Edit Roster...</b-link>
        <!-- replace '123' with class ID -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TeacherTitle from "../../components/TeacherTitle.vue";
export default {
  name: "classes",
  components: {
    TeacherTitle
  },
  data() {
    return {
      title: "Classes",
      userId: { id: localStorage.userId },
      classId: null,
      classes: [],
      roster: [],
      fields: ["courseName", "startTime", "endTime"],
      rosterFields: ["firstName", "lastName"],
      selectMode: "single",
      selected: []
    };
  },
  methods: {
    rowSelect(items) {
      this.classId = items[0].id;
      axios
        .get(this.$api + "classes/" + this.classId + "/students", {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(res => (this.roster = res.data))
        .catch(err => console.log(err));
    },
    editRoster() {
      this.$router.push({ name: "edit_roster", params: { classId: this.classId } });
    }
  },
  created() {
    axios
      .get(this.$api + "classes", {
        params: {
          userId: localStorage.userId
        },
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => (this.classes = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
#tables {
  display: flex;
  flex-direction: row;
}

#table-classes {
  width: 90%;
}

#table-instruct {
  font-family: "Roboto", "sans serif";
  font-style: italic;
  font-weight: none;
  font-size: 12pt;
}

#table-roster {
  width: 95%;
}
</style>
