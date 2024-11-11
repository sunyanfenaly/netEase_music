<script lang="ts" setup>
import { getHotApi } from '@/service'
import { ref } from 'vue'

const list = ref<AnyObject>([])
const getNewList = async () => {
  try {
    const res = await getHotApi()
    list.value = res.data
  } catch (error) {
    console.log(error)
  }
}
getNewList()
</script>

<template>
  <view class="slidePlayerBox">
    <swiper class="swiperBox" :options="swiperOptions">
      <swiper-item v-for="(item, index) in list" :key="index">
        <view class="song">
            <image></image>
            <view class="detail"></view>
        </view>
        <view class="song"></view>
        <view class="song"></view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
.slidePlayerBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
    .swiperBox{
        width: 100%;
        height: 100%;
    .song{
        width: 100%;
        height: 100%;
        }
    }
}
</style>
