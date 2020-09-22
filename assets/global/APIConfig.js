class APIConfig {
    /*  sendJSON(type, data) {
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
APIConfig.GameWait = "gameWait";
APIConfig.GameZhuangPos = 0; //庄家位置默认0
APIConfig.GameWait_UsrReady = "gameWait_usrReady";
APIConfig.GameWait_UsrComin = "gameWait_usrComin";
APIConfig.GameWait_Start = "gameWait_start";
APIConfig.ChangePlayer = "changePlayer";

module.exports = APIConfig;