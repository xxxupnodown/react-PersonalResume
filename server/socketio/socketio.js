const SQL = require('../mysqldb/conn')
const CONST = require('../constant/constant')

module.exports = server => {
    const io = require('socket.io')(server)
    
    // 监视客户端 和 服务器连接
    io.on('connection', socket => {
        console.log('scoket连接成功')
        socket.on('getMsg', data => {  // id  chat_id  content  chat_content
            const {id, content, username} = data
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
                })
            }).catch(err => {
                socket.emit('putMsg', CONST.sqlError(err))
            })

        })
    })
}