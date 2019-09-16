<template>
  <div>
    <router-view></router-view>

    <!-- 封装底部的tabBar -->
    <!-- 底部tabBar -->
    <!-- route开启路由，通过to跳转 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to>视频</van-tabbar-item>
      <van-tabbar-item icon="friends-o">问答</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当不知道active是变量还是字符串时，可以先在页面输出{{active}}，再点击每个tabbar-item看输出的是什么，这里输出的数字索引
      active: 0
    };
  }
};
</script>

<style>
</style>