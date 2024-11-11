<script lang="ts" setup>
import Rankings from '@/components/Rankings.vue';
import { topDeatilApi } from '../../services/index'
import { ref } from 'vue';
const topDetail = ref([]);
topDeatilApi().then(res => {
    topDetail.value = res.data.list
    // console.log(res.data.list);
})
const goTopListDetail = (id: number) => {
    uni.navigateTo({
        url: '/pages/index/TopListDetail?id=' + id
    })
};
</script>

<template>
    <view class="toplist">
        <Rankings style="margin-top: 20px;margin-left: 10px;" />
        <view class="box">
            <view class="title-box">
                <text class="title">🎸官方榜</text>
            </view>
            <view class="content-box" v-for="(item, index) in topDetail" :key="index" @click="goTopListDetail(item.id)">
                <view class="top">
                    <text class="name1">{{ item.name }}</text>
                    <text>{{ item.updateFrequency }}</text>
                </view>
                <view class="down">
                    <view class="img">
                        <image :src="item.coverImgUrl" alt="" />
                    </view>
                    <view class="info-box">
                        <view class="info" v-for="(song, index) in item.tracks" :key="index">
                            <text class="index">{{ index + 1 }}</text>
                            <text class="name2">{{ song.first }}</text>
                            <text class="author">- {{ song.second }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.toplist {
    padding: 0 10px;

    .title-box {
        font-size: 20px;
        font-weight: 600;
    }
}

.index {
    padding-right: 10px;
}

.content-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    height: 140px;
    border: 1px solid #eee;
    border-radius: 20px;
    background: #eee;

    .top {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .name1 {
            display: block;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
    }

    .down {
        display: flex;

        .img {
            width: 80px;
            height: 80px;
            background: pink;
            border-radius: 20px;
            margin-left: 10px;

            image {
                width: 100%;
                height: 100%;
                border-radius: 20px;
            }
        }

        .info {
            font-size: 14px;
            margin-left: 20px;
            width: 230px;
            
            .author {
                // display: block;
                font-size: 14px;
                color: #999;
                width: 100px;
                height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 10px;
            }
        }
    }
}

.info-box {
    display: flex;
    flex-direction: column;
}
</style>
