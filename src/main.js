import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import zh_CN from 'vee-validate/dist/locale/zh_CN.js';
import VeeValidate,{Validator} from 'vee-validate'


Vue.use(Vant);
Vue.use(VeeValidate,{
  events:''
})
Validator.localize('zh_CN',zh_CN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
