<template>
  <b-container fluid class="login-wrapper">
    <b-row align-v="center" align-h="center">
      <div class="login-title">Safety Net</div>
    </b-row>
    <b-row align-v="center" align-h="center">
      <div class="login-module">
        <h2 class="form-title">Sign Up</h2>
        <b-form @submit="onSubmit">
          <b-form-group id="firstName" label="First Name" label-for="firstNameIn">
            <b-form-input
              id="firstNameIn"
              v-model="form.firstName"
              placeholder="First Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="lastName" label="Last Name" label-for="lastNameIn">
            <b-form-input id="lastNameIn" v-model="form.lastName" placeholder="Last Name" required></b-form-input>
          </b-form-group>
          <b-form-group id="email" label="Email" label-for="emailIn">
            <b-form-input
              id="emailIn"
              type="email"
              v-model="form.email"
              placeholder="Email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="username" label="Username" label-for="usernameIn">
            <b-form-input id="usernameIn" v-model="form.username" placeholder="Username" required></b-form-input>
          </b-form-group>
          <b-form-group id="password" label="Password" label-for="passwordIn">
            <b-form-input
              id="passwordIn"
              type="password"
              v-model="form.password"
              placeholder="Password"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="passwordConfirm" label="Confirm Password" label-for="passwordConfirmIn">
            <b-form-input
              id="passwordConfirmIn"
              type="password"
              v-model="form.passwordConfirm"
              placeholder="Confirm Password"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="userLevel" label="Are you a Teacher or a Student?">
            <b-form-radio-group
              name="userLevelOptions"
              id="userLevelGroup"
              v-model="form.selected"
              :options="userLevelOptions"
            ></b-form-radio-group>
          </b-form-group>
          <BtnLogin title="Sign Up"/>
          <div class="switch-login">
            <b-link class="switch-login-link">Need to login?</b-link>
          </div>
        </b-form>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import BtnLogin from "../components/BtnLogin.vue";
export default {
  name: "signup",
  components: {
    BtnLogin
  },
  data() {
    return {
      //model for signup form i.e. form values go here
      form: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
        selected: "teacher",
        validated: false
      },
      //options for user level
      userLevelOptions: [
        { text: "Teacher", value: "teacher" },
        { text: "Student", value: "student" }
      ]
    };
  },
  methods: {
    //fires when submit button is clicked
    onSubmit(evt) {
      evt.preventDefault();
      //check if both password fields match
      if (this.form.password == this.form.passwordConfirm) {
        alert(JSON.stringify(this.form)); //output form values
      } else {
        alert("Passwords do not match.");
      }
    }
  }
};
</script>

<style>
.login-title {
  background-color: white;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 75px;
  padding-right: 75px;
  font-size: 2.1em;
  font-family: "Open Sans", "Roboto", "sans serif";
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 5px;
}

.form-title {
  font-family: "Open Sans", "Roboto", "sans serif";
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.75em;
}

.login-module {
  width: 512px;
  background-color: white;
  margin-top: 40px;
  border-radius: 10px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 70px;
  padding-top: 30px;
}

.switch-login {
  margin-top: 25px;
  text-align: center;
}

.switch-login-link {
  font-family: "Roboto", "sans serif";
  font-style: italic;
  color: grey;
  text-decoration: none;
}

.switch-login-link:hover {
  color: grey;
}
</style>
