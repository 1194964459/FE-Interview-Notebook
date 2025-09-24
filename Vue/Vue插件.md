# Vue插件

一个插件可以是**一个拥有 install() 方法的对象**，也可以直接是一个安装**函数**本身。

作为对象（包含 install 方法）：
```js
const myPlugin = {
  install(app, options) {
    // 插件逻辑
    app.config.globalProperties.$hello = () => console.log('Hello from plugin!')
  }
}

// 使用插件
app.use(myPlugin)
```

作为安装函数
```js
function myPlugin(app, options) {
  // 插件逻辑（与上面的 install 方法内容相同）
  app.config.globalProperties.$hello = () => console.log('Hello from plugin!')
}

// 使用插件（调用方式完全一样）
app.use(myPlugin)
```

当你调用 `app.use(myPlugin)` 时，Vue 会自动检查：
* 如果传入的是对象，就调用它的 install 方法
* 如果传入的是函数，就直接调用这个函数本身


## 参数
app：在 Vue 3 中是 createApp 创建的应用实例。通过这个实例，你可以对整个应用进行全局配置，比如：
* 注册全局组件：app.component()。
* 添加全局属性：如代码中 app.config.globalProperties.$translate，这样在所有组件中都能通过 this.$translate（选项式 API）或 ctx.$translate（组合式 API 中 setup 上下文）访问到该方法。
* 注册自定义指令：app.directive() 等。

options：在使用插件时（通过 `app.use(plugin, options)`）传入的配置对象

## 示例：实现一个简单的 i18n 插件
```js
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```