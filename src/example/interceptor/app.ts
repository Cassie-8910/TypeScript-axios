import axios from '../../index'

axios.interceptors.request.use(config => {
    config.headers.test += '1'
    return config
})
axios.interceptors.request.use(config => {
    config.headers.test += '2'
    return config
})
axios.interceptors.request.use(config => {
    config.headers.test += '3'
    return config
})
axios.interceptors.response.use(res => {
    res.data += '1'
    return res
})
let interceptor = axios.interceptors.response.use(res => {
    res.data += '2'
    return res
})
axios.interceptors.response.use(res => {
    res.data += '3'
    return res
})
axios.interceptors.response.eject(interceptor) //删掉了一个

axios({
    url: '/interceptor/get',
    method: 'get',
    headers: {
        test: '' //默认不设置, 拦截器自动帮我们进行设置 
    }
}).then((res) => {
    console.log(res.data)
})