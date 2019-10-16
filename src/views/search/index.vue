<template>
  <div>
    <van-search
      v-model="key"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(key)"
      @cancel="onCancel"
    />
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(item,index) in searchList"
        :key="index"
        @click="onSearch(item.item)"
      >
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group>
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <van-icon name="delete" v-if="!isDelete" @click="isDelete=true"/>
        </template>
        <div v-if="isDelete">
          <span @click="delAll">删除全部 </span>
          <span @click="isDelete=false">完成</span>
        </div>
      </van-cell>
      <van-cell :title="item" icon="search" v-for="(item,index) in localSearchList" :key="index" @click="onSearch(item)">
        <template slot="right-icon">
          <van-icon name="close" v-if="isDelete" @click="delOne(index)"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { thinkSuggest } from "@/api/article.js";
export default {
  data() {
    return {
      key: "",
      searchList: [],
      timer: null,
      colorItem: "",
      localSearchList: JSON.parse(window.localStorage.getItem('search'))||[],
      isDelete:false,
    };
  },
  methods: {
    //点击完成，因为是移动端，所以不是回车 触发
    onSearch(key) {
      //将搜索的关键字用一个数组存起来
      this.localSearchList.unshift(key);
      this.localSearchList = [...new Set(this.localSearchList)];
      window.localStorage.setItem(
        "search",
        JSON.stringify(this.localSearchList)
      );
      this.$router.push("/list/" + key);
    },
    onCancel() {},
    delOne(index){
      this.localSearchList.splice(index,1);
      //删除完成 后需要把数组的数据重新保存到本地
      window.localStorage.setItem('search',JSON.stringify(this.localSearchList))
    },
    delAll(){
      this.localSearchList = [];
      window.localStorage.removeItem('search')
    }
  },
  watch: {
    //forEach方法：没有return,不会改变数组中基本变量的值，会改变数组中对象的值？
    key(newVal, oldVal) {
      //使用js防抖：持续触发事件时函数不会调用，比如，当停止触发两秒后才调用一次
      //js节流：不触发时不会执行
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        if (newVal.trim().length == 0) {
          this.searchList = [];
          return;
        }
        let res = await thinkSuggest(newVal);
        console.log(res);
        this.searchList = res.options;

        this.searchList = this.searchList.map((item, index) => {
          return {
            item,
            colorItem: item
              .split(newVal)
              .join(`<span style="color:red">${newVal}</span>`)
          };
        });
        console.log(this.searchList);
      }, 500);
    }
  }
};
</script>

<style>
</style>