var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var SQL = require('../mysqldb/conn')
var CONST = require('../constant/constant')

class secret {
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

router.post('/registration', async function(req, res, next) {
    // console.log(req.path) /registration
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
  res.clearCookie('tk')
  res.clearCookie('us')
  res.json(CONST.logout('logout'))
})

router.use('/personal', (req, res, next) => {  // 检测cookie是否在登录状态中
  if (Secret.cookie.get(req.cookies.us) == req.cookies.tk) next() // 存在放行
  else {
    if (Secret.cookie.get(req.cookies.us)) Secret.cookie.delete(req.cookies.us)  // 不存在删除cookie 防止用户修改cookie
    res.clearCookie('us')
    res.clearCookie('tk')
    res.send()
  }
})

router.post('/personal', (req, res) => {
  res.json({data: 'personal'})
})
  
module.exports = router;