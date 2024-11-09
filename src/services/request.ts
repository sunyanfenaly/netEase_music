const baseUrl = 'https://api.imjad.cn/cloudmusic/'

interface RequestParams {
    url : string;
    method? : 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    header?: any;
}


type ReponseType<T = AnyObject> =  Omit<UniApp.RequestSuccessCallbackResult,'data'> & { data: T};


const request = <T>({
    url,
    method = 'GET',
    data = {},
    header = {}
}:RequestParams) =>{
    return new Promise<ReponseType<T>>((resolve, reject) =>{
        uni.request({
            url: baseUrl + url,
            method,
            data,
            header,
            success: (res: ReponseType<T>) =>{
                resolve(res)
            },
            fail: reject
        })
    })
    


}

export default request;