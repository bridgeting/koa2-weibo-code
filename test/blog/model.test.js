/**
 * @description weibo data model unit test
 */

const expectExport = require('expect')
const { Blog } = require('../../src/db/model/index')

test('微博数据模型各个属性符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: 'weibo content',
        image: '/test.png'
    })

    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('weibo content')
    expect(blog.image).toBe('/test.png')
})