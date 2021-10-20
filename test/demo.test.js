/**
 * @description test demo
 */

function sum(a, b) {
    return a + b
}

test('10 + 20 equals 30', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
    // expect(res).not.toBe(40)
})