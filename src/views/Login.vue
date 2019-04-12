<template>
  <b-container fluid class="login-wrapper">
    <b-row align-v="center" align-h="center">
      <div class="login-title">Safety Net</div>
    </b-row>
    <b-row align-v="center" align-h="center">
      <div class="login-module">
        <h2 class="form-title">Log In</h2>
        <b-form @submit="onSubmit">
          <b-form-group id="username" label="Username" label-for="usernameIn">
              <b-form-input id="usernameIn" v-model="form.username" placeholder="Username" required></b-form-input>
          </b-form-group>
          <b-form-group id="password" label="Password" label-for="passwordIn">
              <b-form-input type="password" id="passwordIn" v-model="form.password" placeholder="Password" required></b-form-input>
          </b-form-group>
          <BtnLogin title="Log In"/>
          <div class="switch-login">
            <b-link class="switch-login-link" to="/signup">Need to sign up?</b-link>
          </div>
        </b-form>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import BtnLogin from "../components/BtnLogin.vue";
export default {
  name: "login",
  components: {
    BtnLogin
  },
  data() {
    return {
      //model for signup form i.e. form values go here
      form: {
        username: "",
        password: "",
        validated: false
      }
    };
  },
  methods: {
    //fires when submit button is clicked
    onSubmit(evt) {
      evt.preventDefault();
      //TODO: CHECK USER AND PASSWORD TO DATABASE
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
