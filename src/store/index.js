import Vue from 'vue'
import Vuex from 'vuex'

import {setAuthor,getAuthor} from '@/utils/author.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录成功的时候token存进了localstorage,现在是把它从localstorage存到vuex中
    use:getAuthor()
  },
  mutations: {
    //在这里直接通过mutations存进vuex,在index.vue里面就不用写setAuthor,直接调用mutations的方法存
    setUser(state,val){
      setAuthor(val)
    }
  },
  actions: {

  }
})
