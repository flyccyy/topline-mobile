<template>
  <div>
    <van-search
      v-model="key"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-cell-group>
      <van-cell  icon="search" v-for="(item,index) in searchList" :key="index" >
        <template slot="title">
          <div v-html="item"></div>
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
      timer:null
    };
  },
  methods: {
    //点击完成，因为是移动端，所以不是回车 触发
    onSearch() {
      this.$router.push('/list/'+this.key)
    },
    onCancel() {}
  },
  watch: {
    //forEach方法：没有return,不会改变数组中基本变量的值，会改变数组中对象的值？
     key(newVal, oldVal) {
      //使用js防抖：持续触发事件时函数不会调用，比如，当停止触发两秒后才调用一次
      //js节流：不触发时不会执行
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async ()=>{
        if(newVal.trim().length==0){
          this.searchList = [];
          return;
        }
        let res = await thinkSuggest(newVal);
        console.log(res);
        this.searchList = res.options;
        this.searchList = this.searchList.map((item,index)=>{
          return item.split(newVal).join(`<span style="color:red">${newVal}</span>`)
        })
        console.log(this.searchList);

      },500)
    }
  }
};
</script>

<style>
</style>