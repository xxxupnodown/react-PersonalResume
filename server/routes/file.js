var express = require('express');
var router = express.Router();
var FILE = require('../readFile/readFile') // 引入 封装 fs 读取文件
var SQL = require('../mysqldb/conn') // 引入 连接的SQL
var CONST = require('../constant/constant') // 引入 定义的返回常量规范
var url = require('url');
var multiparty = require('multiparty') // 解析 formData 参数
var path = require('path')

const readFile = new FILE()

router.post('/', async (req, res) => {  //  个人主页
    const username = req.cookies.us
    // 查表 nick sex 等
    const result = await SQL.sqlStr("select name, sex, personalDetail,header_pic from user where username = '"+ username +"';")
    // 找到头像转化成 base64
    let urlPic = result[0].header_pic
    readFile.readPic(urlPic, username).then(data => {
        res.json(CONST.data({
            headerPic: data,
            name: result[0].name,
            personalDetail: result[0].personalDetail,
            sex: result[0].sex
        }))
    }).catch(err => {
        res.json(CONST.error('fileErr'))
    })
})

router.post('/upload', (req, res) => {
    const username = req.cookies.us
    let form = new multiparty.Form({ uploadDir: './server/public/images/header'}) // 保存图片位置
    form.parse(req, function(err,fields,files){
        let {nickname, signature, sex} = fields // 获取修改数据库参数
        sex = sex * 1 // 转换成int型
        signature = signature === 'null' ? null : signature // 防止传递 字符串形 null
        if (files.file) { // 有图片执行 修改图片操作
            const oldPath = '.\\' + files.file[0].path // 获取旧img 地址
            const ext = path.extname(files.file[0].path) // 获取 img 后缀
            const dir = '.\\' + path.dirname(files.file[0].path) // 获取存储dir
            const newPath = dir + '\\' + username + ext // 生成新存储地址 与 名字
            Promise.all([
                readFile.reName(oldPath, newPath),
                SQL.sqlStr("update user set name = ?, sex = ?, personalDetail = ?, header_pic = ? where username = '"+ username +"';", [nickname, sex, signature, newPath])
            ]).then(data => {
                const result1 = data[0]
                const result2 = data[1]
                if (result1 === "success" && result2.message.indexOf('Warnings: 0') !== -1) { // 验证无错误信息返回成功
                    res.json(CONST.success('success'))
                } else {
                    res.json(CONST.sqlError({err: result1, err2: result2}))
                }
            })
        } else {  // 无修改图片
            SQL.sqlStr("update user set name = ?, sex = ?, personalDetail = ? where username = '"+ username +"';", [nickname, sex, signature]).then(data => {
                res.json(CONST.success('success'))
            }).catch(err => {
                res.json(CONST.sqlError(err))
            })
        }
    });
})

router.get('/userlist', (req, res) => { // 返回用户关系
    const username = req.cookies.us
    SQL.sqlStr(`select friendid from user_relation 
                where groupid = 1 and userid=(select id from user where username = ?)`, [username]).then((err, data) => {
        if (err) res.send(err)
        else res.json(data)
    })
})

router.get('/chat', (req, res) => { // 返回用户聊天列表
    const username = req.cookies.us
    SQL.sqlStr(`select content, time, userid from chat_msg
                where chatid in 
                (select id from chat_root 
                where userid = 
                (select id from user where username = ?) 
                or
                anotherid = (select id from user where username = ?))
                `, [username, username]).then(data => {
        console.log(data)
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;