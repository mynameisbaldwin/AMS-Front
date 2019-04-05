<template>
  <div id="currentSession">
    <NavSide/>
    <div class="teacher-wrapper">
      <h1 class="teacher-head">Current Session - Class Name</h1>
      <h2 class="session-datetime">March 30th, 9:30 - 10:30am</h2>
      <h3 class="session-timeleft">
        This session will automatically end in
        <b>45 minutes...</b>
      </h3>
      <div id="unaccounted">
        <h3 class="table-title">Unnaccounted Students</h3>
      </div>
    </div>
  </div>
</template>

<script>
import NavSide from "../../components/NavSide.vue";
export default {
  name: "SessionCurrent",
  components: {
    NavSide
  }
};
</script>

<style>
.session-datetime {
  font-family: "Open Sans", "Roboto", "sans serif";
}

.session-timeleft {
  font-family: "Roboto", "sans serif";
  font-style: italic;
  font-size: 14pt;
  margin-bottom: 100px;
}

.table-title {
  font-family: "Open Sans", "Roboto", "sans serif";
  font-weight: bold;
  font-size: 22pt;
}
</style>
