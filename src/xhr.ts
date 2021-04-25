import {AxiosRequestConfig} from './type/dataInterface'

function xhr(config: AxiosRequestConfig):void {
    let {data=null, url, method='get', headers} = config
    let request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    Object.keys(headers).forEach(name => {
        if(data === null && name.toLowerCase() === 'content-type') {
            delete headers[name] // 如果data里面没有数据就不需要专门设置content-type
        } else {
            request.setRequestHeader(name, headers[name]) // 如果有data， 设置http请求头的值
        }
    })
    request.send(data)
}

export {xhr}