// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var innings = 4;
var playRule = 0; //0 是加番  1 是加底

cc.Class({
    extends: cc.Component,

    properties: {
        InningsRadio: {
            default: [],
            type: cc.Toggle,
        },
        PlayRuleRadio: {
            default: [],
            type: cc.Toggle,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},

    onInningsRadioBtnClick(toggle) {
        var index = this.InningsRadio.indexOf(toggle);
        switch (index) {
            case 0:
                innings = 4;
                break;
            case 1:
                innings = 8;
                break;
            default:
                break;
        }
    },

    onPlayRulesRadioBtnClick(toggle) {
        var index = this.InningsRadio.indexOf(toggle);
        switch (index) {
            case 0:
                playRule = 0;
                break;
            case 1:
                playRule = 1;
                break;
            default:
                break;
        }
    },

    onConfirmBtnClick() {
        cc.resources.load("sound/btnClick", cc.AudioClip, null, function (err, clip) {
            cc.audioEngine.playEffect(clip, false, 1);
        });
        cc.director.loadScene("game");
    },

    onCloseBtnClick() {
        this.node.active = false;
    },
});