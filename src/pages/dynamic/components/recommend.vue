<script setup lang='ts'>
import { ref } from 'vue'
import type { dynamicRecommendItem } from '../../../services/type';
const recommendList = defineModel<dynamicRecommendItem[]>();

</script>

<template>
    <view class="recommend-content">
        <view v-for="(item, index) in recommendList" :key="index" class="item">

            <view>
                <image mode="widthFix" :src="item.user.avatarUrl" class="pic" />
                <view class="title">{{ item.user.nickname }}</view>
            </view>
            <view class="content">
                <text>{{ JSON.parse(item.json).msg }}</text>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.item {
    min-height: 160rpx;
    border-bottom: 1px solid #eee;
    padding: 20rpx;

    .title {
        display: flex;
        align-items: center;
        height: 100rpx;
        font-weight: bold;
        font-size: 40rpx;
        image {
            width: 100rpx;
            height: 100rpx;
            border: 2rpx solid #eee;
            border-radius: 50%;
            margin-right: 30rpx;
        }
    }

    .content {
        font-size: 30rpx;
        padding-left: 60rpx;
    }
}
</style>
