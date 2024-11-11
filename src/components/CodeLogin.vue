<template>
  <!-- #ifdef MP-WEIXIN -->
  <div class="whole">
    <p>
      <span @click="showCodeLogin = !showCodeLogin">收起</span>
    </p>
    <p class="getCode">
      <input type="text" v-model="code" placeholder="请输入验证码" />
      <span>重新获取验证码?</span>
    </p>
  </div>
  <!-- #endif -->
  <!-- #ifdef WEB -->
  <Teleport to="body">
    <div class="whole">
      <p>
        <span @click="showCodeLogin = !showCodeLogin">收起</span>
      </p>
      <p class="getCode">
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <span>重新获取验证码?</span>
      </p>
    </div>
  </Teleport>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
const emits = defineEmits(["changeCode"]);
const code = ref("");
watch(code, () => {
  emits("changeCode", code.value);
  console.log(code.value);
});

const showCodeLogin = defineModel();
</script>

<style lang="scss" scoped>
.whole {
  position: fixed;
  left: 0;
  top: 0;
  top: 88rpx;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  // #ifdef WEB
    height: calc(100vh - 88rpx);
  // #endif
  background: white !important;
  z-index: 6;
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  box-sizing: border-box;
}
p {
  margin: 30rpx 0;

  input {
    border: 2rpx solid;
    height: 70rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    flex: 1;
  }
}
.getCode {
  display: flex;
  font-size: 20rpx;
  align-items: center;
}
</style>
