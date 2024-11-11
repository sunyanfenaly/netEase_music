<template>
    <view class="tab-container">
      <!-- Tab 栏 -->
      <u-tab :current="current">
        <scroll-view class="tab-show" scroll-x show-scrollbar="false">
            <view class="tabList">
                <u-tab-item v-for="(item , i) in tabs" @tap="tabChange(i)" :key="i" :class="{'active':current === i}">{{ item }}</u-tab-item>
            </view>
        </scroll-view>
      </u-tab>
  
      <!-- Tab 内容 -->
      <view class="tab-content" v-if="current === 0">
        <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="swiperDotIndex" mode="round"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item  v-for="(item, index) in info" :key="index">
                    <image :src="item.imageUrl" :key="item.targetId" mode="widthFix" />
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
        <h4 style="margin-bottom: 20rpx;">甄选歌单</h4>
        <slideBox :list="list"/>
        <slidePlayer />
      </view>
      <view class="tab-content" v-if="current === 1">
        消息内容
      </view>
      <view class="tab-content" v-if="current === 2">
        我的内容
      </view>
      <view class="vidio">
      </view>
    </view>
</template>
  
<script lang='ts' setup>
import { getBannersApi } from '@/service';
import { ref} from 'vue'
import slideBox from '@/components/slideBox.vue';
import { getMusicList } from '@/service'
import slidePlayer from '@/components/slidePlayer.vue'

const current = ref(0)
const info = ref<AnyObject>([])
const tabs = ref(['精选', '排行榜', 'VIP','歌单','助眠', '欧美', '专注','经典','R&B','原创','粤语','说唱'])
const getBanners = async () => {
    try {
        const res = await getBannersApi()
        info.value = res.data.banners
    } catch (error) {
        console.log(error)
    }
}
const list = ref<AnyObject>([])
const getMusicListData = async () => {
  try {
    const res = await getMusicList()
    list.value = res.data.playlists
  } catch (error) {
    console.log(error)
  }
}
getMusicListData()
getBanners()
const tabChange = (index: number) => {
    current.value = index;
}
const change = (e: any) => {
    swiperDotIndex.value = e.detail.current;
}

const dotsStyles = ref([
    {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        border: '1px rgba(0, 0, 0, .3) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
        selectedBorder: '1px rgba(0, 0, 0, .9) solid'
    },
    {
        backgroundColor: 'rgba(255, 90, 95,0.3)',
        border: '1px rgba(255, 90, 95,0.3) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
        selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
    },
    {
        backgroundColor: 'rgba(83, 200, 249,0.3)',
        border: '1px rgba(83, 200, 249,0.3) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
        selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
    }
])

const clickItem = (index: number) => {
    swiperDotIndex.value = index;
}
const swiperDotIndex = ref(0)

</script>
  
<style lang='scss' scoped>
.tab-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20rpx;
    /* #ifdef H5 */
    padding: 100rpx 20rpx 20rpx 20rpx;
    /* #endif */

    box-sizing: border-box;
    u-tab{
        display: flex;
        align-items: center;
        height: 100rpx;
        .tab-show{
            width: 100%;
            margin: 0 auto;
            .tabList{
                display: flex;
                width: auto;
                u-tab-item{
                    flex-shrink: 0;
                    text-align: center;
                    margin-right:20rpx;
                    padding: 10rpx 20rpx;
                    border-radius: 30rpx;
                }
                .active{
                    background-color: #eaedf2;
                }
            }
        }
    }
    .tab-content{
        flex: 1;
        overflow: auto;
        .swiper-box{
            width: 100%;
            height: 250rpx;
            border-radius: 20rpx;
            margin: 40rpx auto;
            overflow: hidden;
            swiper-item{
                display: flex;
                justify-content: center;
                align-items: center;
                image{
                    display: block;
                    width: 100%!important;
                }
            }

        }
    }
    .vidio{
        width: 100%;
        height: 100rpx;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        opacity: .9;
    }
}
/* #ifdef H5 */
.tab-container {
    padding: 100rpx 20rpx 20rpx 20rpx;
}
/* #endif */
</style>