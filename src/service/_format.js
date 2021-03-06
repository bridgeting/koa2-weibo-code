/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constanct')
const { timeFormat } = require('../utils/dt')

/**
 * 
 * @param {Object} obj  userInfo object
 * @returns 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 
 * @param {Array|Object} list 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }
    return _formatUserPicture(list)
}

/**
 * 格式化weibo数据的时间
 * @param {Object} obj数据
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 
 */
function _formatContent(obj) {
    obj.contentFormat = obj.content

    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )
    return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatDBTime).map(_formatContent)
    }
    // Object
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUser,
    formatBlog
}