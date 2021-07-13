var express = require('express');
var router = express.Router();
var FILE = require('../readFile/readFile') // 引入 封装 fs 读取文件
var SQL = require('../mysqldb/conn') // 引入 连接的SQL
var CONST = require('../constant/constant') // 引入 定义的返回常量规范
var url = require('url');
var multiparty = require('multiparty') // 解析 formData 参数
var path = require('path')

const readFile = new FILE()

router.use('/', express.static('public')) // /personal url下 打开public访问权限

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
    SQL.sqlStr(`
        select ur.userid as my_user_id,
        u.username as friend_username,
        u.name as friend_nickname,
        u.header_pic as friend_header_pic,
        u.id as friend_id
        from user_relation ur
        left join user u
        on u.id = ur.friendid
        where groupid = 1 and
        ur.userid = (select id from user 
            where username = ?);
    `, [username]).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json(CONST.sqlError(err))
    })
})

router.get('/chat', async (req, res) => { // 返回用户聊天列表
    res.setHeader('Connection', 'keep-alive')
    const username = req.cookies.us
    try {
        let sqlResult = await SQL.sqlStr(`
                select
                cr.id as chat_root_id,
                cr.userid as owner_id,
                cr.anotherid as other_id,
                u.username as user_username,
                u.name as user_nickname,
                u.id as user_id,
                u.header_pic as user_header_pic
                from chat_root cr
                left join user u
                on cr.userid = u.id or cr.anotherid = u.id
                where cr.userid = (select id from user where username = ?)
                or cr.anotherid = (select id from user where username = ?)
        `, [username, username])

        res.json(CONST.data(sqlResult))
    } catch {
        res.json(CONST.sqlError('catch a error on SQL'))
    }
})

router.post('/chat/getmsg', (req, res) => {
    const chat_root_id = req.body.chat_root_id * 1
    const username = req.cookies.us
    SQL.sqlStr(`
        select cm.userid as chat_userid,
        cm.time, cm.read as state,
        u.username as chat_username,
        cm.content as chat_content,
        u.header_pic as user_header_pic
        from chat_msg cm
        left join chat_root cr
        on cr.id = cm.chatid
        left join user u
        on u.id = cm.userid
        where cm.chatid = ?
    `, [chat_root_id]).then(data => {
        res.json(CONST.data(data))
    }).catch(err => {
        res.json(CONST.sqlError(err))
    })
})

module.exports = router;