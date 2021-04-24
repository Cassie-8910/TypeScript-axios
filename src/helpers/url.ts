import { isDate, isObject, isPlainObject } from './util'

function encode(val: string): string {
    return encodeURIComponent(val) // 加密函数然后保留加密数据中的一些基本特殊字符
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%2O/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
    // 定义基本接口
    if (!params) {
        return url
    }

    const parts: string[] = []

    Object.keys(params).forEach((key) => {//遍历每一个参数值, 组成一个最终的参数组 
        let val = params[key]
        if (val === null || typeof val === 'undefined') {//排除掉 null和undefined的参数
            return
        }
        let values: string[]// 存储基础数据 一个只能存放字符串的数组 
        if (Array.isArray(val)) {//参数是否为数组
            values = val//参数直接赋值为该数据
            key += '[]'//索引上加入 字符串[] 的标记如同上述 
        }
        else {//如果不是数组的话
            values = [val]//直接把值放在数据里面就可以 
        }
        values.forEach((val) => {//遍历最终的数据数据 
            if (isDate(val)) {//如果是日期就转化是字符串
                val = val.toISOString()
            } else if (isPlainObject(val)) {//如果是对象就使用json的解析方式解析为字符串
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
            // 把此次解析出来的字符串加密之后组成 key=value的形式 
        })
    })
    let serializedParams = parts.join('&')//用&符号 组合所有的key=value 对
    if (serializedParams) {//如果已经组合完毕, 并且数据存在 此处是为了防止url没有 params参数的情况
        const markIndex = url.indexOf('#')// 检测锚点位置
        if (markIndex !== -1) {//如果存在锚点, 则把包括锚点在内之后的全部剔除
            url = url.slice(0, markIndex)//
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
        //检测此时的url里面是否拥有? 没有就加一个, 有的话就用&拼接 
    }
    return url //返回最终的url值
}