<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="title_wrap">
          <div class="img_wrap">
            <img :src="detailObj.aut_photo" alt />
          </div>
          <van-cell>
            <template slot="title">
              <div>{{detailObj.aut_name}}</div>
            </template>
            <template slot="label">
              <div>{{detailObj.pubdate | dateFormat}}</div>
            </template>
          </van-cell>
          <div class="focus">
            <van-button type="danger" size="small" v-if="!detailObj.is_followed" @click="focus">关注</van-button>
            <van-button
              type="default"
              size="small"
              v-if="detailObj.is_followed"
              @click="unfocusUser"
            >取消关注</van-button>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { focusUser, unfocusUser } from "@/api/user.js";
export default {
  props: ["detailObj"],
  data() {
    return {};
  },
  methods: {
    async focus() {
      try {
        let res = await focusUser(this.detailObj.aut_id);
        this.$toast.success("关注成功");
        this.detailObj.is_followed = true;
      } catch (error) {
        this.$toast.fail("关注失败");
      }
    },
    async unfocusUser() {
      try {
        let res = await unfocusUser(this.detailObj.aut_id);

         this.$toast.success("取关成功");
        this.detailObj.is_followed = false;
      } catch (error) {
          this.$toast.fail("取关失败");
      }
    }
  }
};
</script>

<style lang="less">
.title_wrap {
  display: flex;
  align-items: center;
  .van-cell {
    flex: 1;
  }
}
.img_wrap {
  img {
    width: 40px;
    height: 40px;
  }
}
</style>