/**
 * @description user relation controller
 */

const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    getUsersByFollowed,
    addFollower,
    deleteFollower
} = require('../service/user-relation')

/**
 * get fans list by userId
 * @param {number} userId
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollowed(userId)

    return new SuccessModel({
        count,
        fansList: userList
    })
}

/**
 * follow
 * @param {number} myUserId 
 * @param {number} curUserId 
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        console.error(ex)
        return new ErrorModel(addFollowerFailInfo)
    }
}


/**
 * unfollow
 * @param {number} myUserId 
 * @param {number} curUserId 
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}


module.exports = {
    getFans,
    follow,
    unFollow
}