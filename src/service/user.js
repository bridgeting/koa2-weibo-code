/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { addFollower } = require('./user-relation')
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



/**
 * 
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 
 * @param {string} nickName
 */
async function createUser({ userName, password, gender = 3, nickName}) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })

    //自己关注自己
    const data = result.dataValues
    addFollower(data.id, data.id)

    return data
}


/**
 * 
 * @param {string} userName 
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    
    // rows
    return result > 0
}

/**
 * 
 * @param {Object} updatedInfo: newPassword, newNickName, newPicture
 * @param {Obecjt} search condition: userName, password
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    //拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }
    //拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    //update
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0

}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}