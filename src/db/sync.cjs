/**
 *  @description sequelize同步数据库
 */

const seq = require('./seq')

// require('./model')

// test
seq.authenticate().then(() => {
    console.log('auth ok');
}).catch(() => {
    console.log('auth err');
})

// sync force means force to clear all the previous data before sync
seq.sync({ force: true }).then(() => {
    console.log('sync ok');
    process.exit()
})

