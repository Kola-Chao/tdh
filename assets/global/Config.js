class Config {

};

Config.ServerIP = "http://localhost:8080";
Config.VersionCode = 1;
Config.WebSocketTimeOut = 100; //正式部署可改成0
Config.WebSocketUrl = "ws://localhost:8080";

module.exports = Config;