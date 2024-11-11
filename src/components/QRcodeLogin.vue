<template>
  <!-- #ifdef MP-WEIXIN -->
  <div class="whole">
    <img :src="qrSrc" alt="" />
  </div>
  <!-- #endif -->
  <!-- #ifdef WEB -->
  <Teleport to="body">
    <div class="whole">
      <img :src="qrSrc" alt="" />
    </div>
  </Teleport>
  <!-- #endif-->
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { getKey, getQR, canLogin } from "../services/index";
import { onShow, onHide } from "@dcloudio/uni-app";
uni.request({
  url: "/api/login/refresh"
});
const timer = ref(0);
const obj = {};
onHide(() => {
  clearInterval(timer.value!);
});
onUnmounted(() => {
  clearInterval(timer.value!);
});
const qrSrc = ref("");
getKey().then((res) => {
  const key = res.data.data.unikey;
  getQR(res.data.data.unikey).then((res) => {
    qrSrc.value = res.data.data.qrimg;
    timer.value = setInterval(() => {
      canLogin(key).then((res) => {
        console.log(res.data);
        if (res.data.code === 802) {
          console.log(res);
        }
        if (res.data.code === 803) {
          console.log(res.data);
          obj.cookie = res.data.cookie;
          console.log(obj);
          uni.setStorage({
            key: "userInfo",
            data: JSON.stringify(obj),
            success: function () {
              uni.switchTab({
                url: "/pages/index/index",
              });
            },
          });
          uni.request({
            url: "/api/login/refresh",
          });
          clearInterval(timer.value!);
        }
        if (res.data.code === 800) {
          clearInterval(timer.value!);
        }
      });
    }, 1000);
  });
});
</script>

<style lang="scss" scoped>
.whole {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // #ifdef WEB
  top: 88rpx;
  // #endif
  background: white;
  z-index: 6;
  display: flex;
  justify-content: center;
  img {
    width: 80vw;
    height: 80vw;
    // #ifdef MP-WEIXIN
    height: 480rpx;
    width: 480rpx;
    // #endif
  }
}
</style>
