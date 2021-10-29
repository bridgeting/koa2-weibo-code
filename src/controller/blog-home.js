/**
 * @description index page controller
 */

const xss = require('xss')
const { PAGE_SIZE } = require('../conf/constanct')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowsBlogList } = require('../service/blog')


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

/**
 * 
 * @param {*} userId 
 * @param {*} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowsBlogList({userId, pageIndex, pageSize: PAGE_SIZE})
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