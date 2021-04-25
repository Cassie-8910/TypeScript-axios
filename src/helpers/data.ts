import { isPlainObject } from './util'
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data) //当传入的数据格式为对象时, 我们就把对象字符串化 
    }
    return data
}

export function transformResponse(data: any): any {
    // 传入参数data
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch (e) {
            //
        }
    }
    return data
}