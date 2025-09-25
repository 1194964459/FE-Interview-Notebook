# Vuei18n 国际化

# createI18n
```js
// 创建 i18n 实例
const i18n = createI18n({})
```

## $t 和 t 是用于实现国际化文案渲染的核心函数

* `$t`：选项式 API 或模板中使用
模版中：$t调用
选项式 API 的 script 中使用：通过 this.$t 调用

* t：组合式API及模版中都是 t() 调用。组合式API中没this，`const { t } = useI18n()` 获取 t 

## Vue 单文件组件中 i18n 块，这是局部作用域！
```js
<i18n>
{
  "en": {
    "title": "Hello"
  },
  "zh": {
    "title": "你好"
  }
}
</i18n>
```
若组件中没有`<i18n>`块，则是全局作用域！

## usei18n
useI18n 是在 vue-i18n 8.x 版本 2020年左右 引入的。为了在**组合式API中使用国际化功能**，比如获取翻译文案、切换语言等。
```js
<script setup>
import { useI18n } from 'vue-i18n';

// 解构获取相关属性和方法
const { t, locale, setLocaleMessage, mergeLocaleMessage } = useI18n(); 


// 获取翻译后的文案
const message = t('hello'); 

// 当前选中的语言
const currentLang = locale

// 切换语言
const changeLang = () => {
  locale.value = currentLang.value  // 直接修改 locale 触发更新
}
```
其中 usei18n解构出来的 locale 是个可响应式的 Ref 对象，用于获取和设置当前应用的语言环境代码。

带作用域的使用：useScope为global、local
```js 
const { t } = useI18n({ useScope: 'local' }); 
```