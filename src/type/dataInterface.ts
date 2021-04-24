interface AxiosRequestConfig{
    url: string
    method?:Method
    data?:any
    params?:any
}

type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' 
            | 'post' | 'POST'
            | 'put' | 'PUT'
            | 'patch' | 'PATCH'

export {AxiosRequestConfig}