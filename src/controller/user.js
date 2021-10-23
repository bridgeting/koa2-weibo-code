/**
 * @description user controller
 * 业务逻辑处理
 * 调用service 获取数据
 * 统一返回格式 
 */

const { 
    getUserInfo,
    createUser,
    deleteUser
} = require('../service/user')
const { 
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo
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
 * 参数>3 使用结构来获取数据
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

/**
 * 
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
    // need ctx to set user session info
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    if (ctx.session.userInfo ==  null) {
        ctx.session.userInfo = userInfo
    }

    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    
    if (result) {
        return new SuccessModel()
    } else {
        return new ErrorModel(deleteUserFailInfo)
    }
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
}