<!-- 
Top nav bar 

Refer to bootstrap-vue documentation on nav components
-->
<template>
  <b-navbar id="nav-top" fixed="top" toggleable="lg">
    <b-navbar-brand id="ams-brand" to="/">Safety Net</b-navbar-brand>
    <b-navbar-toggle class="ml-auto" id="nav-toggle" target="nav-collapse"/>
    <b-collapse is-nav id="nav-collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown id="last-nav" text="Account" right>
          <b-dropdown-item to="/teacher/sessions">Sessions</b-dropdown-item>
          <b-dropdown-item to="/teacher/classes">Classes</b-dropdown-item>
          <b-dropdown-item to="/login" v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-button id="btn-new-session" to="/teacher/sessions/new_session">New Session</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import bootbox from "bootbox";
export default {
  name: "Nav",
  methods: {
    logout() {
      delete localStorage.token;
      delete localStorage.userId;
      this.$parent.tokenExist = false;
    }
  }
};
</script>

<style scoped>
#nav-top {
  background-color: white;
  color: black;
  box-shadow: 0px 2px 10px -5px #999999;
}

#ams-brand {
  font-family: "Roboto";
  font-weight: bold;
}

.nav-item {
  border-right: 1px dotted grey;
}

#nav-toggle {
  margin-left: 2px;
}

#last-nav {
  border-right: 0;
  margin-right: 15px;
}

#btn-new-session {
  background-color: inherit;
  color: black;
  font-weight: bold;
  border-color: black;
  border-radius: 30px;
}

#btn-new-session:hover {
  color: white;
  background-color: black;
}
</style>
