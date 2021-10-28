/**
 * @description 个人主页controller
 */

const { getBlogListByUser } = require('../service/blog')
const { PAGE_SIZE } = require('../conf/constanct')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取个人主页微博列表
 * @param {string} userName 
 * @param {number} pageIndex 
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser({ userName, pageIndex, pageSize: PAGE_SIZE })
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}