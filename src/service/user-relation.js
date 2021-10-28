/**
 * @description user relation services
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取被关注用户的粉丝列表
 * @param {*} followedId 
 */
async function getUsersByFollowed (followedId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: { followId: followedId }
            }
        ]
    })
    // result.count result.rows
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param {number} userId 用户id
 * @param {number} folowId 被关注用户id
 */
async function addFollower(userId, followId) {
    const result = await UserRelation.create({
        userId,
        followId
    })
    return result.dataValues
}


async function deleteFollower(userId, followId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followId
        }
    })
    return result > 0
}

module.exports = {
    getUsersByFollowed,
    addFollower,
    deleteFollower
}