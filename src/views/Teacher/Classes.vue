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
      fields: ["id", "courseName", "weekDays", "startTime", "endTime"],
      rosterFields: {
        firstName: {
          label: "First Name",
          sortable: true
        },
        lastName: {
          label: "Last Name",
          sortable: true
        }
      },
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
    },
    formatTime() {
      for(let i=0; i < this.classes.length; i++) {
        let start = this.classes[i].startTime;
        let end = this.classes[i].endTime;
        start = start.split(':');
        end = end.split(':');

        let stHour = Number(start[0]);
        let stMinute = start[1];
        let endHour = Number(end[0]);
        let endMinute = end[1];
        let startAMPM = "AM";
        let endAMPM = "AM";

        if(stHour > 12) {
          stHour -= 12;
          startAMPM = "PM";
        }
        else if(stHour == 12) startAMPM = "PM";

        if(endHour > 12) {
          endHour -= 12;
          endAMPM = "PM";
        }
        else if(stHour == 12) startAMPM = "PM";
        
        let newStart = stHour + ':' + stMinute + startAMPM;
        let newEnd = endHour + ':' + endMinute + endAMPM;
        this.classes[i].startTime = newStart;
        this.classes[i].endTime = newEnd;
      }
    },
    formatDays() {
      for(let i=0; i < this.classes.length; i++) {
        let classDays = this.classes[i].weekDays;
        let days = classDays.slice();
        let dayString = "";
        for(let j=0; j < classDays.length; j++) {
          dayString += classDays[j];
        }
        this.classes[i].weekDays = dayString;
      }
    }
  },
  created() {
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
        self.formatTime();
        self.formatDays();
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
#classes {
  margin-bottom: 40px;
}
#tables {
  display: flex;
  flex-direction: row;
}

#table-classes {
  width: 95%;
}

#table-instruct {
  font-family: "Roboto", "sans serif";
  font-style: italic;
  font-weight: none;
  font-size: 12pt;
}

#table-roster {
  width: 90%;
}
</style>
