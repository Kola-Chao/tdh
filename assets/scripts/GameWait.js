// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const GameWs = require('./Game').ws;
const APIConfig = require('../global/APIConfig');
const UserInfo = require('../global/UserInfo');
const Broadcase = require('../global/Broadcast');
const sendJSON = require('./api/API');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        MyUser: cc.Node,
        MyUserReady: cc.Sprite,
        MyUserOffLine: cc.Sprite,

        LeftUser: cc.Node,
        LeftUserReady: cc.Sprite,
        LeftUserOffLine: cc.Sprite,

        TopUser: cc.Node,
        TopUserReady: cc.Sprite,
        TopUserOffLine: cc.Sprite,

        RightUser: cc.Node,
        RightUserReady: cc.Sprite,
        RightUserOffLine: cc.Sprite,

    },

    // LIFE-CYCLE CALLBACKS:

    /**
     * 服务器请求逻辑
     * 首先调用GameWait，刷新User Node
     * 点击准备按钮调用GameWait_UsrReady，刷新所有玩家准备状态
     * 服务器判断满足4人准备就开始GameWait_Start
     */
    onLoad() {
        ws.send(sendJSON(APIConfig.GameWait));
    },

    start() {
        var self = this;
        ws.addEventListener("message", function (event) {
            let message = JSON.parse(event.data);
            switch (message.type) {
                case APIConfig.GameWait:
                    UserInfo.gamePos = message.data;
                    break;
                case APIConfig.GameWait_UsrComin:
                    self.refreshUser(message.data);
                    break;
                case APIConfig.GameWait_UsrReady:
                    self.refreshReadUI(message.data);
                    break;
                case APIConfig.GameWait_Start:
                    self.node.dispatchEvent(new cc.Event.EventCustom(Broadcase.GameWait_Start, true));
                    break;
                default:
                    break;
            }
        })
    },

    // update (dt) {},

    //用户进入房间刷新用户UI
    refreshUser(data) {
        let self = this;
        data.forEach(element => {
            switch (element) {
                case UserInfo.bottomPos:
                    self.MyUser.active = true;
                    break;
                case UserInfo.LeftPos:
                    self.LeftUser.active = true;
                    break;
                case UserInfo.TopPos:
                    self.TopUser.active = true;
                    break;
                case UserInfo.RightPos:
                    self.RightUser.active = true;
                    break;
                default:
                    break;
            }
        });

    },

    //用户点击了准备刷新准备UI
    refreshReadUI(data) {
        let self = this;
        data.forEach(element => {
            switch (element) {
                case UserInfo.bottomPos:
                    self.MyUserReady.node.active = true;
                    break;
                case UserInfo.LeftPos:
                    self.LeftUserReady.node.active = true;
                    break;
                case UserInfo.TopPos:
                    self.TopUserReady.node.active = true;
                    break;
                case UserInfo.RightPos:
                    self.RightUserReady.node.active = true;
                    break;
                default:
                    break;
            }
        });

    },

    onBack2HallBtnClick() {
        cc.director.loadScene("hall");
    },

    onReadyBtnClick() {
        ws.send(sendJSON(APIConfig.GameWait_UsrReady, UserInfo.gamePos));
    },
});