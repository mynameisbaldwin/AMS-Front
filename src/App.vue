<template>
  <div id="app">
    <div v-if="tokenExist == true">
      <Nav />
    </div>
    <div v-else>
      <NavHome />
    </div>
    <router-view/>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import NavHome from "./components/NavHome.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    Nav,
    NavHome
  },
  data() {
    return {
      tokenExist: false
    }
  },
  created() {
      if(localStorage.token) this.tokenExist = true;
      else this.tokenExist = false;
  }
};
</script>

