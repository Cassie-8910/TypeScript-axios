import { head } from 'shelljs'
import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
    // normalizedName 参数的标准名
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name => {
        //Object.keys(headers) 返回一个数组， 是headers对象内属性的名，然后遍历处理
        if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name] // 使用标准参数，删除自身参数名
        }
    })
}

export function processHeaders(headers:any, data:any):any {
    normalizeHeaderName(headers, 'Content-Type') // 数据预处理
    if(isPlainObject(data)) {
        if(headers && !headers['Content-Type']) {
            //headers存在但是没有Content-Type属性 就把类型锁死为json
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

export function parseHeaders(headers: string): any {
    // 传入一个headers字符串
    let parsed = Object.create(null)
    if(!headers) {
        return parsed
    }

    headers.split('\r\n').forEach(line => {
        // \r是回到行首 \n是换行 回车键一般是这两个命令对组合
        let [key, val] = line.split(':') // 解构赋值
        key = key.trim().toLowerCase()
        if(!key) {
            return
        } 
        if(val) {
            val = val.trim()
        }
        parsed[key] = val
    })
    return parsed
}