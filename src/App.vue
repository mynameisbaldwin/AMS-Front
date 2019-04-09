<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import axios from 'axios';
export default {
  name: "app",
  components: {
    Nav
  }
};
</script>

