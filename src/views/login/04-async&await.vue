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
      <van-button type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/user";
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810"
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
          try {
            let res = await userLogin({
              mobile: this.mobile,
              code: this.code
            });
            window.localStorage.setItem("user", JSON.stringify(res));
            console.log(res);
          } catch (err) {
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
.van-nav-bar {
  background-color: #3396fc;
  .van-nav-bar__title {
    color: #fff;
  }
}
.login-btn {
  margin: 10px;
}
</style>