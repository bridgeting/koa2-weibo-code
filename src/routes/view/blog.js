/**
 * @description weibo view router
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// index page
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router