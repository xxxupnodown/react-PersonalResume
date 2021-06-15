module.exports.success = (data) => {
    return {
        data: data
    }
}

module.exports.error = (err, errId) => {
    return {
        err: err,
        errno: errId    
    }
}

module.exports.sqlError = (err, errId) => {
    return {
        sqlErr: err,
        errno: errId    
    }
}

module.exports.logout = (data) => {
    return {
        data: data
    }
}

module.exports.data = (data) => {
    return {
        data: data
    }
}