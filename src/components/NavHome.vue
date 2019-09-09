<!-- 
Top nav bar for guests who are not logged in 

Refer to bootstrap-vue documentation on nav components
-->
<template>
  <b-navbar id="nav-top" fixed="top" toggleable="lg">
    <b-navbar-brand id="ams-brand" to="/">Safety Net</b-navbar-brand>
    <b-navbar-toggle class="ml-auto" id="nav-toggle" target="nav-collapse"/>
    <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav class="ml-auto">
            <b-nav-item to="/signup">Sign Up</b-nav-item>
            <b-nav-item id="last-nav" to="/login">Log In</b-nav-item>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import bootbox from "bootbox";
export default {
  name: "NavHome"
};
</script>

<style>
#nav-top {
  background-color: white;
  color: black;
  box-shadow: 0px 2px 10px -5px #999999;
}

#ams-brand {
  font-family: "Roboto";
  font-weight: bold;
}

#nav-toggle {
  margin-left: 2px;
}

#last-nav {
  border-right: 0;
  margin-right: 15px;
}
</style>
