/**
 * @description weibo at relation test
 */

const server = require('../server')
const { Z_COOKIE, L_COOKIE, L_USER_NAME } = require('../testUserInfo')

let BLOG_ID = ''

test('zhangsan创建一微博，@李四，成功', async () => {
    const content = `unit test auto created weibo @李四 - ${L_USER_NAME}`
    const res = await server
        .post('/api/blog/create')
        .send({
            content
        })
        .set('cookie', Z_COOKIE)

    expect(res.body.errno).toBe(0)
    BLOG_ID = res.body.data.id
})


test('获取lisi的@list，应该有刚刚创建的weibo', async () => {
    const res = await server
        .get('/api/atMe/loadMore/0')
        .set('cookie', L_COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    const isHaveCurBlog = data.blogList.some(blogItem => blogItem.id === BLOG_ID )
    expect(isHaveCurBlog).toBe(true)
})