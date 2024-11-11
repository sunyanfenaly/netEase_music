<template>
  <div class="whole">
    <img class="bg" :src="userInfo.profile?.backgroundUrl" />
    <img :src="userInfo.profile?.avatarUrl" class="avatar" />
    <view class="toLogin" @click="toLogin">立即登录></view>
    <text class="nickname">{{ userInfo.profile?.nickname }}</text>
    <text class="signature">{{ userInfo.profile?.signature }}</text>
    <view class="detail"> </view>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getAccountInfo } from "../../services/index";
import Player from "../../components/Player.vue";
import { useUserInfoStore } from "../../store/userInfo";
import { onHide, onShow } from "@dcloudio/uni-app";

const user = useUserInfoStore();
const userInfo = ref(
  uni.getStorageSync("detailInfo")
    ? JSON.parse(uni.getStorageSync("detailInfo"))
    : user.detailInfo
);

onShow(() => {
  getInfo();
  userInfo.value = uni.getStorageSync("detailInfo")
    ? JSON.parse(uni.getStorageSync("detailInfo"))
    : user.detailInfo;
});
onHide(() => {
  getInfo();
  userInfo.value = uni.getStorageSync("detailInfo")
    ? JSON.parse(uni.getStorageSync("detailInfo"))
    : user.detailInfo;
});
console.log(userInfo.value);

const getInfo = () => {
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      const cookies = JSON.parse(res.data).cookie;
      getAccountInfo(cookies);
    },
  });
};
getInfo();

const toLogin = () => {
  uni.navigateTo({
    url: "/pages/login/login",
  });
};
</script>

<style lang="scss" scoped>
.whole {
  height: 100vh;
  width: 100vw;
  // #ifdef WEB
  height: calc(100vh - 188rpx);
  // #endif
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  padding: 0 70rpx;
  box-sizing: border-box;
}

.avatar {
  width: 300rpx;
  height: 300rpx;
  border-radius: 50%;
  margin: 50rpx 0;
  box-shadow: 0 0 10px #999;
}

.toLogin {
  color: rgb(0, 0, 0, 0.5);
}

.bg {
  position: absolute;
  width: 100%;
  height: 700rpx;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.nickname {
  color: white;
  font-size: 50rpx;
  margin: 50rpx 0;
}
.signature {
  color: white;
  font-size: 30rpx;
}
</style>
