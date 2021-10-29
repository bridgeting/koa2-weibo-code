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

module.exports = {
    createAtRelation
} 