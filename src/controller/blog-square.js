/**
 * @description 广场页controller
 */

const { PAGE_SIZE } = require('../conf/constanct')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 广场微博列表页
 * @param {number|string} pageIndex 
 */
async function getSquareBlogList(pageIndex) {
    //cache
    const result = await getSquareCacheList({ pageIndex, pageSize: PAGE_SIZE })
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
    getSquareBlogList
}