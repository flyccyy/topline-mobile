<template>
  <div class="list-wrap">
    <van-nav-bar title="搜索列表" left-arrow fixed @click-left="onClickLeft" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell-group>
      <van-cell :title="item.aut_name" v-for="(item,index) in dataList" :key="index">
        <template slot="label">
          <div @click="toDetail(item.art_id)">
          {{item.title}}
          </div>
          <van-grid :column-num="3">
            <van-grid-item @click="comment" text="评论" />
            <van-grid-item text="点赞" />
            <van-grid-item text="收藏" />
          </van-grid>
        </template>
      </van-cell>
      <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
    </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import {getSearchPage} from '@/api/article.js'
export default {
  data() {
    return {
      loading:false,
      finished:false,
      key:'',
      page:0,
      per_page:10,
      dataList:[],
    };
  },
  methods: {
    toDetail(art_id){
      this.$router.push('/detail/'+art_id)
    },
    onClickLeft() {},
    async onLoad(){
      this.page++;
      let res = await getSearchPage({
        page:this.page,
        per_page:this.per_page,
        key:this.$route.params.key
      })
      this.dataList = [...this.dataList,...res.results]
      if(this.dataList.length==res.total_count){
        this.finished = true
      }
      this.loading = false
    },
    comment(){
      this.$login();
    }
  }
};
</script>

<style lang="less" scoped>
.list-wrap{
  margin-top: 46px;
}
.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.van-cell{
  border-bottom: 10px solid #eee;
}
</style>