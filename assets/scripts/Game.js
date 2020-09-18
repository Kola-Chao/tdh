// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const gameManager = require('./GameManager');
const APIConfig = require('../global/APIConfig');
var currentNum = 0; //第几次出牌
var myHoldCardsData = [];
var myHoldCardsLayout = [];
var myPlayedCards = [];
var leftPlayedCards = [];

module.exports = ws = new WebSocket("ws://localhost:8080");;

cc.Class({
    extends: cc.Component,

    properties: {
        MyPlayer: {
            default: null,
            type: cc.Node,
        },
        MyHoldCardsLayout: {
            default: [],
            type: cc.Layout,
        },
        MyHoldCardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        MyPlayedCardsPrefab: {
            default: null,
            type: cc.Prefab,
        },
        MyPlayedCardsLayout: {
            default: null,
            type: cc.Layout,
        },
        MyPlayerOperate: {
            default: null,
            type: cc.Layout,
        },

        LeftPlayer: {
            default: null,
            type: cc.Node,
        },
        LeftPlayedCardsPrefab: {
            default: null,
            type: cc.Prefab,
        },
        LeftPlayedCardsLayout: {
            default: [],
            type: cc.Layout,
        },

        TopPlayer: {
            default: null,
            type: cc.Node,
        },
        TopPlayedCardsPrefab: {
            default: null,
            type: cc.Prefab,
        },
        TopPlayedCardsLayout: {
            default: [],
            type: cc.Layout,
        },

        RightPlayer: {
            default: null,
            type: cc.Node,
        },
        RightPlayedCardsPrefab: {
            default: null,
            type: cc.Prefab,
        },
        RightPlayedCardsLayout: {
            default: [],
            type: cc.Layout,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        myHoldCardsLayout = this.MyHoldCardsLayout.getComponentsInChildren(cc.Sprite);
        myPlayedCards = this.MyPlayedCardsLayout.getComponentsInChildren(cc.Sprite);
        var self = this;
        this.node.on("refreshHoldCarsByInit", function (data) {
            myHoldCardsData = self.insertionSort(data);
            self.refreshHoldCardsByInit(myHoldCardsData);
        });
        this.MyPlayer.active = true;
        this.LeftPlayer.active = true;
        this.TopPlayer.active = true;
        this.RightPlayer.active = true;
        this.MyHoldCardsLayout.active = true;



        this.MyPlayerOperate.node.active = true;
        this.MyPlayerOperate.node.getChildByName("ZiMoBtn").active = true;
        this.MyPlayerOperate.node.getChildByName("HuPaiBtn").active = true;
        this.MyPlayerOperate.node.getChildByName("PengBtn").active = true;
        this.MyPlayerOperate.node.getChildByName("GangBtn").active = true;
    },

    start() {

        var self = this;

        ws.onmessage = function (event) {
            let message = JSON.parse(event.data);
            if (message.type == APIConfig.Init) {
                self.node.emit("refreshHoldCarsByInit", message.data);
            } else if (message.type == APIConfig.MoPai) {
                const isLargeNumber = (myHoldCardsData) => myHoldCardsData >= message.data;
                let index = myHoldCardsData.findIndex(isLargeNumber); //根据规则找到最近一个大于等于当前摸到的拍的位置
                myHoldCardsData.splice(index, 0, message.data); //指定位置插入元素
                self.refreshHoldCardsByMoPai(message.data, index);
                // console.log(myHoldCardsData);
            } else {

            }
        };

        setTimeout(function () {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: APIConfig.Init,
                    data: 0,
                }));

            } else {
                console.log("timeout...");
            }
        }, 1000);

    },

    // update (dt) {},

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },

    //出牌
    onHoldCardDoubleClick(node, data) {
        myHoldCardsData.splice(myHoldCardsData.indexOf(data), 1);
        this.refreshPlayedCardsByChuPai(data);
        node.removeFromParent(false);
        ws.send(JSON.stringify({
            type: APIConfig.ChuPai,
            data: data,
        }));
    },

    //通过出牌逻辑刷新出牌UI
    refreshPlayedCardsByChuPai(data) {
        var item = cc.instantiate(this.MyPlayedCardsPrefab);
        var layout = this.MyPlayedCardsLayout;
        cc.resources.load("sound/gameplay/" + data, cc.AudioClip, null, function (err, clip) {
            var audioID = cc.audioEngine.play(clip, false, 1);
        });
        this.refreshUI(item, layout, data);
    },

    //初始化刷新手中的牌
    refreshHoldCardsByInit(data) {
        var self = this;
        var layout = this.MyHoldCardsLayout;
        data.forEach((element, index) => {
            var item = cc.instantiate(this.MyHoldCardPrefab);
            var itemNum = item.getComponentInChildren(cc.Label);
            itemNum.string = element;
            self.refreshUI(item, layout, element);
        });



    },

    //通过摸牌刷新手中的牌
    refreshHoldCardsByMoPai(data, position) {
        var layout = this.MyHoldCardsLayout;
        var item = cc.instantiate(this.MyHoldCardPrefab);
        var itemNum = item.getComponentInChildren(cc.Label);
        itemNum.string = data;
        this.refreshUI(item, layout, data, position);

    },

    //插入排序
    //https://juejin.im/post/6844903609885261832
    insertionSort(arr) {
        //console.time('InsertionSort');
        let len = arr.length;
        for (let i = 1; i < len; i++) {
            let j = i;
            let tmp = arr[i];
            while (j > 0 && arr[j - 1] > tmp) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = tmp;
        }
        //console.timeEnd('InsertionSort');
        return arr;
    },

    refreshUI(item, layout, element, position) {
        let itemFrame = item.getComponent(cc.Sprite);
        if (element < 10) { //条
            cc.resources.load("game/my/Z_my", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame('M_bamboo_' + element.toString());
                itemFrame.spriteFrame = frame;
            });

        } else if (element < 20) { //饼
            cc.resources.load("game/my/Z_my", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame('M_dot_' + (element - 10).toString());
                itemFrame.spriteFrame = frame;
            });
        } else if (element < 30) { //万
            cc.resources.load("game/my/Z_my", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame('M_character_' + (element - 20).toString());
                itemFrame.spriteFrame = frame;
            });
        } else if (element < 50) { //东南西北中发白
            var flowCardName;
            switch (element) {
                case 31: { //东
                    flowCardName = "M_wind_east";
                    break;
                }
                case 33: { //南
                    flowCardName = "M_wind_south";
                    break;
                }
                case 35: { //西
                    flowCardName = "M_wind_west";
                    break;
                }
                case 37: { //北
                    flowCardName = "M_wind_north";
                    break;
                }
                case 41: { //中
                    flowCardName = "M_red";
                    break;
                }
                case 43: { //发
                    flowCardName = "M_green";
                    break;
                }
                case 45: { //白
                    flowCardName = "M_white";
                    break;
                }
            }
            cc.resources.load("game/my/Z_my", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame(flowCardName);
                itemFrame.spriteFrame = frame;

            });
        } else {
            console.log("not legal data formate from server...")
        };
        if (position != null) {
            layout.node.insertChild(item, position);
        } else {
            layout.node.addChild(item);
        }
    },

    //自摸碰杠胡的逻辑判断
    onPengGangHuCheck() {

    },

    onPengBtnClick() {

    },

    onGangBtnClick() {

    },

    onGuoBtnClick() {

    },

    onHuPaiBtnClick() {

    },

    onZiMoBtnClick() {

    },


    canHuLaizi(cards, laiziCount) {
        if ((cards.length + laiziCount + 1) % 3 != 0) {
            // 若牌张数不是2、5、8、11、14则不能胡  
            return false;
        }
        // 排序方便胡牌判断  
        cards.sort(function (a, b) {
            return a - b;
        })
        // 依次删除一对牌做将，其余牌全部成扑则可胡  
        for (var i = 0; i < cards.length; i++) {
            if (i > 0 && cards[i] == cards[i - 1]) {
                // 和上一次是同样的牌，避免重复计算  
                continue;
            }
            if ((i + 1 < cards.length && cards[i] == cards[i + 1]) || laiziCount > 0) {
                // 找到对子、或是用一张癞子拼出的对子  
                var puCards = cards.slice();
                var puLaizi = laiziCount;
                puCards.splice(i, 1);
                if (puCards[i] == cards[i]) {
                    puCards.splice(i, 1);
                } else {
                    puLaizi--;
                }
                // 删去对子判断剩下的牌是否成扑  
                if (this.isShunKe(puCards, puLaizi)) {
                    return true;
                }
            }
        }
        if (laiziCount >= 2 && this.isShunKe(cards, laiziCount - 2)) {
            // 两个癞子做将牌特殊判定处理  
            return true;
        }
        return false;
    },

    isShunKe(cards, laiziCount) {
        if (cards.length === 0) {
            return true;
        }
        // 若第一张是顺子中的一张  
        for (var first = cards[0] - 2; first <= cards[0]; first++) {
            if (first % 10 > 7 || (laiziCount === 0 && first < cards[0])) {
                // 顺子第一张牌不会大于7点、无赖子情况下顺子第一张只能用手上的牌  
                continue;
            }
            var shunCount = 0;
            for (var i = 0; i < 3; i++) {
                if (cards.indexOf(first + i) >= 0) {
                    shunCount++;
                }
            }
            if (shunCount === 3 || shunCount + laiziCount >= 3) {
                // 找到包含第一张牌的顺子  
                var puCards = cards.slice();
                var puLaizi = laiziCount;
                for (var i = 0; i < 3; i++) {
                    var deletePos = puCards.indexOf(first + i);
                    if (deletePos >= 0) {
                        puCards.splice(deletePos, 1);
                    } else {
                        puLaizi--;
                    }
                }
                if (this.isShunKe(puCards, puLaizi)) {
                    // 剩下的牌成扑  
                    return true;
                }
            }
        }
        // 若第一张是刻子中的一张  
        var keziCount = 1;
        var keziCard = cards[0];
        if (cards[1] === keziCard) {
            keziCount++;
        }
        if (cards[2] === keziCard) {
            keziCount++;
        }
        if (keziCount === 3 || keziCount + laiziCount >= 3) {
            var puCards = cards.slice();
            var puLaizi = laiziCount;
            for (var i = 0; i < 3; i++) {
                var deletePos = puCards.indexOf(keziCard);
                if (deletePos >= 0) {
                    puCards.splice(deletePos, 1);
                } else {
                    puLaizi--;
                }
            }
            if (this.isShunKe(puCards, puLaizi)) {
                return true;
            }
        }
        return false;
    },
});