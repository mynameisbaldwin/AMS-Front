<template>
  <div id="newSession">
    <TeacherTitle title="New Session"/>
    <div id="selectClass">
      <b-form @submit="selectClass">
        <b-form-group id="chooseClass" label="Choose a class" label-for="classSelect">
          <b-form-select v-model="selected" @change="show = true" :options="options">
            <template slot="first">
              <option :value="null" disabled>Choose a class...</option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-button variant="outline-secondary" style="float:left;">Go back</b-button>
        <div v-if="show">
          <b-button type="submit" variant="primary" style="float:right;">Next</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
export default {
  name: "SessionNew",
  components: {
    TeacherTitle
  },
  data() {
    return {
      show: false,
      selected: null,
      options: [{ value: 1, text: "Class 1" }, { value: 2, text: "Class 2" }]
    };
  },
  methods: {
    selectClass() {
      //send class id
      this.$router.push("/teacher/sessions/current_session");
    }
  }
  //add axios get class info
};
</script>

<style>
#selectClass {
  width: 700px;
}
</style>
