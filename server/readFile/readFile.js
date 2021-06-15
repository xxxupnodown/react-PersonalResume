const fs = require('fs')

class readFile {

    constructor() {
        this.path = './server/public/images'
    }
    
    readPicNum (file) {  // 读取图片名字数组
        return new Promise((resolve, reject) => {
            fs.readdir(this.path + '/' + file, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    readStreamPic (file,name) { // 读取图片
        return new Promise( async (resolve, reject) => {
            const arr = await this.readPicNum(file)
            name = name + '.jpg'
            if (arr.indexOf(name) !== -1) {
                let url = this.path + '/' + file + '/' + name
                const buffer = fs.createReadStream(url, {
                    autoClose: true
                })
                resolve(buffer)
            }
            reject('no file')
        })
    }

    readPic (path) { // 图片转成 base64 返回
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    // 转换成base64格式
                    let str = Buffer.from(data).toString('base64')
                    resolve(str)
                }
            })
        })
    }

    reName (oldPath, newPath) {
        return new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, (err) => {
                if (err) reject(err)
                else resolve('success')
            })
        })
    }
}

module.exports = readFile