
import request from "@/utils/request";

// 获取文章数据
function getArticle({ channel_id, timestamp, with_top }) {
  return request({
    url: "v1_1/articles",
    method: "GET",
    params: {
      channel_id,
      timestamp,
      with_top
    }
  });
}

//不喜欢文章
function dislikeArticle(art_id){
  return request({
    url:'v1_0/article/dislikes',
    method:'POST',
    data:{
      target:art_id
    }
  })
}

//拉黑作者
function blacklistAuthor(aut_id){
  return request({
    url:'v1_0/user/blacklists',
    method:'POST',
    data:{
      target:aut_id
    }
  })

}

//举报
function report({art_id,type}){
  return request({
    url:'v1_0/article/reports',
    method:'POST',
    data:{
      target:art_id,
      type:type,
      remark:'谢谢举报'
    }
  })
}

//联想
function thinkSuggest(key){
  return request({
    url:'v1_0/suggestion',
    method:'GET',
    params:{
      q:key
    }
  })
}

//根据关键字获取分页数据
function getSearchPage({page,per_page,key}){
  return request({
    url:'v1_0/search',
    method:'GET',
    params:{
      page,
      per_page,
      q:key
    }
  })
}

//根据文章id获取文章详情
function getDetailById(art_id){
  return request({
    url:`v1_0/articles/${art_id}`,
    method:'GET'
  })
}

//点赞文章
function likeArticle(art_id){
  return request({
    url:'v1_0/article/likings',
    method:'POST',
    data:{
      target:art_id
    }
  })
}

//取消点赞
function disLikeArticle(art_id){
  return request({
    url:'v1_0/article/likings/'+art_id,
    method:'DELETE',
   
  })
}

//不喜欢文章
function hateArticle(art_id){
  return request({
    url:'v1_0/article/dislikes',
    method:'POST',
    data:{
      target:art_id
    }
  })
}

//取消不喜欢文章
function disHateArticle(art_id){
  return request({
    url:'v1_0/article/dislikes/'+art_id,
    method:'DELETE'
  })
}
// 暴露给外界
export { getArticle,dislikeArticle,blacklistAuthor,report,thinkSuggest,getSearchPage,getDetailById,likeArticle,disLikeArticle,hateArticle,disHateArticle };
