import request from "./request";
import { useUserInfoStore } from "../store/userInfo";
const userInfoStore = useUserInfoStore();
import type {
  bannersRes,
  recommendRes,
  flutterRes,
  toplistRes,
  playlistDetailRes,
  playMusicRes,
  dynamicRecommendRes,
  followRes,
} from "./type";

// 获取轮播图数据
export const getBannerApi = () => {
  return request<bannersRes>({ url: "/banner" });
};

// 每日推荐
export const recommendSongsApi = () => {
  return request<recommendRes>({ url: `/recommend/songs` });
};
// 推荐歌单
export const recommendPlaylistApi = () => {
  return request({ url: "/top/playlist" });
};
// 所有榜单
export const toplistApi = () => {
  return request<toplistRes>({ url: "/toplist/detail" });
};

// 心动模式
export const flutterApi = (id: number, pid: number) => {
  return request<flutterRes>({
    url: "/playmode/intelligence/list",
    data: {
      id,
      pid,
    },
  });
};

// 歌单详情
export const playlistDetailApi = (id: string) => {
  return request<playlistDetailRes>({ url: "/playlist/detail", data: { id } });
};

// 播放歌曲
export const playMusicApi = (id: string) => {
    return request<playMusicRes>({
        url: '/song/url',
        data: {
            id
        }
    })
}

// 热搜列表
export const searchHotApi = () => {
  return request({ url: "/search/hot/detail" });
};

// 搜索
export const searchApi = (keywords: string) => {
  return request({
    url: "/search",
    data: {
      keywords,
    },
  });
};

// 动态页面 推荐的数据接口
export const dynamicRecommendApi = () => {
  return request<dynamicRecommendRes>({
    url: "/topic/detail/event/hot?actid=111551188",
  });
};
// 动态页面 关注的数据接口
export const dynamicFollowApi = () => {
  return request<followRes>({
    url: "/user/followeds?uid=416608258",
  });
};

//游客登陆 touristLogin
export const touristLogin = () => {
  return request({
    url: "/register/anonimous",
  });
};
//. 二维码检测扫码状态接口
export const canLogin = (key: string) => {
  return request({
    url: "/login/qr/check",
    data: {
      key,
      timestamp: Date.now(),
    },
  });
};

//获取手机验证
export const getCodeLogin = (phone: number) => {
  return request({
    url: "/captcha/sent",
    data: {
      phone,
    },
  });
};
//手机号验证码登录
export const getAndLogin = (phone: number, captcha: number) => {
  return request({
    url: "/captcha/verify",
    data: {
      phone,
      captcha,
    },
  });
};

//获取二维码的key生成接口
export const getKey = () => {
  return request({
    url: "/login/qr/key",
    timestamp: Date.now(),
  });
};

//二维码生成接口
export const getQR = (key: string) => {
  return request({
    url: "/login/qr/create",
    data: {
      key,
      timestamp: Date.now(),
      qrimg: true,
    },
  });
};

// 获取账号信息
export const getAccountInfo = (cookie: string) => {
  uni.request({
    url: "/api/user/account", 
    method: "POST",
    data: {
      cookie
    },
    success: (res) => {
      const { account , profile } = res.data;
      const detailInfo =  { account , profile };
      userInfoStore.detailInfo = detailInfo
      uni.setStorageSync('detailInfo', JSON.stringify(detailInfo));
      // uni.request({
      //   url: "/api/user/detail",
      //   data: {
      //     uid : profile.userId
      //   },
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   fail: (err) => {
      //     console.log(err);
      //   }
      // });
    },
    fail: (err) => {
      console.log(err);
    }
  });
};

//排行榜
export const topListApi = () => {
  return request({
    url: "/toplist"
  });
};
//排行榜详情列表
export const topDeatilApi = () => {
  return request({
    url: "/toplist/detail"
  });
}
//排行榜详情
export const topListDetailApi = (id: number) => {
  return request({
    url: "/top/list",
    data: { id },
  });
};
// 搜索建议
export const searchSuggestApi = (keywords: string) => {
  return request({
    url: "/search/suggest",
    data: {
      keywords,
    },
  });
};
