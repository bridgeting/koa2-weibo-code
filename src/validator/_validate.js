/**
 * @description json schema validate
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 比较慢
})

/**
 * 
 * @param {Object} schema 
 * @param {Object} data 
 */
function validate(schema, data = {}) {
    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (!valid) {
        return validate.errors[0]
    }
}

module.exports = validate
