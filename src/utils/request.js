import axios from "axios";
import store from '@/store'

//创建axios对象，
let myrequest = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

let request_token = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
})

//设置请求拦截
myrequest.interceptors.request.use(
  config => {
    //先拿到token，从vuex拿
    let use = store.state.use;
    if(use && use.token){
      config.headers.Authorization=`Bearer ${use.token}`
    }
    //统一添加token
    return config; //请求头的相关信息
  },
  error => {
    return Promise.reject(error);
  }
);

//设置响应拦截
myrequest.interceptors.response.use(
  response => {
    return response.data.data || response.data;
  },
  async error => {
    if(error.response.status == 401){
      let refresh_token = store.state.use.refresh_token;
      let res = await request_token({
        url:'v1_0/authorizations',
        method:'PUT',
        headers:{
          //用refresh_token发送请求
          Authorization:`Bearer ${refresh_token}`
        }
      })
      //服务器接收到refresh_token并返回新的token
      let token = res.data.data.token;
      store.commit('setUser',{
        token,
        refresh_token
      })
      //再次发送请求到服务器
      return myrequest(error.config)
    }

    return Promise.reject(error);
  }
);

export default myrequest;
