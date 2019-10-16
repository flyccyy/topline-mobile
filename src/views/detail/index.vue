<template>
  <div class="detail_wrap">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 文章标题 -->
    <van-cell>
      <template slot="title">
        <div class="detail_title">{{detailObj.title}}</div>
      </template>
    </van-cell>
    <!-- 作者栏 -->
    <author :detailObj="detailObj"></author>
    <!-- 文章详情 -->
    <van-list v-model="detail_list" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-html="detailObj.content" class="det"></div>
    </van-list>
    <!-- 点赞和不喜欢 -->
    <like :detailObj="detailObj"></like>
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item,index) in commentList" :key="index">
        <!-- 一个组件是一条频率 -->
        <comment :commentItem="item"></comment>
      </div>
    </van-list>
    <!-- 发表评论 -->
    <writemsg :detailObj="detailObj" @fn="addComResult"></writemsg>
    <!-- 回复评论 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <!-- 这个popup是在父组件这，不是在子组件，跟more组件不一样，more组件要控制框的隐藏是在其里面，即点击的也是该组件的部分，而不是父组件，所以要双向绑定，这里点击隐藏的时候是在父组件，所以不需要从子组件传false过来，所以可以用eventbus -->
      <comment :commentItem=
      "currentCommentObj"></comment>
    </van-popup>
  </div>
</template>

<script>
//需要在父组件上面渲染出来的数据都要子传父？像author.vue和like.vue静态页面直接在里面的，就直接渲染，不用传给父组件
import author from "@/views/detail/components/author.vue";
import like from "@/views/detail/components/like.vue";
import comment from "@/views/detail/components/comment.vue";
import writemsg from "@/views/detail/components/writemsg.vue";
import { getDetailById } from "@/api/article.js";
import { getArticleCom } from "@/api/comment.js";
import eventbus from "@/utils/eventbus.js";
export default {
  name: "detail",
  components: {
    author,
    like,
    comment,
    writemsg
  },
  data() {
    return {
      detail_list: false,
      finished: false,
      detailObj: {},
      commentList: [],
      show: false,
      offset: 0,
      limit: 10,
      end_id: -1,
      loading: false,
      finished: false,
      currentCommentObj:{}
    };
  },
  methods: {
    //问题：一进页面不能获取评论列表，必须发送一条评论之后才行
    async onLoad() {
      this.detail_list = false;
      // this.getComment();
      // this.loading = false;
      if(this.offset == this.end_id){
        this.loading = false;
        this.finished = true;
        return;
      }
        if (this.offset === 0) {
        let res1 = await getArticleCom({
          type: "a",
          art_id: this.detailObj.art_id,
          limit: this.limit
        });
        // console.log(222);
        // console.log(res1);
        this.commentList = res1.results;
        //last_id:分页的数据源
        this.offset = res1.last_id;
        //end_id:数据请求完毕的标识
        this.end_id = res1.end_id;
      } else {
        let res = await getArticleCom({
          type: "a",
          art_id: this.detailObj.art_id,
          offset: this.offset,
          limit: this.limit
        });
        this.commentList = [...this.commentList, ...res.results];
        this.offset = res.last_id;
        this.end_id = res.end_id;
      }
      this.loading = false;
    },

    addComResult(value) {
      this.commentList.unshift(value);
      this.commentList = [...this.commentList];
    },
    //获取评论
    // async getComment() {
    //   //第一次请求：不用传offset
    //   if (this.offset === 0) {
    //     let res1 = await getArticleCom({
    //       type: "a",
    //       art_id: this.detailObj.art_id,
    //       limit: this.limit
    //     });
    //     // console.log(222);
    //     // console.log(res1);
    //     this.commentList = res1.results;
    //     //last_id:分页的数据源
    //     this.offset = res1.last_id;
    //     //end_id:数据请求完毕的标识
    //     this.end_id = res1.end_id;
    //   } else {
    //     let res = await getArticleCom({
    //       type: "a",
    //       art_id: this.detailObj.art_id,
    //       offset: this.offset,
    //       limit: this.limit
    //     });
    //     this.commentList = [...this.commentList, ...res.results];
    //     this.offset = res.last_id;
    //     this.end_id = res.end_id;
    //   }
    //   this.loading = false;
    // }
  },
  async mounted() {
    //获取文章详情
    let res = await getDetailById(this.$route.params.art_id);
    console.log(res);
    this.detailObj = res;

// this.getComment();
    eventbus.$on("changeShow", res => {
      this.show = res.show;
      this.currentCommentObj = res;
    });
  }
};
</script>

<style lang="less">
.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.detail_wrap {
  padding-top: 46px;
  margin-bottom: 58px;

  .detail_title {
    font-size: 22px;
    font-weight: 700;
  }
}
.det {
  padding: 0 15px;
}
// .van-cell{
//     padding-top: 15px;
// }
</style>