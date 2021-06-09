var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var SQL = require('../mysqldb/conn')
var CONST = require('../constant/constant')

class secret {
    constructor () {
        this.cookie = {}
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
        console.log(data)
        res.cookie('us', un, {signed:true}) // 设置cookie 用户名 保存登陆状态
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
  const pass = Secret.setSecret(un);
  SQL.sqlStr('select password from user where username = ? ', [un]).then(data => {
      if (data.length === 0) res.json(CONST.success('nouser'))
      else if (data[0].password !== ps) {
        res.json(CONST.error('noUser'))
      } else if (data[0].password === ps){
        res.cookie('us', un, {signed:true})
        res.json(CONST.success('success'))
      }
  }).catch(err => {
    res.json(CONST.error('serverErr'))
  })
//   res.cookie('us', un /*, {httpOnly: true}*/)
})

router.post('/logout', (req, res) => {
  res.clearCookie('us')
  res.json(CONST.logout('logout'))
})
  
module.exports = router;