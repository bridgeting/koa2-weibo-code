/**
 * @description weibo view router
 */

const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollows } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')

// index page
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    //获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    //获取关注人列表
    const followsResult = await getFollows(userId)
    const { count: followsCount, followsList } = followsResult.data

    await ctx.render('index', {
        userData: {
            userInfo: userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followsData: {
                count: followsCount,
                list: followsList
            }
        },
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        }
    })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    //当前已登陆的用户信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    //拿到个人主页的用户信息
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            return // 用户不存在 404
        }
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    //获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    //获取关注人列表
    const followsResult = await getFollows(curUserInfo.id)
    const { count: followsCount, followsList } = followsResult.data

    //我是否关注此人
    const amIFollow = fansList.some(item => {
        return item.userName === myUserName
    })

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            amIFollow,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followsData: {
                count: followsCount,
                list: followsList
            }
        }
    })
})


router.get('/square', loginRedirect, async (ctx, next) => {
    //获取微博数据 第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })

})

module.exports = router