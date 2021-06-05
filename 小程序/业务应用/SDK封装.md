## 环境判断：
```JS
export default {
    //区分端
    isWeapp: app === 'weapp',
    isSwan: app === 'swan',
    isAlipay: app === 'alipay',

    //区分平台（业务）
    isWB: platform === 'wb',
    isAjk: platform === 'ajk',

    //区分集成方式
    isApp: build === 'app', //原生
    isPlugin: build === 'plugin', //插件

    // 判断是否58房产小程序
    isWuba: build === 'app'
}

```

## SDK封装
```JS
getLogInfo() {
    return this.MAIN.getLogInfo()
  }
  getOpenId() {
    return this.MAIN.getOpenId()
  }
  getOpenIdPromise() {
    return this.MAIN.getOpenIdPromise()
  }
  getGpsInfo() {
    return this.MAIN.getGpsInfo()
  }
  getCityInfo() {
    return this.MAIN.getCityInfo()
  }
  isLogin() {
    return this.MAIN.isLogin()
  }
  gotoLogin() {
    return this.MAIN.gotoLogin()
  }
  getLoginUrl(parm) {
    const url = this.MAIN.getLoginUrl(parm)
    wx.navigateTo({ url })
    return;
  }
  gotoIM(parm) {
    return this.MAIN.gotoIM(parm.wbImParm.agentID, parm.wbImParm.parms, parm.platform)
  }
  getIMUrl() {
    return this.MAIN.getIMUrl()
  }
  getUserInfo() {
    return this.MAIN.getUserInfo()
  }
  getWebUrl() {
    return this.MAIN.getWebUrl()
  }
  goToWebUrl(parm1, parm2) {
    return this.MAIN.goToWebUrl(parm1, parm2)
  }

  getScene() {
    return this.MAIN.getScene()
  }
```

