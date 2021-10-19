const ENV = process.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    nodeDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test'
}