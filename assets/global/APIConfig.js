class APIConfig {
    /* sendJSONMessage(type, data) {
        if (type != null) {
            return JSON.stringify({
                type: type,
                data: data,
            });
        }
    }; */
};

APIConfig.Init = "init"; //建立连接传递基本数据（uID，seatNum）
APIConfig.ChuPai = "chupai";
APIConfig.MoPai = "mopai";

module.exports = APIConfig;