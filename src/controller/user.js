/**
 * @description user controller
 * 业务逻辑处理
 * 调用service 获取数据
 * 统一返回格式 
 */

const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
    registerUserNameNotExistInfo 
} = require('../model/ErrorInfo')

/**
 * 
 * @param {string} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

module.exports = {
    isExist
}