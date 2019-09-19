//封装频道相关的请求
import request from '@/utils/request.js'
function getChannel(){
    return request({
        url:'v1_0/user/channels',
        method:'GET'
    })
}
function getAllChannel(){
    return request({
        url:'v1_0/channels',
        method:'GET'
    })
}
//channels是数组，这里传参写{channels}?
function loginChannel({channels}){
    return request({
        url:'v1_0/user/channels',
        method:'PUT',
        data:{
            channels:channels
        }

    })
}
export {
    getChannel,
    getAllChannel,
    loginChannel
}