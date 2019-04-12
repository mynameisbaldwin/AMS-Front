<!-- 
Side nav bar for teacher accounts 

Refer to bootstrap-vue documentation on nav components
-->
<template>
  <b-nav vertical id="nav-side">
    <b-nav-item to="/teacher/sessions" active>Sessions</b-nav-item>
    <b-nav-item to="/teacher/classes">Classes</b-nav-item>
    <b-nav-item>Metrics</b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: "NavSide"
};
</script>

<style>
#nav-side {
  height: 100vh;
  box-shadow: 2px 0px 10px -5px #999999;
  padding-top: 90px;
  width: 96px;
  position: fixed;
  z-index: 1;
  left: 0;
  overflow-x: hidden;
}

#nav-side .nav-item {
  margin-bottom: 12px;
}

#nav-side .nav-link {
  font-family: "Roboto", "sans-serif";
  color: black;
}

#nav-side .nav-link.active {
  font-weight: bold;
}

#nav-side .nav-link:hover {
  text-decoration: underline;
}
</style>
