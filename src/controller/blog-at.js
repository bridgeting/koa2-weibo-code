/**
 * @description weibo at relation controller
 */

const { getAtRelationCount } = require('../service/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 
 * @param {number} userId 
 */
async function atMeCount(userId) {

    const count = await getAtRelationCount(userId)
    return new SuccessModel({count})
    
}


module.exports = {
    atMeCount
}