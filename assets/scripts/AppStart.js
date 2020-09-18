// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const http = require('http');
const config = require('../global/Config');

var resoultCode;
cc.Class({
    extends: cc.Component,

    properties: {
        alert: {
            default: null,
            type: cc.Node,
        },
        netstatusLabel: cc.Label,
        loginBtn: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        var xhr = new XMLHttpRequest();
        var netstatusLabel = this.netstatusLabel;
        var loginBtn = this.loginBtn;

        xhr.open("GET", config.serverIP + "/?versionCode=" + config.versionCode, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status >= 200 && xhr.status < 300)) {
                resoultCode = this.responseText;
                if (resoultCode == "0") {
                    netstatusLabel.string = "";
                    loginBtn.node.active = true;
                } else if (resoultCode == "-1") {
                    netstatusLabel.string = "不是最新版本，请更新"
                }
            }
        }
        xhr.send();

    },

    // update(dt) {
    // },

    onLoginBtnClick() {
        cc.resources.load("sound/btnClick", cc.AudioClip, null, function (err, clip) {
            cc.audioEngine.playEffect(clip, false, 1);
        });
        // 第一个参数为场景的名字，第二个可选参数为场景加载后的回调函数
        cc.director.loadScene("creatUser");

    },
});