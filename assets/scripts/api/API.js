var sendJSON = (type, data) => {
    if (type != null) {
        return JSON.stringify({
            "type": type,
            "data": data,
        })
    }
}

var sendJSON = (type, data, userPos) => {
    if (type != null) {
        return JSON.stringify({
            "type": type,
            "data": data,
            "userPos": userPos,
        })
    }
}

module.exports = sendJSON;