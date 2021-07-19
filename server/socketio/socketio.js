const SQL = require('../mysqldb/conn')
const CONST = require('../constant/constant')

const user = new Map()

module.exports = server => {
    const io = require('socket.io')(server)
    
    // 监视客户端 和 服务器连接
    io.on('connection', socket => {
        const cookie = paresCookie(socket.handshake.headers.cookie)
        console.log('链接scoket')
        user.set(cookie.us, socket)
        socket.on('getMsg', data => {  // id  chat_id  content  chat_content
            const {id, content, username} = data
            console.log(data)
            SQL.sqlStr(`
            insert into chat_msg (chatid, userid, content) 
            values (?, (select id from user where username = ?), ?)`,
            [id, username, content]).then(data => {
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
                `, [id]).then(data => {
                    socket.emit('putMsg', CONST.data(data))
                    let state = 0
                    data.forEach(v => {
                        if (v.chat_username !== username && state === 0) {
                            console.log(v.chat_username)
                            try {
                                user.get(v.chat_username).emit('putMsg', CONST.data(data))
                                console.log('发送到另外一个用户成功')
                                state = 1
                            } catch(e) {}
                        }
                    })
                })
            }).catch(err => {
                socket.emit('putMsg', CONST.sqlError(err))
            })

        })
    })
}

function paresCookie(str) {
    let keyValue = str.split(';')
    let obj = {}
    keyValue.forEach(v => {
        obj[v.split('=')[0].toString().trim()] = v.split('=')[1].toString().trim()
    });
    return obj
}