/**
 * @description user controller
 * 业务逻辑处理
 * 调用service 获取数据
 * 统一返回格式 
 */

const { 
    getUserInfo,
    createUser
} = require('../service/user')
const { 
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/cryp')


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


/**
 * 参数>3 使用结构
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 1-male 2-female 3-secret
 */
async function register({ userName, password, gender}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }
    
    try {
        await createUser({
            userName, 
            password: doCrypto(password), 
            gender
        })
        return new SuccessModel()
    } catch(ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}