/**
 * @description weibo at 用户关系service
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建微博 @ 用户关系
 * @param {string} blogId 
 * @param {string} userId 
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({ blogId, userId })
    return result.dataValues
}


/**
 * 获取未读的@ 数量
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
}

/**
 * get @ user blog list
 * @param {Object} userId, pageIndex, pageSize = 10
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: {
                    userId
                }  
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = blogItem.user.dataValues
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }

}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList
}