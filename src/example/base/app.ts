import { axios } from '../../index'

axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
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