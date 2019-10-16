<template>
  <div class="mywrap">
    <van-nav-bar title="我的" left-arrow fixed @click-left="$router.back()" />
    <div class="infomation">
      <van-cell>
        <template slot="title">
          <div class="myinfo">
            <div class="image">
              <van-image width="70" height="70" src="https://img.yzcdn.cn/vant/cat.jpeg" @click="$router.push('/person')"/>
            </div>
            <div class="name">
              <van-cell title="黑马小公举1号">
                <template slot="label">
                  <van-button class="rebtn" type="primary" size="mini">申请认证</van-button>
                </template>
              </van-cell>
            </div>
            <div class="read">
              <div class="readimg">
                <van-image width="25" height="25" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="readtime">
                <van-cell title="今日阅读" label="5分钟"></van-cell>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <van-grid :column-num="3">
      <van-grid-item text="动态">
        <template slot="icon">33</template>
      </van-grid-item>
      <van-grid-item text="关注">
        <template slot="icon">33</template>
      </van-grid-item>
      <van-grid-item text="粉丝">
        <template slot="icon">33</template>
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <van-cell-group>
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
     
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.image {
  .van-image /deep/ img {
    border-radius: 50%;
  }
}
.rebtn {
  border-radius: 10px;
}
.mywrap {
  margin-top: 46px;
}
.myinfo {
  display: flex;
}
.infomation {
  position: relative;
  .read {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    right: 0;
    background-color: #ccc;
    padding: 0 10px;
    border-radius: 30px 0 0 30px;
    .readtime {
      margin-left: 10px;
      .van-cell {
        background-color: #ccc;
        font-size: 12px;
      }
    }
  }
  .read /deep/ .van-cell {
    padding: 0;
  }
}
</style>