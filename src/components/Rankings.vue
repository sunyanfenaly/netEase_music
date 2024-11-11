<script lang="ts" setup>
import { ref } from 'vue'
import { topListApi } from '../services/index'
const topList = ref([])
const formatPlayCount = (playCount: number) => {
    if (playCount > 100000000) {
        return (playCount / 100000000).toFixed(1) + '亿'
    } else if (playCount > 10000) {
        return (playCount / 10000).toFixed(1) + '万'
    } else {
        return playCount
    }
}
topListApi().then(res => {
    topList.value = res.data.list
})
const goTopList = () => {
    uni.navigateTo({
        url: `/pages/find/toplist`
    })   
}
const goTopListDetail = (id: number) => {
    uni.navigateTo({
        url: '/pages/index/TopListDetail?id=' + id
    })
};
</script>

<template>
    <view class="recommend">
        <text class="title" @click="goTopList">排行榜&gt;</text>
        <view class="recommends">
            <view class="recommend-list" v-for="(item, index) in topList" :key="index" @click="goTopListDetail(item.id)">
                <text class="plays">🎧{{ formatPlayCount(item.playCount) }}</text>
                <image :src="item.coverImgUrl" />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.title {
    display: block;
    margin-bottom: 10px;
}
.recommends {
    display: flex;
    height: 150px;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}

.recommend {
    .title {
        font-size: 20px;
        color: #333;
        font-weight: 600;
    }

    .recommend-list {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 20px;
        margin-right: 10px;

        .plays {
            position: absolute;
            top: 6px;
            left: 6px;
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            z-index: 3;
        }

        .name {
            position: absolute;
            top: 30px;
            left: 10px;
        }

        .desc {
            line-clamp: 2;
            box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
        }
    }
}

image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
}
</style>
