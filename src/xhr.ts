import {AxiosRequestConfig} from './type/dataInterface'

function xhr(config: AxiosRequestConfig):void {
    let {data=null, url, method='get'} = config
    let request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}

export {xhr}