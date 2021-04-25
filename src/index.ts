import {AxiosRequestConfig} from './type/dataInterface'
import { xhr } from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'


function transformUrl(config: AxiosRequestConfig):string {
    // 转换url
    const { url,params } = config
    return buildURL(url, params)
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

function axios(config: AxiosRequestConfig):void {
    processConfig(config)
    xhr(config)
}

export {axios}