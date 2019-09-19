
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
// 暴露给外界
export { getArticle,dislikeArticle,blacklistAuthor,report };
