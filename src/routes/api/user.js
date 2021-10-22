/**
 * @description user api route
 */

const router = require('koa-router')()
const { 
    isExist,
    register
} = require('../../controller/user')

router.prefix('/api/user')

// check if exist
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// register router
router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({userName, password, gender})
})

module.exports = router