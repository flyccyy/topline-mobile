<template>
  <div class="login-wrap">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="mobile"
        v-validate="'required'"
        name="mobile"
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
        name="code"
        v-validate="'required'"
        :error-message="errors.first('code')"
      />
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info" size="large" @click="login" :loading="isLoading" loading-text="...登录中">登录</van-button>

    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/user";
import { setAuthor } from "@/utils/author";
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810",
      isLoading:false,
    };
  },
  methods: {
    //设置自己的验证规则,自定义验证提示
    setMyRule() {
      const dict = {
        custom: {
          mobile: {
            required: "请输入手机号"
          },
          code: {
            required: "请输入验证码"
          }
        }
      };
      this.$validator.localize("zh_CN", dict);
    },
    login() {
      this.$validator.validate().then(async valid => {
        if (!valid) {
          console.log("验证失败");
        } else {
          this.isLoading=true;
          try {
            let res = await userLogin({
              mobile: this.mobile,
              code: this.code
            });
            this.$store.commit("setUser", res);
            this.isLoading = false;
            this.$router.back("/home");
            console.log(res);
          } catch (err) {
            //发送请求失败，即登录失败时提示
            this.$toast.fail('登录失败');
            this.isLoading = false;
            console.log("出错");
          }
        }
      });
    }
  },
  mounted() {
    this.setMyRule();
  }
};
</script>

<style lang="less" scoped>
//把样式写在了app.vue
.login-wrap{
  padding-top: 46px;
}
.login-btn {
  margin: 10px;
}
</style>