<template>
  <div>
    <van-search
      v-model="key"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
    data() {
        return {
            key:''
        }
    },
    methods: {
        //点击完成，因为是移动端，所以不是回车 触发
        onSearch(){

        },
        onCancel(){

        }
    },
};
</script>

<style>
</style>