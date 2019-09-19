import Vue from "vue";
import Router from "vue-router";
// import login from "@/views/login";

Vue.use(Router);

export default new Router({
  //跳过登录页面的话，其他页面不需要做登录验证，之前的pc端是后台管理，这个移动端不是，所以其他页面不需要做登录验证
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/',
      component:()=>import('@/views/tabBar_layout'),
      children:[
        {
          path:'home',
          component:()=>import('@/views/home')
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login")
    },
    {
      name:'search',
      path:'/search',
      component:()=>import('@/views/search')
    },
    {
      name:'list',
      path:'/list/:key',
      component:()=>import('@/views/list')
    }
  ]
});
