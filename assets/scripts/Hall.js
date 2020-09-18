// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const userInfo = require('../global/UserInfo');

cc.Class({
    extends: cc.Component,

    properties: {
        userHeadImg: cc.Node,
        userName: cc.Label,
        userID: cc.Label,
        userCoin: cc.Label,
        creadRoomDialog: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("load..");
    },

    start() {
        console.log("start..");
        this.userName.string = userInfo.userName;
        var self = this.userHeadImg;
        if (userInfo.gender == 1) {
            cc.resources.load("public_ui", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame('head_img_male');
                self.spriteFrame = frame;
            });
        }
    },

    // update (dt) {},

    onCreatRoomBtnClick() {
        cc.resources.load("sound/btnClick", cc.AudioClip, null, function (err, clip) {
            cc.audioEngine.playEffect(clip, false, 1);
        });
        if (!this.creadRoomDialog.active) {
            this.creadRoomDialog.active = true
        }
    },

    onJoinRoomBtnClick() {
        cc.resources.load("sound/btnClick", cc.AudioClip, null, function (err, clip) {
            cc.audioEngine.playEffect(clip, false, 1);
        });
    }

});