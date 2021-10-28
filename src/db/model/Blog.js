/**
 * @description weibo data model
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: 'userId'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: 'weibo content'
    },
    image: {
        type: STRING,
        comment: 'image url'
    }
})

module.exports = Blog