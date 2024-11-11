<template>
  <div class="whole" v-if="playerStore.isDetail">
    <div class="close" @click="playerStore.isDetail = false">收起</div>
    
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "../store/musicPlayer";
const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
.whole {
  background: green;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // #ifdef WEB
  top: 88rpx;
  bottom: 100rpx;
  // #endif
  z-index: 6;
}
</style>
