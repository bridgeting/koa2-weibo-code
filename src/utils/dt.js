/**
 * @description 
 */

const { format } = require('date-fns')

/**
 * 
 * @param {string} date str
 * @returns 
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat
}