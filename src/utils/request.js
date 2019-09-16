import axios from "axios";
import store from '@/store'

//创建axios对象，
let myrequest = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

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
  error => {
    return Promise.reject(error);
  }
);

export default myrequest;
