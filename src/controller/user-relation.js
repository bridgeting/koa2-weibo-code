/**
 * @description user relation controller
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollowed } = require('../service/user-relation')

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

module.exports = {
    getFans
}