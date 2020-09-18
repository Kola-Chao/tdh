// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const config = require('../global/Config');
const userInfo = require('../global/UserInfo');

var gender = 0; //0是女 1是男
var userName = "";

cc.Class({
    extends: cc.Component,

    properties: {
        userHeadImg: {
            default: null,
            type: cc.Sprite,
        },
        userNameEditBox: cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },

    // update (dt) {},

    start() {
        this.onRandomBtnClick();
    },

    onRandomBtnClick() {
        this.btnClickSound();
        var names = [
            "上官",
            "欧阳",
            "东方",
            "端木",
            "独孤",
            "司马",
            "南宫",
            "夏侯",
            "诸葛",
            "皇甫",
            "长孙",
            "宇文",
            "轩辕",
            "东郭",
            "子车",
            "东阳",
            "子言",
        ];

        var names2 = [
            "雀圣",
            "赌侠",
            "赌圣",
            "稳赢",
            "不输",
            "好运",
            "自摸",
            "有钱",
            "土豪",
        ];
        var idx = Math.floor(Math.random() * (names.length - 1));
        var idx2 = Math.floor(Math.random() * (names2.length - 1));
        userName = this.userNameEditBox.string = names[idx] + names2[idx2];

    },

    onFemalBtnClick() {
        this.btnClickSound();
        gender = 0;
        var self = this.userHeadImg;
        // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
        // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
        cc.resources.load("public_ui", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('head_img_female');
            self.spriteFrame = frame;
        });
    },

    onMaleBtnClick() {
        this.btnClickSound();
        gender = 1;
        var self = this.userHeadImg;
        // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
        // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
        cc.resources.load("public_ui", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('head_img_male');
            self.spriteFrame = frame;
        });
    },

    onConfirmBtnClick() {
        this.btnClickSound();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", config.serverIP + "/user/registUser?username=" + this.userNameEditBox.string + "&gender=" + gender, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status >= 200 && xhr.status < 300)) {
                if (this.responseText == "SUCCESS") {
                    cc.director.loadScene("hall", function () {
                        userInfo.userName = userName;
                        userInfo.gender = gender;
                    });
                }
            }
        }
        xhr.send();
    },

    btnClickSound() {
        cc.resources.load("sound/btnClick", cc.AudioClip, null, function (err, clip) {
            cc.audioEngine.playEffect(clip, false, 1);
        });
    },
});