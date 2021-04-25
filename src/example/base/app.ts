import { axios } from '../../index'

axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res);
})

axios({
    method: 'post',
    url: '/base/post',
    responseType: 'json',
    data: {
        a: 3,
        b: 4
    }
}).then((res) => {
    console.log(res)
})

axios({
    method: 'post',
    url: '/base/post',
    headers: {
        'content-type': 'application/json;charset=utf-8' // 预设一个请求头部
    },
    data: {
        a: 3,
        b: 4
    }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
axios({
    method: 'post',
    url: '/base/post',
    data: searchParams
})

const arr = new Int32Array([21, 31])
axios({
    method: 'post',
    url: '/base/buffer',
    data: arr
})

axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: ['bar', 'baz'] // 最终请求的URL是 /base/get?foo[]=bar&foo[]=baz
    }
})