<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBannerApi, recommendPlaylistApi } from '../../services/index';
import type { bannersItem, recommendPlaylistItem } from '../../services/type';
import Player from '@/components/Player.vue';
import DailyRecommend from '../../components/DailyRecommend.vue'
import Rankings from '../../components/Rankings.vue'
const greeting = ref('')
const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 18 || hour < 5) {
    greeting.value = '晚上好'
  } else if (hour > 12 && hour < 18) {
    greeting.value = '下午好'
  } else if (hour < 12 || hour >= 5) {
    greeting.value = "早上好";
  }
};
onMounted(() => {
  getGreeting()
})
const banners = ref<bannersItem[]>([])
getBannerApi().then((res: { data: { banners: { imageUrl: string; targetId: number; }[]; }; }) => {
  banners.value = res.data.banners
})
const recommendPlayList = ref<recommendPlaylistItem[]>([])
recommendPlaylistApi().then((res => {
  recommendPlayList.value = res.data.playlists
}))
const goRecommendDetail = (id: number) => {
  uni.navigateTo({
    url: '/pages/index/recommendlistdetail?id='+ id
  });
  // console.log(id)
};
const toSearch = () => {
  uni.navigateTo({ url: "/pages/search/search" });
};

</script>
<template>
  <view class="content">
    <view class="nav">
      <img src="../../static/01.png" alt="" class="img1" />
      <input
        type="text"
        placeholder="输入搜索内容"
        class="search"
        @focus="toSearch"
      />
      <img src="../../static/music_1.png" alt="" class="img2" />
    </view>
    <swiper class="swiper">
      <swiper-item v-for="item in banners" :key="item.targetId">
        <view class="swiper-item">
          <image
            :src="item.imageUrl"
            alt=""
            style="width: 100%; height: 180px"
          />
        </view>
      </swiper-item>
    </swiper>
    <text class="greeting">{{ greeting }}</text>
    <DailyRecommend />
    <view class="recommend">
      <text class="title">推荐歌单&gt;</text>
      <view class="recommends">
        <view
          class="recommend-list"
          v-for="items in recommendPlayList"
          :key="items.id"
          @click="goRecommendDetail(items.id)"
        >
          <text class="plays">🎧{{ items.playCount }}</text>
          <image :src="items.coverImgUrl" alt="" />
          <view class="desc"><text class="name">{{ items.name }}</text></view>
        </view>
      </view>
    </view>
    <Rankings  />
    <Player />
  </view>
  <Player></Player>
</template>
<style lang="scss" scoped>
.title {
    display: block;
    margin-bottom: 10px;
}
.nav {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  .search {
    background: #ccc;
    width: 230px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    padding-left: 10px;
  }
}

.img1,
.img2 {
  width: 30px;
  height: 30px;
}

.greeting {
  font-size: 20px;
  color: #333;
  font-weight: 500;
  height: 50px;
  line-height: 50px;
  margin-left: 15px;
}

.swiper {
  width: 100%;
  height: 180px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 10px;
  box-sizing: border-box;
}

.content {
  padding: 0 10px;
  overflow: scroll;
}

.recommends {
  display: flex;
  // flex-wrap: wrap;
  width: 100%;
  height: 180px;
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
    background: pink;
    border-radius: 20px;
    margin-right: 10px;

    .plays {
      position: absolute;
      top: 6px;
      left: 6px;
      font-size: 12px;
      color: #fff;
      z-index: 3;
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
