/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @param {string} userName 
 * @param {string} password 
 * /isExist /login
 * 三层之间并不是一一对应的 需要独立抽象
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) {
        return result
    }

    // data format
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

module.exports = {
    getUserInfo
}