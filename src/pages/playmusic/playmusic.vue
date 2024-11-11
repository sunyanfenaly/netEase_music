<script setup lang='ts'>

</script>

<template>
    <view class="bg">
        <img src="../../static/wode.png" alt="" class="img">
        <p class="mark"></p>
    </view>

    <view class="app">
        <header>
            <h3>歌曲名称</h3>
            <p>歌手</p>
        </header>

        <view class="centerImg">
            <view class="circle">
                <image src="../../static/logo.png" alt="" />
            </view>
        </view>

        <view class="controls">
            <!-- 顶部播放时长等 -->
            <view class="controls-top">
                <!-- 音量 -->
                <view class="volume-size">
                    <i></i>
                </view>
                <view class="volume">音量</view>

                <!-- 进度条 -->
                <view class="progress">
                    <view class="time currentTime">00:00</view>
                    <input type="range" value="0" class="range">
                    <view class="time duration"></view>
                </view>
                <!-- 倍速 -->
                <span class="rate">倍数</span>
            </view>

            <!-- 底部的前进暂定按钮 -->
            <view class="menu">
                <uni-icons type="list" size="30"></uni-icons>
                <view class="btns">
                    <uni-icons type="left" size="30" class="prev-btn"></uni-icons>
                    <image src="../../static/bofang.png" alt="" class="play-btn" style="width: 30px;height: 30px;"/>
                    <uni-icons type="right" size="30" class="next-btn"></uni-icons>
                </view>
                <uni-icons type="bars" size="30"></uni-icons>
            </view>
        </view>
    </view>
</template>

<style lang="scss">
.player[data-v-aefab004] {
    bottom: 0;
}

@keyframes rotateAni {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg .img {
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(5px);
}

.bg .mark {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
//   background: #ca3535;
}

.app {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #FFF;
}

header {
  height: 80px;
  text-align: center;
  padding: 10px 0;
  flex-shrink: 0;
}

.centerImg {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  width: 70vw;
  height: 70vw;
  border-radius: 50%;
  overflow: hidden;
  animation: rotateAni 10s linear infinite;
  animation-play-state: paused;
  border: 3px solid #666;
}

.circle image {
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: 50%;
}

.controls {
  height: 150px;
  margin-top: 10px;
  flex-shrink: 0;
}

.controls-top {
  height: 65px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
}

.volumn-size {
  height: 40px;
  width: 3px;
  background: grey;
  align-self: flex-start;
  margin: 0 20px;
  position: relative;
}

.volumn-size i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #FFF;
}

.volume {
  position: absolute;
  left: 20px;
  font-size: 12px;
  bottom: 6px;
}

.progress {
  flex: 1;
  display: flex;
  align-items: center;
}

.range {
  flex: 1;
  margin: 0 15px;
  height: 3px;
}

.time {
  font-size: 14px;
}

.rate {
  font-size: 14px;
  margin-left: 15px;
}

.menu {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-around;
}

.btns {
  display: flex;
  align-items: center;
}

.play-list {
  font-size: 28px !important;
}

.music-list {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  opacity: 0;
  transition: opacity .5s linear;
}

.active {
  background: #666;
  color: #FFF;
  font-weight: 900;
}
.play-btn{
    padding: 0 20px;
}
</style>
