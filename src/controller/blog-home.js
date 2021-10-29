/**
 * @description index page controller
 */

const xss = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constanct')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowsBlogList } = require('../service/blog')
const { getUserInfo } = require('../service/user')
const { createAtRelation } = require('../service/at-relation')


/**
 * create weibo
 * @param {Object} create weibo data: userId, content, image
 */
async function create({ userId, content, image }) {
    //分析收集 content 中的@用户 
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr
        }
    )

    //根据用户名查询用户id
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )
    const atUserIdList = atUserList.map(user => user.id)
    

    try {
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        //创建@关系
        await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id, userId)))

        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 
 * @param {*} userId 
 * @param {*} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowsBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
    const { count, blogList } = result
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}