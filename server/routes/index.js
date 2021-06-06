var express = require('express');
var router = express.Router();
var crypto = require('crypto')

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

router.post('/registration', function(req, res, next) {
    // console.log(req.path) /registration
    const {un} = req.body
    const {ps} = req.body
    const pass = Secret.setSecret(un);
    res.cookie('us', pass)
    res.json({status: 'success'})
});

router.post('/login', (req, res, next) => {
  const {un} = req.body
  const {ps} = req.body
  const pass = Secret.setSecret(un);
  res.cookie('us', un /*, {httpOnly: true}*/)
  res.json({status: 'success'})
})
  
module.exports = router;