/**
 * @description weibo at relation controller
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../service/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constanct')

/**
 * 
 * @param {number} userId 
 */
async function atMeCount(userId) {

    const count = await getAtRelationCount(userId)
    return new SuccessModel({ count })

}

/**
 * get @ user blogs
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
    const { count, blogList } = result
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * mark as read
 * @param {number} userId 
 */
async function markAsRead(userId) {
    try {
        await updateAtRelation(
            { newIsRead: true },
            { userId,  isRead: false }
        )
    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    atMeCount,
    getAtMeBlogList,
    markAsRead
}