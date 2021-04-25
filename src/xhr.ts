import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './type/dataInterface'
import { parseHeaders } from './helpers/headers'

function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve) => {
        let { data = null, url, method = 'get', headers, responseType } = config
        let request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        request.open(method.toUpperCase(), url, true)

        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name] // 如果data里面没有数据就不需要专门设置content-type
            } else {
                request.setRequestHeader(name, headers[name]) // 如果有data， 设置http请求头的值
            }
        })
        request.send(data)

        request.onreadystatechange = function handleLoad() {
            // 当readyState属性发生变化时调用的 EventHandler
            if (request.readyState !== 4) {
                //request.readyState 返回一个无符号短整型数字 代表请求的状态码
                return
            }
            //以字符串形式返回所有用 CRLF(回车换行符) 分隔的响应头， 如果没有收到响应，则返回 null
            // const responseHeaders = request.getAllResponseHeaders()
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())

            // 检查是否自行设置了responseType的值，并根据值来进行返回的值的类型
            const responseData = (responseType && responseType !== 'text') ? request.response : request.responseText

            //request.response 返回一个 ArrayBuffer、Blob、Document，或 DOMString， 具体是哪种类型取决于 XMLHttpRequest.responseType 的值
            //request.responseText 返回一个 DOMString，该 DOMString 包含对请求的响 应，如果请求未成功或尚未发送，则返回 null。
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            resolve(response)
        }
    })
}

export { xhr }