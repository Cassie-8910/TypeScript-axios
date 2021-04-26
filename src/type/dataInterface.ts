interface AxiosRequestConfig {
    url: string,
    method?: Method,
    headers?: any,
    data?: any,
    params?: any
    responseType?: XMLHttpRequestResponseType
    timeout?: number
}

interface AxiosResponse {
    // 定义axios方法传输到then里面的resolve数据
    data: any, // 服务端返回数据
    status: number, //HTTP状态码status
    statusText: string //状态消息
    headers: any, // 响应头
    config: AxiosRequestConfig, //请求配置对象
    request: any // 请求的XMLHttpRequest 对象实例 request
}

type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export { AxiosRequestConfig, AxiosResponse }

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string
    request?: any
    response?: AxiosResponse
    isAxiosError: boolean
}