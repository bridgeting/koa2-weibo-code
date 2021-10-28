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

module.exports = {
    getUsersByFollowed
}