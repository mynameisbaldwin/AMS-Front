import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import SignUpSuccess from "./views/SignUpSuccess.vue";
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
import Metrics from "./components/Metrics.vue";

Vue.use(Router);

const router = new Router({
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
      path: "/signup_success",
      name: "signup_success",
      component: SignUpSuccess,
      meta: { signUpSuccess: true }
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
          component: Sessions,
          meta: { teacherLogin: true }
        },
        {
          path: "sessions/new_session",
          name: "new_session",
          component: SessionNew,
          meta: { teacherLogin: true }
        },
        {
          path: "sessions/:classId/current_session",
          name: "current_session",
          component: SessionCurrent,
          meta: { teacherLogin: true }
        },
        {
          path: "sessions/:sessionId",
          name: "view_session",
          component: SessionView,
          meta: { teacherLogin: true }
        },
        {
          path: "classes",
          name: "classes",
          component: Classes,
          meta: { teacherLogin: true }
        },
        {
          path: "classes/edit_classes",
          name: "edit_classes",
          component: EditClasses,
          meta: { teacherLogin: true }
        },
        {
          path: "classes/edit_roster/:classId",
          name: "edit_roster",
          component: EditRoster,
          meta: { teacherLogin: true }
        },
        {
          path: "metrics",
          name: "metrics",
          component: Metrics,
          meta: { teacherLogin: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.teacherLogin)) {
    if (localStorage.token) {
      next();
    } else {
      router.replace("/login");
    }
  } else if (to.matched.some(record => record.meta.signUpSuccess)) {
    if (localStorage.signUp) {
      next();
    } else {
      router.replace("/signup");
    }
  } else {
    next();
  }
});

export default router;
