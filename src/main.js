import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import Bootbox from "bootbox";
import VueGlobalVariable from "vue-global-var";
import "bootstrap";
import "jquery";
import "popper.js";
import "./assets/app.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Bootbox);
Vue.use(VueGlobalVariable, {
  globals: {
    api: "http://ec2-18-220-213-7.us-east-2.compute.amazonaws.com/api/"
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
