import axios from "axios";

let myrequest = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

//设置请求拦截
myrequest.interceptors.request.use(
  config => {
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
