<template>
  <div class="twoBtn">
    <!-- 点赞之后是实心defautl，没点赞是空心红色
    点了不喜欢之后是实心白色，没点是空心红色-->
    <van-button type="default" icon="star" v-if="detailObj.attitude === 1" @click="dislike">取消点赞</van-button>
    <van-button type="danger" icon="star-o" v-else @click="like">点赞</van-button>
    <van-button v-if="detailObj.attitude === 0" type="default" icon="like" @click="dishate">取消不喜欢</van-button>
    <van-button v-else type="danger" icon="like-o" @click="hate">不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle,disLikeArticle,hateArticle,disHateArticle } from "@/api/article.js";
export default {
  props: ["detailObj"],
  methods: {
    async like() {
      try {
        let res = await likeArticle(this.detailObj.art_id);
        this.detailObj.attitude = 1;
        this.$toast.success('点赞成功')
      } catch (error) {
        this.$toast.fail('点赞失败')
      }
    },
    async dislike(){
      try {
           let res = await disLikeArticle(this.detailObj.art_id);
        this.detailObj.attitude = -1;
        this.$toast.success('取消点赞成功')
      } catch (error) {
        this.$toast.fail('取消点赞失败')
      }
    },
    async hate(){
      try{
        await hateArticle(this.detailObj.art_id);
          this.detailObj.attitude = 0;
        this.$toast.success('不喜欢文章成功')
      }catch(err){
         this.$toast.fail('不喜欢文章失败')
      }
    },
    async dishate(){
      try{
        await disHateArticle(this.detailObj.art_id);
          this.detailObj.attitude = -11;
        this.$toast.success('取消不喜欢文章成功')
      }catch(err){
         this.$toast.fail('取消不喜欢文章失败')
      }
    },


  }
};
</script>

<style lang="less">
.twoBtn {
  text-align: center;
  .van-button {
    margin: 0 20px;
  }
}
</style>