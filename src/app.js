const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const index = require('./routes/index')
const userViewRouter =  require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/view/error')

const { isProd } = require('./utils/env')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY} = require('./conf/secretKeys')

// error handler
let onerrorConf = {}
if (isProd) {
    onerrorConf = {redirect: '/error' }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session config
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', // cookie的key 默认是‘koa.sid’
    prefix: 'weibo:sess:', // reids key的前缀 默认是koa:sess:
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // unit ms
    },
    // ttl: 24 * 60 * 60 * 1000, // ttl默认不写和maxAge是一样的
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))


// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())


// 404 & error
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})



module.exports = app
