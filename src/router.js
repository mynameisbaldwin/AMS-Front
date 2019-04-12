import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import Login from "./views/Login.vue";
import Sessions from "./views/Teacher/Sessions.vue";
import SessionCurrent from "./views/Teacher/SessionCurrent.vue";
import SessionView from "./views/Teacher/SessionView.vue";
import Classes from "./views/Teacher/Classes.vue";
import EditClasses from "./views/Teacher/EditClasses.vue";
import EditRoster from "./views/Teacher/EditRoster.vue";
import PageNotFound from "./views/PageNotFound.vue";
import bootbox from "bootbox";

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
      name: "login",
      component: Login
    },
    {
      path: "/teacher/sessions",
      name: "sessions",
      component: Sessions
    },
    {
      path: "/teacher/sessions/:sessionId",
      name: "view_session",
      component: SessionView,
    },
    {
      path: "/teacher/current_session",
      name: "current_session",
      component: SessionCurrent,
      beforeEnter: (to, from, next) => {
        bootbox.confirm("Are you sure?", function(result) {
          result ? next() : next(false);
        });
      }
    },
    {
      path:"/teacher/classes",
      name: "classes",
      component: Classes
    },
    {
      path:"/teacher/edit_classes",
      name: "edit_classes",
      component: EditClasses
    },
    {
      path:"/teacher/edit_roster",
      name: "edit_roster",
      component: EditRoster
    },
    {
      path: "*",
      name: "error_404",
      component: PageNotFound
    }
  ]
});
