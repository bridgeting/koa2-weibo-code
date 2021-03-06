const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
    // console.log('before debugger')
    // debugger
    // console.log('after debugger')
    
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

router.get('/profile/:userName', async (ctx, next) => {
    const { userName } = ctx.params
    ctx.body = {
        title: `profile page - ${userName}`
    }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    const { userName, pageIndex } = ctx.params
    ctx.body = {
        title: `loadMore API`,
        userName,
        pageIndex
    }
})

module.exports = router
