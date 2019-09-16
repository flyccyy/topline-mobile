//封装频道相关的请求
import request from '@/utils/request.js'
function getChannel(){
    return request({
        url:'v1_0/user/channels',
        method:'GET'
    })
}
export {
    getChannel
}