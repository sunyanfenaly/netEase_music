<script lang="ts" setup>
import { ref } from 'vue'
import { recommendSongsApi } from '../../services/index'
import type { recommendItem } from '../../services/type'
const recommendSongs = ref<recommendItem[]>([])
recommendSongsApi().then(res => {
    recommendSongs.value = res.data.data.dailySongs
})
</script>

<template>
    <view class="recommend-list">
        <view class="list-item" v-for="(item, index) in recommendSongs" :key="index">
            <view>
                <image :src="item.al.picUrl" alt="" />
            </view>
            <view class="name">
                <text>{{ item.name }}</text>
                <view>
                    <text>{{ item.ar[0].name }}</text>
                    <text>{{ item.al.name }}</text>
                </view>
            </view>
            <view>📢</view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.recommend-list {
    display: flex;
    flex-direction: column;
    .list-item {
        display: flex;
    }
}
.name {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

image {
    width: 50px;
    height: 50px;
}
</style>
