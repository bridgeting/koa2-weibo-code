/**
 * @description user view route
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')


/**
 * get userInfo from redis session userInfo
 * @param {Object} ctx 
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false
    }
    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router