import Vue from "vue";
import Router from "vue-router";
// import login from "@/views/login";

Vue.use(Router);

export default new Router({
  routes: [
    { 
      name: "login",
      path: "/login", 
      component: () => import("@/views/login")  }
  ]
});
