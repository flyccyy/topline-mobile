<template>
  <div>
    <!-- dialog要注册的是input事件？ -->
    <van-dialog
      :value="value"
      :showConfirmButton="false"
      closeOnClickOverlay
      @input="$emit('input',$event)"
    >
      <van-cell-group>
        <van-cell title="隐藏此信息" icon="location-o" @click="hidden(art_id)" />
        <van-cell title="举报" icon="location-o" is-link @click="showReport" />
        <van-cell title="拉黑" icon="location-o" @click="blacklist" />
      </van-cell-group>
    </van-dialog>
    <van-dialog :value="isReport" :showConfirmButton="false" closeOnClickOverlay>
      <van-cell-group>
        <van-cell is-link arrow-direction="left" @click="isReport = false"></van-cell>
        <van-cell
          v-for="(item,index) in reportList"
          :key="index"
          :title="item.name"
          @click="reportListItem(item.value)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { dislikeArticle, blacklistAuthor, report } from "@/api/article";
export default {
  props: ["value", "art_id", "aut_id"],
  data() {
    return {
      isReport: false,
      reportList: [
        {
          value: 0,
          name: "其他问题"
        },
        {
          value: 1,
          name: "标题夸张"
        },
        {
          value: 2,
          name: "低俗色情"
        },
        {
          value: 3,
          name: "错别字多"
        },
        {
          value: 4,
          name: "旧闻重复"
        },
        {
          value: 5,
          name: "广告软文"
        },
        {
          value: 6,
          name: "内容不实"
        },
        {
          value: 7,
          name: "涉嫌违法犯罪"
        },
        {
          value: 8,
          name: "侵权"
        }
      ]
    };
  },
  methods: {
    //target无效？
    async reportListItem(val) {
      try {
        let res = await report({
          art_id: this.art_id,
          type: val
        });
        this.$toast.success("举报成功");

        console.log(111);
        console.log(res);
      } catch (error) {
        if (error.response.status == 409) {
          this.$toast.fail("该用户已被举报");
        } else {
          this.$toast.fail("举报失败");
        }
      } finally {
        this.isReport = false;
        this.$emit("input", false);
      }
    },
    showReport() {
      this.isReport = true;
    },
    async hidden(artid) {
      try {
        let res = await dislikeArticle(artid);
        console.log(res);
        this.$toast.success("取关成功");
        this.$emit("getAriId", artid);
      } catch (error) {
        this.$toast.fail("取关失败");
      } finally {
        this.$emit("input", false);
      }
    },
    async blacklist() {
      try {
        await blacklistAuthor(this.aut_id);
        this.$toast.success("拉黑成功");
      } catch (error) {
        this.$toast.fail("拉黑失败");
      } finally {
        this.$emit("input", false);
      }
    }
  }
};
</script>

<style>
</style>