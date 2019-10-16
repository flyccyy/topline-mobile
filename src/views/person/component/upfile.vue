<template>
  <div>
    <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false">
      <van-cell-group>
        <van-cell title="从相册中选择" @click="upphoto" is-link>
          <template slot="label">
            <div class="inputfile">
              <input type="file" ref="upfile" @change="editphoto" />
            </div>
          </template>
        </van-cell>
        <van-cell title="拍照" is-link />
        <van-cell title="取消" @click="$emit('input',false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import {userPhoto} from '@/api/user.js'
export default {
  props: ["value"],
  data() {
    return {
      // upfileShow:false,
      imgObj:{}

    };
  },
  methods: {
    upphoto() {
      // 上传文件的input默认有click事件
      this.$refs.upfile.click();
    },
    editphoto() {
      let myFile = this.$refs.upfile.files[0];
      let reader = new FileReader();
      reader.addEventListener("load", res => {
        ImagePreview({
          images: [res.target.result],
          startPosition: 1,
          onClose() {
            this.$dialog.confirm({
              title: "注意",
              message: "是否将此图片设置为你的头像？"
            })
              .then(async () => {
                let res = await userPhoto(myFile)
                console.log(res)
                // this.imgObj = res
                this.$emit('changeImg',res)
              })
              .catch(() => {
                // on cancel
              });
          }
        });
      });
      reader.readAsDataURL(myFile);
      this.$emit("input", false);
      console.log(myFile);
    }
  }
};
</script>

<style>
.inputfile {
  display: none;
}
</style>