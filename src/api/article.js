
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

// 暴露给外界
export { getArticle };
