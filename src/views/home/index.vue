<template>
  <div class="home-wrap">
    <van-nav-bar title="首页" />
    <!-- 频道区 -->
    <van-tabs v-model="active">
      <div slot="nav-right" class="myIcon" @click="showPopup">
        <van-icon name="wap-nav"></van-icon>
      </div>
      <!-- <van-tab title="'标签1'" v-for="(item,index) in 8 " :key="index">内容{{index}}</van-tab> -->
      <!-- 内容列表 -->

      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <van-pull-refresh v-model="item.downloading" @refresh="onRefresh">
          <van-list
            v-model="item.uploading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(subitem,index) in item.article" :key="index" :title="subitem.title" class="titleList" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      内容
      <van-grid :column-num="3">
        <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getChannel } from "@/api/channel.js";
import * as author from "@/utils/author.js";
import { getArticle } from "@/api/article";
export default {
  name: "home",
  //可以看文档一开始data是怎么赋值的
  data() {
    return {
      active: 0,
      uploading: false,
      finished: false,
      list: [],
      downloading: false,
      show: false,
      channelList: []
    };
  },
  methods: {
    //页面打开时list默认调用
    //在调用onLoad时，list会将自己的loading状态设置为true，即this.loading=true，list会一直处于加载状态
    // onLoad() {
    //   //需要先判断当前list是否已经超过60条数据
    //   if (this.list.length >= 60) {
    //     //结束load方法
    //     // this.finished = true;
    //     // this.loading = false;
    //     return;
    //   }

    //   //给数据添加默认的数据源,上拉过程中，如果触底，for会再次循环，即会再次触发这个onLoad事件，可以设置finished属性限制这个方法的调用
    //   for (var i = 0; i < 20; i++) {
    //     this.list.push(i + 1);
    //   }
    //   //显示加载中就相当于阻断了后面数据的显示
    //   this.loading = false;
    // },
    async onLoad() {
      //获取对应频道的文章数据
      let channel = this.channelList[this.active];
      if (channel.pre_timestamp === 0) {
        let res = await getArticle({
          channel_id: channel.id,
          timestamp: Date.now(),
          with_top: 1
        });
        console.log(res);
        channel.article = res.results;
        //需要将页面上的数据动态变化
        //解构：把数组中的每个对象都拿出来再组成新数组，此时数组中的数据都是更新完的了
        this.channelList = [...this.channelList];
        //把上一页数据的时间戳更新到当前
        channel.pre_timestamp = res.pre_timestamp;
        channel.uploading = false;
        channel.downloading =false;
      }else{
          //第二次进入：触底了就会是第二次
          //一开始打开页面显示的是最新的，往下拉就是从第二页开始就是显示以前的
          let res = await getArticle({
              channel_id:channel.id,
              timestamp:channel.pre_timestamp,
              with_top:1
          })
          channel.article = [...channel.article,...res.results];
          this.channelList = [...this.channelList];
          channel.pre_timestamp = res.pre_timestamp;
          channel.uploading = false;
          channel.downloading = false;


      }
    },
    //触发时Loading变为true
    async onRefresh() {
        let channel = this.channelList[this.active];
        //更新当前频道数据
        channel.article = []
        channel.uploading = false
        //不需要添加downloading,下拉是自动变为true
        channel.finished=false
        channel.pre_timestamp = 0

        let res = await getArticle({
            channel_id:channel.id,
            timestamp:Date.now(),
            with_top:1
        })
        channel.article = res.results;
        channel.pre_timestamp = res.pre_timestamp
        channel.downloading = false
        this.channelList = [...this.channelList]
    },
    showPopup() {
      this.show = true;
    },
    //获取频道数据
    //其实就是相当于把这个函数写在了mounted里面
    async getChannelList() {
      //判断用户是否登录
      //先得到用户的登录信息
      let { use } = this.$store.state;
      if (use) {
        let res = await getChannel();
        this.channelList = res.channels;
      } else {
        //现在这个channel还没有存进localStorage，还没做到那一步
        var channelCache = JSON.parse(window.localStorage.getItem("channel"));
        if (channelCache) {
          //如果本地有缓存
          //channelCache需要是数组还是对象？
          this.channelList = channelCache;
        } else {
          //没有则获取默认的
          let res = await getChannel();
          this.channelList = res.channels;
        }
      }
      this.setChannelItem();
    },
    //给频道数据中的每个对象添加属性
    setChannelItem() {
      this.channelList.forEach(item => {
        item.article = [];
        //上拉：没有更多的提示文字设置为不显示
        item.uploading = false;
        //下拉：加载中的文字设置为不显示
        item.downloading = false;
        item.finished = false;
        //添加属性:上一页数据的时间戳
        item.pre_timestamp = 0;
      });
      console.log(this.channelList);
    }
  },
  //改为created也可以
  mounted() {
    this.getChannelList();
  }
};
</script>
<style lang="less" scoped>
// 标签栏设置固定定位，因为标签栏只是van-tabs的一部分，相当于子组件给父组件传值，因为设置了scoped，只能在当前组件起作用，所以不能影响van-tabs内部的组件，所以要把scoped去掉

//另一种解决方法：vue-loader，scoped css 深度作用选择器

/* 因为tabBar将没有更多了这个文本覆盖了 */
.home-wrap {
  margin-bottom: 50px;
  padding-top: 90px;
}
//深度作用：意思是可以修改当前组件下的子组件
.home-wrap /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0px;
  width: 100%;
  z-index: 999;
}
.myIcon {
  position: fixed;
  top: 58px;
  right: 10px;
}
//写到这里问题：加了这个，频道区不能拖着滑动了，只能点击
.home-wrap /deep/ .van-tabs__nav {
  margin-right: 40px;
  overflow: hidden;
}
.titleList{
    height: 100px;
}
</style>