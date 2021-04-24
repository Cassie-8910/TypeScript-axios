const express = require('express') // 引入服务端框架 express
const bodyParser = require('body-parser') // body-parser是非常常用的一个express中间件，对post请求的请求体进行解析
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware') // 生成一个与webpack的compiler绑定的中间件
    // 然后再express启动的服务app中调用这个中间件，通过 watch mode监听资源变更，然后自动打包，快速编译，走内存
const webpackHotMiddleware = require('webpack-hot-middleware') // 实现热更新
const webpackConfig = require('./webpack.config')

const app = express() // 实例化express对象
const compiler = webpack(webpackConfig) // 按照配置文件进行 预编译缓存

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8070
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

let router = express.Router()
app.use(router)
router.get('/simple/get', function(req, res) {
    res.json({
        msg: `Hello World`
    })
})