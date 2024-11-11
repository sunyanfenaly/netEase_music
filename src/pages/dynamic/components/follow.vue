<script setup lang='ts'>
import { ref } from 'vue'
import type { followItem } from '../../../services/type';
const followItem = defineModel<followItem[]>();
</script>

<template>
    <view class="recommend-content">
        关注
        <view v-for="(item, index) in followItem" :key="index" class="item">

            <view class="header">
                <image mode="widthFix" :src="item.avatarUrl" class="pic" />
                <view class="title">{{ item.nickname }}</view>
            </view>
            <view class="content">
                <image mode="widthFix" :src="item.avatarUrl" class="pic" />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.item {
    min-height: 160rpx;
    border-bottom: 1px solid #eee;
    padding: 20rpx;
    .header{
        display: flex;
        .title {
                display: flex;
                align-items: center;
                height: 100rpx;
                font-weight: bold;
                font-size: 40rpx;
            }
        
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
