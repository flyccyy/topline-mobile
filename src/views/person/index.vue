<template>
  <div class="person">
    <van-nav-bar title="个人信息" left-arrow fixed @click-left="$router.back()">
      <template slot="right">
        <div @click-right="save" class="save">保存</div>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-cell title="头像"  is-link>
        <template slot="default">
          <div @click="editphoto">
          <img :src="profileObj.photo" alt="" width="30" height="30"></div>
        </template>
      </van-cell>
      <van-cell title="昵称" :value="profileObj.name" is-link @click="editnickname"/>
      <van-cell title="介绍"  is-link/>
      <van-cell title="性别" :value="profileObj.gender===0?'男':'女'" is-link/>
      <van-cell title="生日" :value="profileObj.birthday" is-link/>
      
    </van-cell-group>
    <!-- 头像 -->
  <upfile v-model="upfileShow" @changeImg="changeImg"></upfile>
    <!-- 昵称弹出 -->
    <van-popup v-model="nicknameShow" position="bottom"
  :style="{ height: '20%' }">
  <van-cell>
    <template slot="title">
    
      <h3>设置用户昵称</h3>
       <van-field class="nicknameField" v-model="profileObj.name" />
    </template>
      </van-cell>

    </van-popup>
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user.js'
import upfile from '@/views/person/component/upfile.vue'
export default {
  components:{
    upfile
  },
  data(){
    return{
      profileObj:{},
      nicknameShow:false,
      upfileShow:false,
      // imgObj:{}
    }
  },
  methods: {
    save() {},
    editnickname(){
      this.nicknameShow = true;
    },
    editphoto(){
      this.upfileShow=true;
    },
    changeImg(value){
      this.profileObj.photo = value.photo;
    }
  },
  async mounted(){
    let res = await getUserProfile()
    console.log(res)
    this.profileObj = res;
    console.log('----------')
    
  }
};
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
.save {
  color: #fff;
}
.person{
    margin-top: 46px;
}
.nicknameField{
  border:1px solid #ccc;
}
</style>