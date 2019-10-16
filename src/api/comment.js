import request from '@/utils/request.js'
//添加文章评论
function addComment({art_id,content,id}){
    return request({
        url:'v1_0/comments',
        method:'POST',
        data:{
            target:art_id,
            content,
            art_id:id ||null
        }
    })
}


//获取文章评论
function getArticleCom({type,art_id,offset,limit}){
    return request({
        url:'v1_0/comments',
        method:'GET',
        params:{
            type:type,
            source:art_id,
            offset:offset || null,
            limit:limit ||null
        }
    })
}
export  {addComment,getArticleCom}
