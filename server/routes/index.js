var express = require('express');
var router = express.Router();
var crypto = require('crypto')  // 引入加密库
var SQL = require('../mysqldb/conn') // 引入 连接的SQL
var CONST = require('../constant/constant') // 引入 定义的返回常量规范
var FILE = require('../readFile/readFile') // 引入 封装 fs 读取文件

class secret {     // 定义加密方法与 服务器保存 token
    constructor () { 
        this.cookie = new Map()
    }
    setSecret(str) {
        const obj = crypto.createHash('md5')
        obj.update(str)
        // 加密二进制读取成字符串
        let token = obj.digest('hex')
        this.setSecreteCookie(token, str)
        return token
    }
    setSecreteCookie(token, str) {
        this.cookie[token] = str
    }
}

const Secret = new secret()
const readFile = new FILE()

router.post('/registration', async function(req, res, next) {
    const {un} = req.body
    const {ps} = req.body
    // const pass = Secret.setSecret(un) 加密

    SQL.sqlStr('insert into user (username, password) values ( ?, ?)', [un, ps]).then((data) => {
        const token = Date.now()
        Secret.cookie.set(un, token)
        res.cookie('us', un)  // 设置cookie 用户名 保存登陆状态
        res.cookie('tk', token)
        res.json(CONST.success('success'))
    }).catch(err => {
        res.json(CONST.error('entry key', 1062))
    })

    // try {
    //     const sqlResult = await SQL.sqlStr('insert into user (username, password) values ( ?, ?)', [un, ps])
    //     res.cookie('us', un)
    //     res.json(CONST.success('success'))
    //     res.redirect('/index')
    // } catch(err) {
    //    if (err.errno === 1062) {
    //        res.json(CONST.error('entry key', 1062))
    //    }
    // }
});

router.post('/login', (req, res, next) => {
  const {un} = req.body
  const {ps} = req.body
  // const pass = Secret.setSecret(un);

  SQL.sqlStr('select password from user where username = ? ', [un]).then(data => {
      if (data.length === 0) res.json(CONST.success('nouser'))
      else if (data[0].password !== ps) {
        res.json(CONST.error('noUser'))
      } else if (data[0].password === ps){
        const token = Date.now()
        Secret.cookie.set(un, token)
        res.cookie('us', un)
        res.cookie('tk', token)
        res.json(CONST.success('success'))
      }
  }).catch(err => {
    res.json(CONST.error('serverErr'))
  })
//   res.cookie('us', un /*, {httpOnly: true}*/)
})

router.post('/logout', (req, res) => {
  if (Secret.cookie.get(req.cookies.us)) Secret.cookie.delete(req.cookies.us)
  res.clearCookie('tk', {httpOnly: true})
  res.clearCookie('us')
  res.json(CONST.logout('logout'))
})

router.use('/personal', (req, res, next) => {  // 检测cookie是否在登录状态中
  if (Secret.cookie.get(req.cookies.us) == req.cookies.tk) next() // 存在放行
  else {
    if (Secret.cookie.get(req.cookies.us)) Secret.cookie.delete(req.cookies.us)  // 不存在删除cookie 防止用户修改cookie
    res.clearCookie('us')
    res.clearCookie('tk', {httpOnly: true})
    res.send()
  }
})

router.post('/personal', (req, res) => {  //  个人主页
  res.json({data: 'personal'})
})

router.get('/imgloop/:id', (req, res) => {  // 首页轮播图
  const name = 'index' + req.params.id
  readFile.readPic(name).then(data => {
    data.pipe(res)
  }).catch(err => {
    res.send('<h1 style="text-align: center;margin-top: 100px;">404 NOT FOUND</h1>')
  })
})
  
module.exports = router;