# Cocoscreator学习项目
自主开发（前端&后端），仅使用了麒麟子大大开源项目里的UI 

通过该项目能基本的掌握cocos的基本组件、自定义组件、Layout+prefab Widget等优化布局、动画和音效使用

## 前端 （Cocoscreator 2.4.2）
使用的http和websocket与服务器通讯。全部使用的cocosAPI

- start初始页面做版本判断与结果的显示，通过则可以登陆
- creatuser支持性别选择，随机生成用户名
- hall支持创建房间，选择房间游戏规则
- game游戏等待和游戏开始，游戏等待支持玩家进入房间，玩家准备。游戏开始支持发牌，打牌，胡牌和轮次判定与限制

## 服务器 （使用了NodeJS+Express+ws+MongoDB）
```
"dependencies": {
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "md5": "^2.3.0",
    "mongoose": "^5.10.3",
    "uuid": "^8.3.0",
    "websocket": "^1.0.32",
    "ws": "^7.3.1"
  }
```
