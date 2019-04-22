<template>
  <div id="edit-roster">
    <TeacherTitle title="Edit Roster"/>
    <div id="roster">
      <h3 class="table-title">Roster - {{className}} ({{classDays}}) {{classStart}} - {{classEnd}}</h3>
      <b-table striped fixed hover :items="roster" :fields="fields">
        <template slot="last_name" slot-scope="data">
          {{ data.item.last_name }}
          <b-link
            style="float: right;"
            v-b-modal.checkRemove
            @click="checkRemove(data.item.first_name, data.item.last_name)"
          >Remove</b-link>
          <!-- Putting b-modal here results in crash -->
        </template>
      </b-table>
      <b-link v-if="!hideAdd" v-on:click="switchAdd">+ Add Student...</b-link>
      <b-form v-if="!hideNew" id="add-student-fields" @submit="onSubmit">
        <b-form-group id="new-student-first" class="student-field">
          <b-form-input class="student-field" placeholder="First Name"></b-form-input>
        </b-form-group>
        <b-form-group id="new-student-last" class="student-field">
          <b-form-input class="student-field" placeholder="Last Name"></b-form-input>
        </b-form-group>
        <b-form-group id="new-student-btns">
          <b-button v-on:click="switchNew" variant="outline-secondary">Cancel</b-button>
          <b-button
            id="submit-student"
            v-on:click="switchNew"
            variant="primary"
            type="submit"
          >Add Student</b-button>
        </b-form-group>
      </b-form>
    </div>
    <b-modal id="checkRemove" centered hide-header @ok="removeStudent(selectedRemove.last)">
      Are you sure you want to remove
      {{selectedRemove.first}} {{selectedRemove.last}}
      from the roster?
    </b-modal>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle";
import Roster from "../../assets/roster1.json";
export default {
  name: "EditRoster",
  components: {
    TeacherTitle
  },
  data() {
    return {
      roster: [],
      fields: ["first_name", "last_name"],
      className: "Math",
      classDays: "MWF",
      classStart: "9:00",
      classEnd: "10:00",
      hideNew: true,
      hideAdd: false,
      selectedRemove: {
        first: null,
        last: null
      }
    };
  },
  methods: {
    checkRemove(first, last) {
      this.selectedRemove.first = first;
      this.selectedRemove.last = last;
    },
    switchAdd() {
      this.hideAdd = true;
      this.hideNew = false;
    },
    switchNew() {
      this.hideAdd = false;
      this.hideNew = true;
    },
    removeStudent(last) {
      this.roster = this.roster.filter(r => r.last_name != last);
      //axios update roster
    },
    onSubmit() {
      console.log("Submitted");
    }
  },
  mounted: function() {
    this.roster = Roster.filter(r => r.className == "Math");
  }
};
</script>

<style scoped>
#roster {
  width: 50%;
}

.student-field {
  width: 45%;
  display: inline-block;
}

#new-student-last {
  margin-left: 20px;
}

#new-student-btns {
  float: right;
}

#submit-student {
  margin-left: 20px;
}
</style>
