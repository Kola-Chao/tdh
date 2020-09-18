// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
        isDoubleClick: {
            default: true,
            tooltip: "是否支持打开双击检测，默认打开",
        },

        doubleClickOffTime: {
            default: 600,
            tooltip: "双击之间的间隔时间毫秒(ms)",
            visible() {
                return this.isDoubleClick;
            }
        },

        doubleClickEvent: {
            default: null,
            tooltip: "双击发生的响应事件",
            type: cc.Component.EventHandler,
            visible() {
                return this.isDoubleClick;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._doubleClickState = false;
        this._doubleClickOffTime = 0;
        this._doubleClickEvent = new cc.Component.EventHandler;
        this._doubleClickEvent.target = this.node.getParent().getParent().getParent().getParent(); //根据UI构造定义
        this._doubleClickEvent.component = "Game";
        this._doubleClickEvent.handler = "onHoldCardDoubleClick";
    },

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (this.isDoubleClick && this._doubleClickState) {
                if (this._doubleClickOffTime <= this.doubleClickOffTime) {
                    this._doubleClickEvent.emit([this.node, parseInt(this.node.getComponentInChildren(cc.Label).string)]);
                }
                this._doubleClickState = false;
                this._doubleClickOffTime = 0
            } else {
                this._doubleClickState = true;
                this._doubleClickOffTime = 0;
            }
        }, this);

    },

    update(dt) {
        if (this._doubleClickState) {
            if (this._doubleClickOffTime > this.doubleClickOffTime) {
                this._doubleClickOffTime = this.doubleClickOffTime;
            }
            this._doubleClickOffTime += dt * 1000;
        }
    },
});