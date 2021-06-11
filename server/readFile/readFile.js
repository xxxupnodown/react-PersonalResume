const fs = require('fs')

class readFile {

    constructor() {
        this.path = './server/public/images/imgloop'
    }
    
    readPicNum () {
        return new Promise((resolve, reject) => {
            fs.readdir(this.path, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    readPic (name) {
        return new Promise( async (resolve, reject) => {
            const arr = await this.readPicNum()
            name = name + '.jpg'
            if (arr.indexOf(name) !== -1) {
                let url = this.path + '/' + name
                const buffer = fs.createReadStream(url, {
                    autoClose: true
                })
                resolve(buffer)
            }
            reject('no file')
        })
    }
}

module.exports = readFile