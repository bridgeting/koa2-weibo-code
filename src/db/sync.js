/**
 *  @description sequelize同步数据库
 */

const seq = require('./seq')

require('./model/index')

// test
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// sync force means force to clear all the previous data before sync
// { force: true }
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})

