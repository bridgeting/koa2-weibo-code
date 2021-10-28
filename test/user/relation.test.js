/**
 * @description user relation unit test
 */

const server = require('../server')

const { getFans, getFollows } = require('../../src/controller/user-relation')

const {
    Z_ID, Z_USER_NAME, Z_COOKIE,
    L_ID, L_USER_NAME, L_COOKIE
} = require('../testUserInfo')


test('无论如何，先取消再关注', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: L_ID })
        .set('cookie', Z_COOKIE)

    expect(1).toBe(1)
})

test('关注，应该成功', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({ userId: L_ID })
        .set('cookie', Z_COOKIE)

    expect(res.body.errno).toBe(0)
})

test('获取lisi粉丝，应该有zhangsan', async () => {
    const result = await getFans(L_ID)
    const { count, fansList } = result.data
    const hasUserName = fansList.some(fanInfo => {
        return fanInfo.userName === Z_USER_NAME
    })

    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

test('获取zhangsan关注人，应该有lisi', async () => {
    const result = await getFollows(Z_ID)
    const { count, followsList } = result.data
    const hasUserName = followsList.some(followInfo => {
        return followInfo.userName === L_USER_NAME
    })

    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

test('z取消关注l, 应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: L_ID })
        .set('cookie', Z_COOKIE)

    expect(res.body.errno).toBe(0)
})