import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import Sessions from "./views/Teacher/Sessions.vue";
import SessionCurrent from "./views/Teacher/SessionCurrent.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/login",
      name: "login"
    },
    {
      path: "/teacher/sessions",
      name: "sessions",
      component: Sessions
    },
    {
      path: "/teacher/current_session",
      name: "current_session",
      component: SessionCurrent
    }
  ]
});
