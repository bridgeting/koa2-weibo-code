/**
 * @description user data model
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')


//users 会覆盖之前demo的表
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: 'username unique'
    },
    password: {
        type: STRING,
        allowNull: false
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: 'nickname'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '1 - male, 2 - female, 3 - secret'
    },
    picture: {
        type: STRING,
        comment: 'picture url'
    },
    city: {
        type: STRING,
        comment: 'city'
    }
})

module.exports = User