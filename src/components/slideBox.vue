<script lang="ts" setup>
import { defineProps } from 'vue'

const prop = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const playCount = (num: number) => {
  return num > 10000? (num / 10000).toFixed(1) + '万' : num
}
const turnTo = (id: string) => {
  uni.navigateTo({
    url: '/pages/player/player?id='+ id
  });
}
const turnToList = (id: string) => {
  uni.navigateTo({
    url: '/pages/index/recommendlistdetail?id='+ id
  });
}

interface item {
  coverImgUrl: string,
  id: string,
  name: string,
  playCount: string
}
</script>

<template>
  <scroll-view class="box" scroll-x show-scrollbar="false">
    <view class="slideBox">
      <view class="slideBox-item" v-for="(item, index) in list" :key="index">
        <view class="mList" @click="turnToList(item.id)">
          <image :src="item.coverImgUrl" class="mListPic" mode="widthFix"></image>
          <view class="playCount">{{ playCount(item.playCount) }}</view>
          <view class="playBtn" @click.stop="turnTo(item.id)"></view>
        </view>
        <view class="descript">{{ item.name }}</view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 300rpx;
  display: flex;
  .slideBox{
    display: flex;
    width: 100%;
    height: 300rpx;
    .slideBox-item{
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      width: 200rpx;
      height: 300rpx;
      margin-right: 40rpx;
      .mList{
        flex-shrink: 0;
        width: 100%;
        height: 200rpx;
        display: flex;
        position: relative;
        border-radius: 20rpx;
        overflow: hidden;
        image{
          width: 100%;
          height: 100%;
          display: block;
        }
       .playCount{
          position: absolute;
          top: 10rpx;
          left: 10rpx;
          color: #fff;
          font-size: 24rpx;
        }
        .playBtn{
          position: absolute;
          bottom: 20rpx;
          right: 20rpx;
          width: 0;
          height: 0;
          border-top: 30rpx solid transparent;
          border-left: 30rpx solid #ffffff;
          border-bottom: 30rpx solid transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .descript{
        flex-shrink: 0;
        width: 100%;
        height: 100rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        color: #000;
        margin-top: 10rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
