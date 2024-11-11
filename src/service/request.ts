
interface Params {
    url: string;
    data?: any;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    header?: any;

}
const request = ({
    url,
    data = {},
    header = {},
    method = 'GET',
}: Params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            data,
            header,
            method,
            success: (res) => {
                resolve(res)
            },
            fail: reject
        })
    })
}
export default request