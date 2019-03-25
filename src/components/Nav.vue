<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Safety Net</b-navbar-brand>
      <b-navbar-toggle class="ml-auto" id="nav-toggle" target="nav-collapse"/>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about">Account</b-nav-item>
          <b-nav-item href="#" id="last-nav">Logout</b-nav-item>
          <b-button id="btn-new-session">New Session</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style>
</style>
