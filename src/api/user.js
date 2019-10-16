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

//关注用户
function focusUser(aut_id){
    return request({
        url:'v1_0/user/followings',
        method:'POST',
        data:{
            target:aut_id
        }
    })
}

//取消关注用户
function unfocusUser(aut_id){
    return request({
        url:'v1_0/user/followings/'+aut_id,
        method:'DELETE'
    })
}

//获取个人资料
function getUserProfile(){
    return request({
        url:'v1_0/user/profile',
        method:'GET'
    })
}

//用户头像编辑
function userPhoto(photo){
    let fd = new FormData();
    fd.append('photo',photo)
    return request({
        url:'v1_0/user/photo',
        method:'PATCH',
        data:fd
    })
}
export {
    userLogin,focusUser,unfocusUser,getUserProfile,userPhoto
}