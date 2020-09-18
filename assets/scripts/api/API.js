module.exports = {
    
    getJSONMessage(message) {
        if (message != null) {
            let result;
            let serverMessage = JSON.parse(message);
            result.type = serverMessage.type;
            result.data = serverMessage.data;
            return result;
        }
    },
}