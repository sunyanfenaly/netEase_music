<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { topListDetailApi } from '../../services/index'
import { ref } from 'vue'
const toplistDetail = ref([])
onLoad((option) => {
   topListDetailApi(option.id).then(res => {
      toplistDetail.value = res.data.playlist
   })
   // console.log(option.id)
})
</script>

<template>
   <view class="top-list-detail">
      <view class="nav">
         <image :src="toplistDetail.coverImgUrl" alt="" mode="aspectFill" />
         <button class="btn" size="mini">关注 | 评论 | 分享</button>
      </view>
      <view class="list">
         <view class="content" v-for="(item, index) in toplistDetail.tracks" :key="index">
            <text class="id">{{ index + 1 }}</text>
            <view class="music-list">
               <text class="name">{{item.name}}</text>
               <text class="author">{{item.ar.map(item => item.name).join('、')}}</text>
            </view>
         </view>
      </view>
   </view>
</template>

<style lang="scss" scoped>
.list {
   display: flex;
   flex-direction: column;
   margin-top: 20px;
}
image {
   width: 100%;
   position: relative;
}

.btn {
   position: absolute;
   width: 200px;
   height: 40px;
   line-height: 40px;
   font-size: 16px;
   border-radius: 20px;
   background: #eee;
   top: 220px;
   left: 90px;

}

.content {
   top: 300px;
   display: flex;
   height: 60px;
   width: 100%;
   align-items: center;
   border-bottom: 1px solid #eee;

   .id {
      font-size: 18px;
      font-weight: 500;
      margin: 0 20px;
      color: #333;
   }

   .music-list {
      display: flex;
      flex-direction: column;

      .name {
         font-size: 18px;
         color: #333;
      }

      .author {
         font-size: 12px;
         color: #666;
      }
   }
}
</style>
