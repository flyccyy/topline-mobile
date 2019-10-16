//验证是否登录的方法
import Vue from "vue";
// 导入 store
import store from "@/store";
// 导入 dailog
import { Dialog } from "vant";
// 导入 router
import router from "@/router";

Vue.use(Dialog);

//Vue.use的本质是调用Dialog的install方法，所以可以像下面这样自己定义插件

var myplugin = {};
//这里的vue只是一个形参
myplugin.install = function(Vue) {
  Vue.prototype.$login = function() {
    //判断是否登录，没有则返回登录页
    let user = store.state.user;
    if (!user || user.token) {
      Dialog.confirm({
        title: "注意",
        message: "进行当前操作需要先登录"
      })
        .then(() => {
          router.push("/login");
        })
        .catch(() => {
          return;
        });
    }
  };
};
export default myplugin;