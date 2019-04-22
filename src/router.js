import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import Login from "./views/Login.vue";
import Teacher from "./components/Teacher.vue";
import Sessions from "./views/Teacher/Sessions.vue";
import SessionNew from "./views/Teacher/SessionNew.vue";
import SessionCurrent from "./views/Teacher/SessionCurrent.vue";
import SessionView from "./views/Teacher/SessionView.vue";
import Classes from "./views/Teacher/Classes.vue";
import EditClasses from "./views/Teacher/EditClasses.vue";
import EditRoster from "./views/Teacher/EditRoster.vue";
import PageNotFound from "./views/PageNotFound.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
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
      path: "/teacher",
      component: Teacher,
      redirect: { name: "sessions" },
      meta: { teacherLogin: true }, //will use for authorization
      children: [
        {
          path: "sessions",
          name: "sessions",
          component: Sessions
        },
        {
          path: "sessions/new_session",
          name: "new_session",
          component: SessionNew
        },
        {
          path: "sessions/current_session",
          name: "current_session",
          component: SessionCurrent
        },
        {
          path: "sessions/:sessionId",
          name: "view_session",
          component: SessionView
        },
        {
          path: "classes",
          name: "classes",
          component: Classes
        },
        {
          path: "classes/edit_classes",
          name: "edit_classes",
          component: EditClasses
        },
        {
          path: "classes/edit_roster/:classId",
          name: "edit_roster",
          component: EditRoster
        }
      ]
    },
    {
      path: "*",
      name: "error_404",
      component: PageNotFound
    }
  ]
});

//router.beforeEach() for authorization
