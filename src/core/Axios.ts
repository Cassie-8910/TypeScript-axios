import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, RejectedFn, ResolvedFn }  from '../type/dataInterface'
import { dispatchRequest } from './dispatchRequest'
import InterceptorManager from './interceptorManager'

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T>{
    resolved: ResolvedFn | ((config:AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn
}

export default class Axios {
    interceptors: Interceptors

    constructor() {
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(), // 请求拦截器的数据是配置文件
            response: new InterceptorManager<AxiosResponse>() // 响应拦截器的数据是 响应文件
        }
    }
    _requestMethodWithoutData(method:Method, url: string, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            method,
            url
        })
        )
    }
    _requestMethodWithData(method: Method, url: string, data?:any, config?:AxiosRequestConfig) {
        // 私有方法 定义包含数据的基本请求
        return this.request(
            Object.assign(config || {}, {
                method,
                url,
                data
            })
        )
    }
    request(url: any, config?: any): AxiosPromise {
        if(typeof url === 'string') {
            // url存在
            if(!config) {
                // 且config不存在的时候
                config = {} // 设置为空对象
            }
            config.url = url // config存在 将函数的实参url设置为config对象的url
        } else {
            // 要是第一个参数不是字符串那就是对象，把url当作是config对象
            config = url
        }

        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest, // 把默认处理xhr请求的函数放在此处，作为初始值，不管有没有拦截器，都一定执行
            rejected: undefined
        }]

        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor) //调整请求拦截器函数的内容顺序， 把后面的放在数组的前面
        })

        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor) // 调整响应拦截器函数的内容顺序， 把后面的放在数组的后面
        })

        let promise = Promise.resolve(config) // 添加初始的promise参数

        while(chain.length) {
            const {resolved, rejected} = chain.shift()! // 类型断言不为空值
            promise = promise.then(resolved, rejected) // 链式调用
        }
        return promise as AxiosPromise; // 类型断言一下， 以免出现类型检查不兼容
    }

    get(url:string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }
      head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }
      options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }
      post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }
      put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }
      patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }
}
