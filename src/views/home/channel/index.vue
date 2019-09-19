<template>
  <div>
    <!-- 点遮罩弹框消失? -->
    <!-- 这里本来是v-model，所以可以绑定value -->
    <!-- 这个弹框只要点击遮罩层show就会变为false，然后传给父，注册的要是Input事件 ，$event不能改为value，因为这里:value而不是v-model?-->
    <van-popup
      :style="{height:'90%'}"
      position="bottom"
      :value="value"
      @input="$emit('input',$event)"
    >
      <div class="mybox">
        <div class="channel_top">
          <div class="mychannel">
            我的频道
            <span>点击进入频道</span>
          </div>
          <div class="edit_btn">
            <input v-if="!clearBtn" type="button" value="编辑" @click="channel_edit" />
            <input v-else type="button" value="完成" @click="channel_finish" />
          </div>
        </div>
        <van-grid :clickable="true">
          <van-grid-item
            v-for="(item,index) in mychannelList"
            :key="item.id"
            @click="$emit('update:channelActive',index)"
          >
            <div slot="text" class="channel_text">
              <div :class="{active:channelActive===index}">{{item.name}}</div>
              <van-icon
                name="clear"
                class="clear_icon"
                v-show="clearBtn"
                @click="delChannel(index)"
              />
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="mybox">
        <div class="channel_top">
          <div class="mychannel">
            频道推荐
            <span>点击进入频道</span>
          </div>
        </div>
        <van-grid>
          <van-grid-item v-for="item in computechannel" :key="item.id">
            <div slot="text" class="channel_text" @click="tomychannel(item)">
              <div>{{item.name}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannel, loginChannel } from "@/api/channel.js";
export default {
  props: ["value", "mychannelList", "channelActive"],
  data() {
    return {
      clearBtn: false,
      allChannelList: []
    };
  },
  //没有固定推荐信息?
  methods: {
      //存的都是我的频道中的数据
    async delChannel(index) {
      this.mychannelList.splice(index, 1);
     //已登录，将新的列表数据存到服务器
      if(this.$store.state.use){
             let channels = this.mychannelList.slice(1).map((item, index) => {
          //这里的return是返回给数组里面的元素
          return {
            id: item.id,
            seq: index + 2
          };
        });
        await loginChannel({ channels: channels });
      }
       //未登录的删除频道操作：存到本地
      else{
          window.localStorage.setItem(
            "channel",
            JSON.stringify(this.mychannelList)
          );
      }
    },
    channel_edit() {
      this.clearBtn = true;
    },
    channel_finish() {
      this.clearBtn = false;
    },
    async tomychannel(item) {
      //点击频道推荐中的数据时，将数据保存到本地
      this.mychannelList.push(item);
      //未登录的添加频道操作：存到本地
      let user = this.$store.state.use;
      if (!user || !user.token) {
        window.localStorage.setItem(
          "channel",
          JSON.stringify(this.mychannelList)
        );
      } else {
        //将mychannelList改造为channels
        let channels = this.mychannelList.slice(1).map((item, index) => {
          //这里的return是返回给数组里面的元素
          return {
            id: item.id,
            seq: index + 2
          };
        });
        await loginChannel({ channels: channels });
      }
    }
  },
  async mounted() {
    let res = await getAllChannel();
    console.log(res);
    this.allChannelList = res.channels;
    //给所有的频道都添加自定义属性，这样后面追加到我的频道的数据也都有这些属性了
    this.allChannelList.forEach(item => {
      this.$set(item, "article", []);
      this.$set(item, "uploading", false);
      this.$set(item, "downloading", false);
      this.$set(item, "finished", false);
      this.$set(item, "pre_timestamp", 0);
    });
  },
  computed: {
    computechannel() {
      let newArr = this.mychannelList.map(item => {
        return item.id;
      });
      //返回的是让条件为true的数组的元素
      let commandChannel = this.allChannelList.filter(item => {
        return !newArr.includes(item.id);
      });
      return commandChannel;
    }
  }
};
</script>

<style lang="less" scoped>
.mybox {
  margin-bottom: 30px;
  box-sizing: border-box;
  .channel_top {
    padding: 15px;
    display: flex;
    justify-content: space-between;

    .mychannel {
      font-size: 16px;
      span {
        font-size: 12px;
        color: #aaa;
      }
    }
    .edit_btn {
      input {
        background-color: #fff;
        border: 1px solid #f00;
        border-radius: 15px;
        padding-left: 10px;
        padding-right: 10px;
        color: #f00;
      }
    }
  }
  .van-grid-item {
    position: relative;
  }
  .channel_text {
    font-size: 12px;
    color: #aaa;
    .active {
      color: #f00;
    }
    .clear_icon {
      position: absolute;
      right: 5px;
      top: -5px;
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>