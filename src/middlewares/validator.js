/**
 * @description json schema valite middleware
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 
 * @param {funtion} userValidate 
 * @returns middleware function
 */
function genValidator(validateFn) {
    return async (ctx, next) => {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        } 
        await next()
    }
}

module.exports = {
    genValidator
}