/**
 * @description 微博广场页数据缓存页
 */

const { set, get } = require('./_redis')
const { getBlogListByUser } = require('../service/blog')

const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场页列表的微博缓存
 * @param {string|number} pageIndex pageSize 
 */
async function getSquareCacheList({pageIndex, pageSize}) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    const cacheResult = await get(key)
    if (cacheResult != null) {
        return cacheResult
    }

    const result = await getBlogListByUser({pageIndex, pageSize})
    set(key, result, 60) //缓存1min
    return result
}

module.exports = {
    getSquareCacheList
}



