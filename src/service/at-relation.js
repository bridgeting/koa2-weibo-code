/**
 * @description weibo at 用户关系service
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建微博 @ 用户关系
 * @param {string} blogId 
 * @param {string} userId 
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({ blogId, userId})
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

module.exports = {
    createAtRelation,
    getAtRelationCount
} 