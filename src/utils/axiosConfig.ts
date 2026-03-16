import { toLogin } from "@/router";
import axios from "axios";

//复制一个新的axios示例对象
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,//服务器地址
    timeout: 5000,//请求超出时间（毫秒），超时自动断开
})

//创建响应拦截器,后端返回的结果达到前端组件前，会被拦截下来
instance.interceptors.response.use((res) => {
    //将响应结果中的data返回给前端组件
    return res.data
}, (error) => {
    if (error?.status == 401) {
        toLogin();
    }
    return Promise.reject(error.message);
})

//创建请求拦截器
instance.interceptors.request.use((config) => {
    // 将本地存储中token，添加到所有请求的请求头中
    config.headers.Authorization = localStorage.getItem('userId')
    return config;
})


interface IResponse {
    code: number;
    message: string;
    data: any;
}


//将4个请求类型封装成不同的请求方法
export const httpGet = (url: string, data?: any): Promise<IResponse> => {
    return instance.get(url, { params: data })
}

export const httpPost = (url: string, data?: any): Promise<IResponse> => {
    return instance.post(url, data)
}

export const httpPut = (url: string, data?: any): Promise<IResponse> => {
    return instance.put(url, data)
}

export const httpDelete = (url: string, data?: any): Promise<IResponse> => {
    return instance.delete(url, { params: data })
}