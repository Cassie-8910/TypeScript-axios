import {AxiosRequestConfig, AxiosResponse, AxiosPromise} from '../type/dataInterface'
import { xhr } from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'


function transformUrl(config: AxiosRequestConfig):string {
    // 转换url
    const { url,params } = config
    return buildURL(url!, params)
}

function transformHeaders(config: AxiosRequestConfig) {
    const { headers = {}, data } = config // 如果没有传入headers对象，默认设置为空对象
    return processHeaders(headers, data)
}

function transformRequestData (config: AxiosRequestConfig):any {
    return transformRequest(config.data)
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config) // 修改url值
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    //接收响应数据，并对响应数据data属性的值进行转化
    res.data = transformResponse(res.data)
    return res
}

function axios(config: AxiosRequestConfig):AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res) // 把生成的promise对象进行转化，处理promise对象中的data数据
    })
}

export {axios}