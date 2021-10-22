/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constanct')

/**
 * 
 * @param {Object} obj  userInfo object
 * @returns 
 */
function _formatUserPicture(obj) {
    if (obj.picture ==  null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 
 * @param {Array|Object} list 
 */
function formatUser(list) {
    if (list ==  null) {
        return list
    } 
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}