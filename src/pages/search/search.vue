<script setup lang="ts">
import { ref, watch } from "vue";
import { searchSuggestApi, searchApi } from "../../services/index";
import { useCounterStore } from "../../store/searchHistory";
const searchStore = useCounterStore();
// console.log(searchStore.SearchHistoryList);
const searchList = ref([]);
const keywords = ref("");
const type = ref(1);
watch(keywords, async () => {
  const back = await searchApi(keywords.value);
//   console.log(back);
  searchList.value = back.data.result.songs;
});
const search = () => {
  if (!keywords.value.length) return;
  if (!searchStore.SearchHistoryList.includes(keywords.value))
    searchStore.SearchHistoryList.push(keywords.value);
};
</script>
<template>
  <div class="whole">
    <div class="input">
      <input
        type="text"
        v-model="keywords"
        placeholder="搜索歌曲"
        class="search-input"
      />
      <!-- #ifdef WEB -->
      <input type="button" value="搜索" @click="search" class="search-btn" />
      <!-- #endif  -->
      <!-- #ifdef MP-WEIXIN -->
      <button type="button" class="search-btn" @click="search">搜索</button>
      <!-- #endif -->
    </div>
    <!-- #ifdef MP-WEIXIN -->
    <div class="history">
      <p>搜索历史</p>
      <view class="ul">
        <view
          v-for="(item, index) in searchStore.SearchHistoryList"
          :key="index"
          class="li"
        >
          {{ item }}
        </view>
      </view>
    </div>
    <div class="search-result" v-if="keywords.length">
      <view class="ul">
        <view class="li" v-for="(item, index) in searchList" :key="index">
          <icon type="search" size="15" /> {{ item.name }}
        </view>
      </view>
    </div>
    <!-- #endif -->

    <!-- #ifdef WEB -->
    <div class="history">
      <p>搜索历史</p>
      <ul>
        <li v-for="(item, index) in searchStore.SearchHistoryList" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="search-result" v-if="keywords.length">
      <ul>
        <li v-for="(item, index) in searchList" :key="index">
          <icon type="search" size="15" /> {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- #endif  -->
  </div>
</template>

<style lang="scss" scoped>
.whole {
  height: 100vh;
  width: 100vw;
  // #ifdef WEB
  height: calc(100vh - 88rpx);
  // #endif
  padding: 40rpx;
  box-sizing: border-box;
  background: #f8f9fd;
}
::-webkit-scrollbar {
  display: none;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.input {
  display: flex;
  height: 100rpx;
  align-items: center;
  .search-input {
    height: 70rpx;
    flex: 1;
    background: white;
    border-radius: 35rpx;
    margin: 0 20rpx;
    padding: 0 20rpx;
    border: 2rpx solid rgb(0, 0, 0, 0.05);
  }
  .search-button {
    all: unset;
    width: 100rpx;
    color: #2a2c2b;
  }
}
.history {
  margin-top: 40rpx;
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  ul,
  .ul {
    display: flex;
    flex-wrap: wrap;
  }
  p {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  li,
  .li {
    font-size: 24rpx;
    margin-bottom: 10rpx;
    height: 70rpx;
    line-height: 70rpx;
    background: white;
    padding: 0 50rpx;
    border-radius: 50rpx;
    font-size: 30rpx;
    margin: 0 20rpx;
  }
}
.search-result {
  width: 100vw;
  padding: 40rpx;
  position: fixed;
  z-index: 6;
  top: 230rpx;
  //    #ifdef MP-WEIXIN
  top: calc(230rpx - 88rpx);
  //    #endif
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background: #f8f9fd;
  ul,
  .ul {
    overflow-y: auto;
    height: 100%;
    li,
    .li {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: 2rpx solid #f0f0f0;
    }
  }
}
</style>
