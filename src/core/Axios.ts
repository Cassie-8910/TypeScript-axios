import { AxiosRequestConfig, AxiosPromise, Method }  from '../type/dataInterface'
import dispatchRequest from './dispatchRequest'

export default class Axios {
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
    request(config: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(config)
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
        return this._requestMethodWithData('pacth', url, data, config)
    }
}