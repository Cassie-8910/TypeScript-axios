import {AxiosRequestConfig} from './type/dataInterface'
import { xhr } from './xhr'
import { buildURL } from './helpers/url'


function transformUrl(config: AxiosRequestConfig):string {
    // 转换url
    const { url,params } = config
    return buildURL(url, params)
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config) // 修改url值
}

function axios(config: AxiosRequestConfig):void {
    processConfig(config)
    xhr(config)
}

export {axios}