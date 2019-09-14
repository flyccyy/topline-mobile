//封装所有用户相关的网络请求
import request from '@/utils/request.js'

//添加方法：专门用于用户登录
function userLogin({mobile,code}){
    return request({
        url: "v1_0/authorizations",
        method: "POST",
        data: {
          mobile,
          code
        }
    })
}
export {
    userLogin
}