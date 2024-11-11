
// banner 轮播图接口
export interface bannersItem {
    imageUrl: string;
    targetId: number
}

//轮播图
export interface bannersRes {
    banners: bannersItem[];
    code: number;
}

// 每日推荐
export interface alItem {
    id: number;
    name: string;
    pic: string;
    picUrl: string;
    pic_str: string;
}
export interface recommendItem {
    name: string;
    al: alItem;
    ar: arItem[];
    publishTime: number;
}

export interface recommendReasonsItem {
    songId: number;
    reason: string;
    reasonId: string;
}
export interface recommendRes {
    code: number;
    data: {
        dailySongs: recommendItem[];
        recommendReasons: recommendReasonsItem[];
    }
}

// 热搜列表
export interface hotListItem {
    alg: string;
    content: string;
    iconType: number;
    iconUrl: string;
    score: number;
    searchWord: string;
    source: number;
    url: string;
}
export interface hotListRes {
    code: number;
    hotList: hotListItem[];
}

// 所有榜单 start
//  artistToplist 类型
export interface artistItem {
    first: string;
    third: number;
}
export interface artistToplist {
    name: string;
    coverUrl: string;
    upateFrequency: string;
    updateFrequency: string;
    artists: artistItem[]
}

//  list数据的类型
interface listItemtrackItem {
    first: string;
    second: string;
}
export interface listItem {
    name: string;
    coverImgUrl: string;
    coverImgId: number;
    creator?: string;
    name: string;
    coverImgUrl: string;
    tracks: listItemtrackItem[];
}


//  rewardToplist 类型
export interface artistsItem {
    name: string;
    id: number;
    img1v1Url: string;
    picId: number;
}
export interface album {
    artists: artistsItem[];
}
export interface songsItem {
    name: string;
    album: album;
    artists: album[];
}
export interface rewardToplist {
    name: string;
    coverUrl: string;
    songs: songsItem[]
}


export interface toplistRes {
    code: number;
    artistToplist: artistToplist[];
    list: listItem[];
    rewardToplist: rewardToplist;
}
// 所有榜单 end

// 歌单详情
export interface tracksItem {
    name: string;
    al: alItem;
    ar: arItem[];
}
export interface playlist{
    id:number;
    adType: number;
    commentThreadId: string;
    coverImgId: number;
    coverImgId_str: string;
    coverImgUrl: string;
    createTime: number;
    name:string;
    creator: creatorItem;
    playlistType:number;
    tags:string[];
    tracks: tracksItem[]
}

export interface playlistDetailRes {
    code: number;
    playlist: playlist;
}

// 播放音乐
export interface playMusicItem {
    url: string;
    time: number;
    id: number;
    encodeType: string;
    musicId: string;
    al: alItem;
    ar: arItem[];
}
export interface playMusicRes {
    code: number;
    data:playMusicItem[]
}



// 心动模式
export interface arItem {
    name: string;
    id: number;
}
export interface songInfoItem {
    no: string;
    name: string;
    privilege: string;
    al: alItem[];
}

export interface flutterListItem {
    id: number;
    songInfo: songInfoItem;
}

export interface flutterRes {
    code: number;
    data: flutterListItem[]
}
//推荐歌单
export interface recommendPlaylistItem {
    id: number;
    name: string;
    coverImgUrl: string;
    playCount: number;
}


// 动态页 推荐的动态数据
interface picsItem {
    format: string;
    height: number;
    originUrl: string;
    pcRectangleUrl: string;
    pcSquareUrl: string;
    rectangleUrl: string;
    squareUrl:string;
    width: number;
}
interface userItem {
    avatarDetail: {
        identityIconUrl: string;
        identityLevel: number;
    }
    backgroundUrl: string;
    backgroundImgIdStr: string;
    backgroundImgId: number;
    avatarUrl: string;
    nickname: string;
}
interface tailMarkItem {
    markType: string;
    markTitle: string;
    markResourceId: string;
    markOrpheusUrl: string;
    circle: {
        imageUrl: string;
        member: string;
        postCount: string;
    }
}
 export interface dynamicRecommendItem {
    id:number;
    actId: number;
    actName: string;
    actType: number;
    uuid: string;
    pics: picsItem[];
    user: userItem;
    tailMark: tailMarkItem;
    json: string;
}

export interface dynamicRecommendRes {
    code: number;
    events: dynamicRecommendItem[];
}


// 推荐页面 关注的类型
interface followTypeItemObj{
    iconUrl: string;
}
interface followTypeItem {
    associator: followTypeItemObj;
}
export interface followItem {
    avatarUrl: string;
    nickname: string;
    signature: string | null;
    time: number;
    userId: number;
    vipRights: followTypeItem;
}
export interface followRes {
    code: number;
    followeds: followItem[];
}
