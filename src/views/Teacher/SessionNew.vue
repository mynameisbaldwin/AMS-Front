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
import axios from "axios";
export default {
  name: "SessionNew",
  components: {
    TeacherTitle
  },
  data() {
    return {
      show: false,
      selected: null,
      classes: [],
      options: []
    };
  },
  methods: {
    selectClass() {
      this.$router.push("/teacher/sessions/" + this.selected + "/current_session");
    },
    addOptions() {
      for(var i = 0; i < this.classes.length; i++) {
        const option = {
          value: this.classes[i].id,
          text: this.classes[i].courseName
        }
        this.options.push(option);
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
        self.addOptions();
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
#selectClass {
  width: 700px;
}
</style>
