const toString = Object.prototype.toString

// 定义两个特殊参数数据格式的验证函数
export function isDate (val:any): val is Date {
    //验证是否是日期对象
    return toString.call(val) === '[object Date]'
}

export function isObject (val:any): val is Object {
    //验证是否是普通对象
    return val !== null && typeof val === 'object'
}