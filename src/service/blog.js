/**
 * @description weibo service
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
    createBlog
}
