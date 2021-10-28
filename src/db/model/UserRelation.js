/**
 * @description user follow relation model
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allNull: false,
        comment: 'userId'
    },
    followId: {
        type: INTEGER,
        allNull: false,
        comment: 'follow Id'
    }
})

module.exports = UserRelation 