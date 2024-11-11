<script lang="ts" setup>
import { ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { getMusic, getMusicUrl } from '@/service'
import { playlistDetailApi } from '../../services/index'

const innerAudioContext = uni.createInnerAudioContext()
innerAudioContext.autoplay = true
const length = ref()
const id = ref()
const curId = ref(0)
const musicList = ref([])
const picUrl = ref('')
const sing = ref('')
const singer = ref('')
const show = ref()


onLoad((options) => {
  const listId = options.id
  playlistDetailApi(listId)
 .then((res) => {
    musicList.value = [...res.data.playlist.tracks]
    length.value = musicList.value.length
    id.value = Number(musicList.value[curId.value].id)
    getMusicUrl(id.value)
      .then((res) => {
        sing.value = musicList.value[curId.value].ar[0].name
        singer.value = musicList.value[curId.value].al.name
        picUrl.value = musicList.value[curId.value].al.picUrl
        innerAudioContext.src = res.data.data[0].url
        show.value = true
      })
  })
})

watch(curId, (newValue, oldValue) => {
  picUrl.value = musicList.value[newValue].al.picUrl,
  sing.value = musicList.value[newValue].ar[0].name,
  singer.value = musicList.value[newValue].al.name
})

innerAudioContext.onPlay(() => {
  show.value = true
})

const next = () => {
  if(curId.value >= length.value) {
    curId.value = 0
  } else {
    curId.value = curId.value + 1
  }
  id.value = musicList.value[curId.value].id
  getMusicUrl(id.value)
  .then((res) => {
    innerAudioContext.destroy()
    innerAudioContext.src = res.data.data[0].url
  })
}

const prev = () => {
  if(curId.value >= 0) {
    curId.value = curId.value - 1
  } else {
    curId.value = 0
  }
  id.value = musicList.value[curId.value].id
  getMusicUrl(id.value)
 .then((res) => {
      innerAudioContext.destroy()
      innerAudioContext.src = res.data.data[0].url
    })
}


const tabState = () => {
  if (innerAudioContext.paused) {
    show.value = true
    innerAudioContext.play()
  } else {
    show.value = false
    innerAudioContext.pause()
  }
}

onUnload(() => {
  innerAudioContext.destroy()
})
</script>

<template>
  <view class="playPage">
    <view class="pic">
      <view class="mask" :style="{ backgroundImage : 'url(' + picUrl + ')' }"></view>
      <image :src="picUrl" mode="widthFix" :class="[{ 'playing': show }, {'paused': !show }]"></image>
    </view>
    <view class='detail'>
      <view class="musicInfo">
        <text>{{ sing }}</text>
        <text>{{ singer }}</text>
      </view>
      <view class="s-p">
        <uni-icons type="left" size="60" @click="prev" color="#fff"></uni-icons>
          <image src="../../static/start.png"  @click="tabState" v-if="show"></image>
          <image src="../../static/stop.png" @click="tabState" v-else></image>
        <uni-icons type="right" size="60"  @click="next" color="#fff"></uni-icons>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.playPage{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 192, 215);
  .pic{
    width: 100vw;
    height: 800rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    image{
      width: 400rpx;
      height: 400rpx;
      border-radius: 50%;
      background-color: #000000;
      border-radius: 50%;
      animation: rotate 15s linear infinite;
      transition: transform 0.3s;
    }
    .playing {
      animation-play-state: running;
    }

    .paused {
      animation-play-state: paused;
    }
    .mask{
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: 0;
      top: 0;
      filter: blur(20rpx);
      pointer-events: none;
    }
  }
  .detail{
    width: 100%;
    height: 400rpx;
    z-index: 1;
    .s-p{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      image{
        width: 200rpx;
        height: 200rpx;
        border-radius: 50%;
      }
    }
    .musicInfo{
      width: 50%;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 0 auto;
      text{
        width: 50%;
        height: 100%;
        line-height: 80rpx;
        text-align: center;
      }
    }
  }
}
</style>
