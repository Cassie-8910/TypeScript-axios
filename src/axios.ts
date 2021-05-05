import { AxiosInstance } from './type/dataInterface'
import Axios from './core/Axios'
import { extend } from "./helpers/util" //导入辅助函数

function createInstance(): AxiosInstance {
    const context = new Axios()
    const instance = Axios.prototype.request.bind(context) // 在新的Axios实例里面对request方法绑定了上下文
    extend(instance, context) //方法库合并 把context的合并到instance上面来
    return instance as AxiosInstance //利用 类型断言返回合并后的函数
}

const axios = createInstance()
export default axios