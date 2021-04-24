import {AxiosRequestConfig} from './type/dataInterface'
import { xhr } from './xhr'
function axios(config: AxiosRequestConfig) {
    xhr(config)
}

export {axios}