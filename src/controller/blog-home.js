/**
 * @description index page controller
 */

const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../service/blog')


/**
 * create weibo
 * @param {Object} create weibo data: userId, content, image
 */
async function create({userId, content, image}) {
    try {
        const blog = await createBlog({
            userId, 
            content: xss(content), 
            image
        }) 
        return new SuccessModel(blog)
    } catch(ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo) 
    }
}

module.exports = {
    create
}