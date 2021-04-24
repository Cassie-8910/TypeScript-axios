import {AxiosRequestConfig} from './type/dataInterface'
import { xhr } from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'


function transformUrl(config: AxiosRequestConfig):string {
    // 转换url
    const { url,params } = config
    return buildURL(url, params)
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config) // 修改url值
    config.data = transformRequestData(config)
}

function transformRequestData (config: AxiosRequestConfig):any {
    return transformRequest(config.data)
}

function axios(config: AxiosRequestConfig):void {
    processConfig(config)
    xhr(config)
}

export {axios}