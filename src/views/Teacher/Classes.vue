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
        <b-table fixed id="table-roster" :items="rosterItems" :fields="rosterFields"></b-table>
        <b-link v-on:click="editRoster(123)">Edit Roster...</b-link>
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
      classes: [],
      roster: [],
      rosterItems: null,
      fields: ["courseName", "startTime", "endTime"],
      rosterFields: ["lastName", "firstName"],
      selectMode: "single",
      selected: []
    };
  },
  methods: {
    rowSelect(item) {
      var classId = item[0].id;
      // axios
      //   .get(this.$api + "classes/" + classId + "/students", {
      //     headers: {
      //       Authorization: "Bearer " + localStorage.token
      //     }
      //   })
      //   .then(res => (this.roster = res.data))
      //   .catch(err => console.log(err));
    },
    editRoster(id) {
      this.$router.push({ name: "edit_roster", params: { classId: id } });
    }
  },
  mounted: function() {
    axios
      .get(this.$api + "classes", this.userId, {
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
