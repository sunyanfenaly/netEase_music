import { defineStore } from "pinia";
import { ref, watch } from "vue";
// import { playMusicApi } from '../service/index'

export const usePlayerStore = defineStore("player", () => {
  const playerStatus = ref(false);
  const detailId = ref(488388942); // 每首歌的id
  const innerAudioContext = uni.createInnerAudioContext(); // 创建audio
  //播放模式
  const playTypeList = ref([
    { name: "顺序播放", value: "sequence" },
    { name: "单曲循环", value: "single" },
    { name: "随机播放", value: "random" },
  ]);

  //播放列表
  const playList = ref([
    {
      id: 488388942,
      poster: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
      name: "致爱丽丝 - 稻香",
      author: "周杰伦",
      url: "https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3",
    },
  ]);

  //当前播放的音乐
  const currentMusic = ref("");
  //当前播放的音乐的索引
  const currentIndex = ref(0);
  //播放器是否显示
  const show = ref(false);
  //播放器是否正在播放
  const isPlaying = ref(false);
  //播放列表是否显示
  const showList = ref(false);
  //当前播放模式
  const playType = ref("random");
  // 是否显示详细的播放器
  const isDetail = ref(false);
  //播放器的音量
  const volume = ref(1);
  watch(playList, () => {
    currentMusic.value = playList.value[0].url;
  });

  // 设置路径
  innerAudioContext.src = playList.value[0].url;
  // 切换改变flag的状态
  const changeplayerStatus = () => {
    if (!playerStatus.value) {
      innerAudioContext.pause();
    } else {
      innerAudioContext.play();
    }
  };

  watch(playList, () => {
    currentIndex.value = 0;
    currentMusic.value = playList.value[0].url;
  });
  watch(currentIndex, () => {
    currentMusic.value = playList.value[currentIndex.value].url;
  });
  // 初始化播放器
  watch(currentMusic, () => (innerAudioContext.src = currentMusic.value), {
    immediate: true,
  });

  return {
    playList,
    currentMusic,
    currentIndex,
    show,
    isPlaying,
    showList,
    isDetail,
    playerStatus,
    changeplayerStatus,
  };
});
