/**
 * @description user api route
 */

const router = require('koa-router')()
const { 
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
} = require('../../controller/user')
const { getFollows } = require('../../controller/user-relation')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// check if exist
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// register router
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({userName, password, gender})
})

//login
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

//delete
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        //测试环境下 测试账号自己登陆后删除自己
        const { userName } = ctx.session.userInfo
        //调用controller
        ctx.body = await deleteCurUser(userName)
    }
})

//修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, {nickName, city, picture})
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})

// logout
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})


// get@list
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo

    const result = await getFollows(userId)
    const { followsList } = result.data
    const list = followsList.map(user => {
        // nickName - userName
        return `${user.nickName} - ${user.userName}`
    })
    ctx.body = list

})

module.exports = router