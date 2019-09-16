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
      <van-button
        type="info"
        size="large"
        @click="login"
        :loading="isLoading"
        loading-text="...登录中"
      >登录</van-button>
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
      isLoading: false
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
    //理解同步：如果把this.isLoading分别写在下面这个函数外面，当前面的isLoading=true执行完时，不会马上执行异步里面的代码，而是直接执行函数外面的isLoading=false,所以不会显示加载的状态
    //一个async修饰两个await
    //valid返回的是布尔值？
    async login() {
      this.isLoading = true;
      let valid = await this.$validator.validate();
      if (valid) {
        try {
          let res = await userLogin({
            mobile: this.mobile,
            code: this.code
          });
          this.$store.commit("setUser", res);
          this.$router.push("/home");
          console.log(res);
        } catch (err) {
          //发送请求失败，即登录失败时提示
          this.$toast.fail("登录失败");
        }
      }
      this.isLoading = false;
      // this.$validator.validate().then(async valid => {
      //   if (!valid) {
      //     console.log("验证失败");
      //   } else {
      //     this.isLoading = true;
      //     try {
      //       let res = await userLogin({
      //         mobile: this.mobile,
      //         code: this.code
      //       });
      //       this.$store.commit("setUser", res);
      //       this.isLoading = false;
      //       this.$router.push("/home");
      //       console.log(res);
      //     } catch (err) {
      //       //发送请求失败，即登录失败时提示
      //       this.$toast.fail("登录失败");
      //       this.isLoading = false;
      //       console.log("出错");
      //     }
      //   }
      // });
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