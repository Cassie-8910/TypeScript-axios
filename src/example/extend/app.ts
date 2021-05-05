import axios from '../../index'

axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi'
    }
})

axios.request({
    url: '/extend/post',
    method: 'post',
    data: {
      msg: 'hello'
    }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post')
axios.put('/extend/put')
axios.patch('/extend/patch')
