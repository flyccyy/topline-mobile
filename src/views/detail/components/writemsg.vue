<template>
  <div class="write-wrap">
    <van-cell fixed>
      <template slot="title">
        <div class="write">
          <div class="ipt">
            <van-field left-icon="edit" v-model="writemsg" placeholder="写评论" />
          </div>
          <div class="btn">
            <van-button @click="sendComment">发送</van-button>
          </div>
          <div class="star">
            <van-icon name="star-o" />
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {addComment} from '@/api/comment.js'
//将res交给bus
import eventbus from '@/utils/eventbus.js'
export default {
  props:['detailObj'],
  data() {
    return {
      writemsg: "",
      addCommentObj:{},
    };
  },
  methods: {
    async sendComment(){
      let res = await addComment({
        art_id:this.detailObj.art_id,
        content:this.writemsg
      })
      console.log(res)
      this.addCommentObj = res;
      this.$emit('fn',res.new_obj)
      this.writemsg = ''
      // eventbus.$emit('fn',res.new_obj)

    }
  },
};
</script>

<style lang="less" scoped>
.btn>.van-button {
  background-color: #df5541;
  color: #fff;
  margin-right: 20px;
  margin-left: 20px;
  border:none;
  height: 36px;
  line-height: 36px;
}
.write {
  display: flex;
  align-items: center;
  .ipt{
      flex:1;
      .van-field{
          background-color: #ddd;
          border-radius:20px;
          // height: 36px;
          // line-height: 36px;
      }
  }
}
.star{
    margin-right: 10px;
}
.write-wrap{
  position: fixed;
  left:0;
  bottom:0;
}
</style>