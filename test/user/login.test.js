/**
 * @description user api test
 */

const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

let COOKIE = ''

// register
test('注册一个用户，应该成功', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})

// register again username exist
test('重复注册用户，应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// check if user exist api
test('查询注册了的用户，应该存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.errno).toBe(0)
})

//json schema check
test('json schema检测，非法的格式，注册应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: 123, // 用户名应该是字母开头
            password: 'a', //minLength 3
            gender: 'male'
        })
    expect(res.body.errno).not.toBe(0)
})

// login
test('登陆，应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)

    //cookie
    COOKIE = res.headers['set-cookie'].join(';')
})

//delete
test('删除，应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)

    console.log('delete res ---- ', res.body);
    expect(res.body.errno).toBe(0)
})

//删除之后再次查询
test('删除之后再次查询，应该不存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.errno).not.toBe(0)
})