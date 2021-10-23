/**
 * @description user model test
 */

const { User } = require('../../src/db/model/index')

test('User properties match expected', () => {
    // build会构建一个内存的User实例，但不会提交到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: 'p123123',
        nickName: 'zhangsan',
        picture: '/xxx.png',
        city: 'beijing'
    })

    //验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p123123')
    expect(user.nickName).toBe('zhangsan')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('beijing')
})