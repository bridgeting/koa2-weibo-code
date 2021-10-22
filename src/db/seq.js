/**
 *  @description sequelize instance
 *  @author bridget
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
    host,
    dialect: 'mysql'
}

if (isTest) {
    conf.logging = () => {}
}

// 线上环境，使用连接池（连接池是在内存中，但是可以通过连接释放连接）
if (isProd) {
    conf.pool = {
        max: 5, // 连接池最大连接数
        min: 0, // 最小
        idle: 10000, // 如果一个pool 10s都没有使用则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq