<script lang="ts" setup>
import { ref } from 'vue'
import { recommendSongsApi, flutterApi } from '../services/index'
import type { recommendItem, flutterListItem } from '../services/type'
const recommendSongs = ref<recommendItem[]>([])
recommendSongsApi().then(res => {
    recommendSongs.value = res.data.data.dailySongs
    // console.log(recommendSongs)
})
const goRecommendList = () => {
    uni.navigateTo({
        url: '/pages/index/recommendlist'
    });
}

</script>
<template>
    <view class="daily-recommend">
        <view class="recommend-title" @click="goRecommendList">
            <text>💕每日推荐</text>
            <image :src="recommendSongs[0]?.al.picUrl" alt="" />
        </view>
        <view class="heart-pattern">
            <text>❤️心动模式</text>
            <image src="" alt="" />
        </view>
        <view class="private-radar">
            <text>⛈️私人雷达</text>
            <image src="" alt="" />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.daily-recommend {
    display: flex;
    overflow-x: auto;
    margin-bottom: 20px;
    &::-webkit-scrollbar {
        display: none;
    }

    .recommend-title,
    .heart-pattern,
    .private-radar {
        position: relative;
        margin-right: 10px;

        text {
            position: absolute;
            z-index: 3;
            color: #fff;
            font-weight: 500;
        }
    }
}

image {
    width: 120px;
    height: 150px;
    border-radius: 20px;
    background: pink;
}

</style>
