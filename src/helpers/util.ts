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

export function isPlainObject(val: any): val is Object {
    //判断传入的数据是否为标 准对象格式
    return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
    // 返回 T 和 U 的交叉类型
    for(const key in from) {
        //如果括号开头的语句不加分号，那么代码压缩后合并到一行后非常容易变成一个函数的调用了，所有需要加分号，
        //以+、-、/、()、[]、这些字符开头的语句都需要加分号
        ;(to as T & U)[key] = from[key] as any // 类型断言避免不必要的编译检测错误
    }
    return to as T & U
}