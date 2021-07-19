const mysql = require('mysql')

const options = {
    host: "81.68.166.26",
    port: "3306",
    user: "why",
    password: "why",
    database: "aijianli",
    dateStrings : true
}

let conn = mysql.createConnection(options)

conn.connect((err) => {
    if (err) console.log(err)
})

conn.query('set time_zone = "+8:00"');

module.exports.sqlStr = (query, arr) => {
    return new Promise((resolve, reject) => {
        if (arr) {
            conn.query(query, arr, (err, result, fields) => {
                if (err) reject(err)
                else resolve(result)
            })
        } else {
            conn.query(query, (err, result, fields) => {
                if (err) reject(err)
                else resolve(result)
            })
        }
    })
}