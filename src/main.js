import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Dialog } from 'vant';
import 'vant/lib/index.css';
import zh_CN from 'vee-validate/dist/locale/zh_CN.js';
import VeeValidate,{Validator} from 'vee-validate'


import { Lazyload } from 'vant';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import myplugin from '@/utils/loginplugin.js'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VeeValidate,{
  events:''
})
Vue.use(myplugin)
Validator.localize('zh_CN',zh_CN)
dayjs().format()
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

//使用全局过滤器
Vue.filter('dateFormat',(val)=>{
  return dayjs().from(dayjs(val))
})

Vue.filter('dateForm',(val)=>{
  return dayjs(val).format('MM-DD hh:mm')
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
