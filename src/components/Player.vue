<template>
  <!-- #ifdef WEB -->
  <Teleport to="body" :disabled="playerStore.show">
    <div class="player">
      <div class="playerInfo" @click="goToDynamic">
        <image class="logo-music" src="../static/disc-BpXxhfCl.png" />
        {{ playerStore.playList[playerStore.currentIndex].name }}
      </div>
      <div class="playIcon">
        <image class="playImg" v-if="playerStore.playerStatus" src="../static/zanting.png"
          @click="changePlayerStoreStatus" />
        <image class="playImg" v-else="playerStore.playerStatus" src="../static/bofang.png"
          @click="changePlayerStoreStatus" />
        <uni-icons type="list" size="30" @click="playerStore.showList = true">
        </uni-icons>
      </div>
    </div>
    <div class="playerListDialog" v-if="playerStore.showList" @click.self="playerStore.showList = false">
      <div class="playerList">
        <view class="tip">播放列表</view>
        <view class="allMusic">
          <!-- <view v-for="item in playerStore.playList" :key="item" class="musicItem">
          </view> -->
          <view v-for="(item, index) in playerStore.playList" :key="item.url" class="musicItem"
            @click="changePlayerMusic(item, index)">
            <view>{{ item.name }}</view>
            <view v-if="index === playerStore.currentIndex">正在播放</view>
          </view>
        </view>
      </div>
    </div>
    <MusicPlayer />
  </Teleport>
  <!-- #endif -->
</template>
<script setup lang="ts">
import { usePlayerStore } from "../store/musicPlayer";
import MusicPlayer from "../components/MusicPlayer.vue";
const playerStore = usePlayerStore();

const changePlayerStoreStatus = () => {
  playerStore.playerStatus = !playerStore.playerStatus;
  playerStore.changeplayerStatus()

}
// 跳到动态页面
const goToDynamic = () => {
  uni.navigateTo({
    url: '/pages/playmusic/playmusic'
  });
}

// 切换播放音乐
const changePlayerMusic = (item, index) => {
  // playerStore.showList = false;
  console.log(item, index, '正在勃发');
  playerStore.currentIndex = index;
}



</script>

<style lang="scss" scoped>
.player {
  background: white;
  height: 100rpx;
  width: 100vw;
  position: fixed;
  bottom: 90rpx;
  z-index: 6;
  display: flex;
  padding: 0 20rpx;
  box-sizing: border-box;
  align-self: center;
  display: flex;
  align-items: center;
  line-height: 90rpx;
  border-top: 4rpx solid #eee;
  border-bottom: 4rpx solid #eee;
}

.logo-music {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.playImg {
  width: 40rpx;
  height: 40rpx;
  margin-right: 30rpx;
  margin-left: 30rpx;
}

.playerInfo {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}

.listIcon {
  height: 100%;
}

.playerListDialog {
  position: fixed;
  bottom: 100rpx;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.playerList {
  position: absolute;
  max-height: 700rpx;
  // top: 0;
  bottom: 100rpx;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  flex-direction: column;
}

.tip {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 20rpx;
  background: #eee;
}

.allMusic {
  overflow-y: auto;
}

.musicItem {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 40rpx;
  border-bottom: 2rpx solid #eee;
  display: flex;
}
</style>
