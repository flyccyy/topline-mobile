<template>
  <div>
  
      <van-cell>
        <template slot="title">
          <div class="title_wrap">
            <div class="img_wrap">
              <img :src="commentItem.aut_photo" alt />
            </div>
            <div class="msg">
              <van-cell>
                <template slot="title">{{commentItem.aut_name}}</template>
                <!-- <template slot="label">
               <div>1111</div>
                </template>-->
              </van-cell>
            </div>
            <div>
              <van-icon name="good-job-o" />
              {{commentItem.like_count}}
            </div>
          </div>
          <div class="mycontent">
            <div>{{commentItem.content}}</div>
            <div>
              {{commentItem.pubdate | dateForm}}
              <span @click="reply">回复({{commentItem.reply_count}})</span>
            </div>
          </div>
        </template>
      </van-cell>
  
  </div>
</template>

<script>
import eventbus from "@/utils/eventbus.js";
import { getArticleCom } from "@/api/comment.js";

export default {
  props: ["commentItem"],
  data() {
    return {
      addCommentList: {},
 
    };
  },
  methods: {
    reply() {
      eventbus.$emit("changeShow", {
        show:true,
        //当前这个评论的数据源，什么意思？点击回复时这个数据源
        ...this.commentItem
        
        });
    },
    // onLoad(){
    //   this.loading = false;
    // }
  },
  async mounted() {
    console.log(true);
    // eventbus.$on('fn',(res)=>{
    //  //在writemsg点击发送时，把添加评论返回的数据传给index.vue，因为这里的commentItem是数组里的每一个对象，不是一个数组，所以如果传给这个comment.vue，没有办法渲染出来
    //   console.log(res);
    //   // this.addCommentList = {...this.addCommentList,...res}
    //   this.addCommentList = res;
    //   //应该把这个addCommentList换另一种格式

    // })

    //为什么这里不能获取评论
    // let res = await getArticleCom({
    //   art_id:this.addCommentList.art_id
    // })
    //  console.log(222)
    // console.log(res)
  }
};
</script>

<style lang="less" scoped>
.title_wrap {
  display: flex;

  .msg {
    flex: 1;
  }
}
.img_wrap {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.mycontent {
  margin-left: 66px;
  margin-top: -16px;
}
.van-cell {
  padding-top: 0;
}
</style>