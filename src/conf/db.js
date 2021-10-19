/**
 *  @description 存储配置
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '89912131',
    port: '3306',
    database: 'koa2_weibo_db'
}

// 判断环境是线上还是线下
if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '89912131',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'dev') {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '89912131',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}