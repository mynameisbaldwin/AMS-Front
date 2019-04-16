<template>
  <div id="app">
    <Nav v-if="teacherLogin"/>
    <NavHome v-if="!teacherLogin" />
    <router-view/>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import NavHome from "./components/NavHome.vue";
import axios from 'axios';
export default {
  name: "app",
  components: {
    Nav,
    NavHome
  },
  data() {
    return {
      teacherLogin: false
    }
  }
};
</script>

