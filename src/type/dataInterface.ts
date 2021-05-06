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
    | 'options' | 'OPTIONS'

export { AxiosRequestConfig, AxiosResponse, Method }

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface Axios {
    interceptors:{
        request :AxiosInterceptorManager<AxiosRequestConfig>
        response:AxiosInterceptorManager<AxiosResponse>
    }
    //定义各种方法的参数和返回数据，不管传入的参数如何，最终返回的都是一个AxiosPromise对象
    request(config: AxiosRequestConfig): AxiosPromise
    get(url: string, config?: AxiosRequestConfig): AxiosPromise
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise
    head(url: string, config?: AxiosRequestConfig): AxiosPromise
    options(url: string, config?: AxiosRequestConfig): AxiosPromise
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
    // 函数描述，可以直接用于函数变量的实现 定义一个Axios实例的基本，这样axios即是一个函数 也拥有n多方法
    (config: AxiosRequestConfig): AxiosPromise
}

export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string
    request?: any
    response?: AxiosResponse
    isAxiosError: boolean
}

export interface AxiosInterceptorManager<T> {
    //接受 泛型参数
    // 拦截器最终req 和 res 的接口定义
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn):number
    //接触拦截器的代码操作
    eject(id: number): void
}

export interface ResolvedFn<T=any> {
    // 根据传入的泛型参数，定义函数的基本格式，函数返回值为联合类型
    (val: T):T | Promise<T>
}

export interface RejectedFn {
    // 根据传入的泛型参数，定义函数的基本格式，函数返回值为联合类型
    (error: any):any
}