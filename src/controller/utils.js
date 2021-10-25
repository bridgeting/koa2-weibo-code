/**
 * @description util controller
 */

const path = require('path')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const fse = require('fs-extra')

// 文件最大1M
const MAX_SIZE = 1024 * 1024 * 1024

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if(!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 
 * @param {string} file name 
 * @param {string} type 
 * @param {number} size 
 * @param {string} filePath
 * @returns 
 */
async function saveFile({ name, type, size, filePath}) {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    //移动文件
    const fileName = `${Date.now()}.${name}` //防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    return new SuccessModel({
        url: `/${fileName}`
    })
}

module.exports = {
    saveFile
}