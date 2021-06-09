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

module.exports.logout = (data) => {
    return {
        data: data
    }
}