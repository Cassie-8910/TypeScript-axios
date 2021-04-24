import {axios} from '../../index'

axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: ['bar', 'baz'] // 最终请求的URL是 /base/get?foo[]=bar&foo[]=baz
    }
})