import request  from './request'
import { bannersRes } from './type'
export const bannerApi = () =>{
    return request<bannersRes>({url:'/banner'})
}