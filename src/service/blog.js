/**
 * @description weibo service
 */

const { PAGE_SIZE } = require('../conf/constanct')
const { Blog, User,UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * @param {Object} userId, content, image
 */
async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {Object} search conditons suerName, pageIndex = 0, pageSize = 10
 */
async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    //result.count 总数和分页无关
    //result.rows 查询结果 数组
    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}


/**
 * 获取关注者的微博
 * @param {Object} userId, pageIndex = 0, pageSize = 10
 */
async function getFollowsBlogList({userId, pageIndex = 0, pageSize = 10}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followId'],
                where: {
                    userId
                }
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}


module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowsBlogList
}
