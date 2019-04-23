<template>
  <div class="home">
    <div class="splash">
      <h1 id="home-title">Safety Net</h1>
      <h2 id="home-subtitle">The all-in-one attendance management app</h2>
      <div id="home-signup">
        <b-button id="btn-signup" to="/signup">Sign Up</b-button>
      </div>
    </div>
    <div class="home-row">
      <h2 class="home-row-head">Attendance Made Easy</h2>
      <!-- Temporary boxes for listing app benefits -->
      <div class="home-benefits">
        <div class="home-benefits-item">
          <div class="home-benefits-image">
            <img class="img-benefits" src="../assets/studentLogo.png">
            <p class="benefits-text">
              <strong>Safety Net</strong> allows teachers to easily track student attendance. 
              Create a session for every class and <strong>quickly mark</strong> every student in the class roster.
            </p>
          </div>
        </div>
        <div class="home-benefits-item">
          <div class="home-benefits-image">
            <img class="img-benefits" src="../assets/verified.png">
            <p class="benefits-text">
              Teachers can <strong>easily manage</strong> classes, sessions, and rosters.
              <strong>Safety Net</strong> makes it easy for you to create, delete, or update your attendance data.
            </p>
          </div>
        </div>
        <div class="home-benefits-item">
          <img class="img-benefits" src="../assets/presentation.png">
          <p class="benefits-text">
              Want to know who comes to class? Check out <strong>metric graphs</strong> of your data to quickly assess overall attendance.
            </p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style>
.splash {
  background-color: #0091ff;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 50px;
}

#home-title {
  text-align: center;
  font-size: 122pt;
  font-family: "Open Sans", "sans-serif";
  font-weight: bold;
  color: white;
  letter-spacing: 10px;
  margin-bottom: 0;
}

#home-subtitle {
  text-align: center;
  font-size: 30pt;
  font-family: "Roboto", "sans-serif";
  font-style: italic;
  font-weight: light;
  color: white;
  margin-top: 30px;
  margin-bottom: 50px;
}

#home-signup {
  display: flex;
  justify-content: center;
}

#btn-signup {
  font-size: 30pt;
  font-family: "Roboto", "sans-serif";
  background-color: inherit;
  color: white;
  border: 3px solid white;
  border-radius: 10px;
  padding-left: 50px;
  padding-right: 50px;
}

#btn-signup:hover {
  background-color: white;
  color: #0091ff;
}

.home-row {
  width: 100%;
  background-color: white;
  padding-top: 50px;
  padding-bottom: 50px;
}

.home-row-head {
  font-family: "Open Sans", "Roboto", "sans-serif";
  font-size: 50pt;
  text-align: center;
  font-weight: bold;
}

.home-benefits {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.home-benefits-item {
  width: 275px;
  height: 300px;
  margin-right: 60px;
}

.img-benefits {
  width: 100px;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.benefits-text {
  margin-top: 30px;
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
  font-size: 14pt;
}
</style>

