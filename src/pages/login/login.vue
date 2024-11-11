<template>
  <div class="whole">
    <div class="app">
      <view>
        <img src="../../static/music.png" />
      </view>
    </div>
    <div class="login">
      <view class="uni-form-item">
        <text class="countrycode">+86</text>
        <input
          class="uni-input"
          type="tel"
          v-model="telNumber"
          focus
          placeholder="请输入手机号"
        />
        <icon type="clear" size="26" v-if="showClearIcon" @click="clearIcon" />
      </view>
      <button class="quickLogin" @click="login">验证码登录</button>
      <view class="agreement">
        <checkbox-group @change="canlogin = !canlogin">
          <label class="label"
            ><checkbox class="checkbox" :checked="canlogin" />我已阅读
          </label>
        </checkbox-group>
      </view>
      <view @click="isQRlogin = true">二维码登录</view>
    </div>
    <view class="tourist" @click="touristLoginI">立即体验</view>
    <view class="dialog" @click="showDialog = !showDialog" v-if="showDialog">
      <view class="btns">
        <view class="tip">
          <text>同意协议后登录</text>
        </view>
        <view class="agree">
          <button class="button noAgree">不同意</button>
          <button class="button agree" @click="changeCanlog">同意并继续</button>
        </view>
      </view>
    </view>
  </div>
  <CodeLogin
    v-if="showCodeLogin"
    v-model="showCodeLogin"
    @changeCode="changeCode"
  ></CodeLogin>
  <QRcodeLogin v-if="isQRlogin" v-model="isQRlogin"> </QRcodeLogin>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { touristLogin } from "../../services/index";
import CodeLogin from "../../components/CodeLogin.vue";
import { getCodeLogin, getAndLogin } from "../../services/index";
import QRcodeLogin from "../../components/QRcodeLogin.vue";
const showClearIcon = ref(true);
const telNumber = ref("");
const canlogin = ref(false);
const showDialog = ref(false);
const showCodeLogin = ref(false);
const isQRlogin = ref(false);
const clearIcon = () => {
  telNumber.value = "";
};
const code = ref(0);
const changeCode = (yzm: number) => {
  code.value = yzm;
};
watch(code, () => {
  if (String(code.value).length === 4) {
    getAndLogin(Number(telNumber.value), code.value).then((res) => {
      console.log(res);
      if (res.data.data) {
        uni.switchTab({
          url: "/pages/index/index",
        });
      }
    });
  }
});
const login = async () => {
  if (!canlogin.value) {
    showDialog.value = true;
    return;
  }
  console.log(Number(telNumber.value));
  const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
  if (reg.test(telNumber.value)) {
    showCodeLogin.value = true;
    const back = getCodeLogin(Number(telNumber.value));
  }else{
    alert("请输入正确的手机号码")
  }
};

const changeCanlog = () => {
  canlogin.value = true;
};
watch(
  telNumber,
  () => {
    showClearIcon.value = telNumber.value.length > 0;
  },
  {
    immediate: true,
  }
);
const touristLoginI = async () => {
  if (!canlogin.value) {
    showDialog.value = true;
    return;
  }
  const back: { [key: string]: any } = await touristLogin();
  if (back.data.code === 200) {
    console.log(back.data.userId);
    const obj = {
      cookie: back.data.cookie,
      createTime: back.data.createTime,
      userId: back.data.userId,
    };
    uni.setStorage({
      key: "userInfo",
      data: JSON.stringify(obj),
      success: function () {
        uni.switchTab({
          url: "/pages/index/index",
        });
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.whole {
  height: 100vh;
  // #ifdef WEB
  height: calc(100vh - 88rpx);
  // #endif
  width: 100vw;
  background: #fef4f3;
  position: relative;
  padding: 100rpx;
  box-sizing: border-box;
}
.tourist {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  color: #c4b6bc;
}
.uni-form-item {
  background: #f1ebeb;
  border-radius: 20rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  padding: 10rpx;
}
.app {
  width: 100%;
  view {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.countrycode {
  padding: 0 20rpx;
  border-right: 4rpx solid rgba(0, 0, 0, 0.1);
}
.uni-input {
  padding-left: 20rpx;
}
.quickLogin {
  border-radius: 100rpx;
  background: #fe3a3b;
  color: white;
  margin-top: 20rpx;
}
.agreement {
  margin-top: 20rpx;
  font-size: 30rpx;
}
.label {
  display: flex;
  align-items: center;
}
.checkbox {
  transform: scale(0.7);
}
.dialog {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3;
}
.btns {
  position: absolute;
  bottom: 0;
  // height: 150rpx;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.tip {
  min-height: 100rpx;
  padding: 10px;
  box-sizing: border-box;
}
.agree {
  display: flex;
  .button {
    flex: 1;
    background: unset;
    border: none;
    outline: none;
  }
}
</style>
