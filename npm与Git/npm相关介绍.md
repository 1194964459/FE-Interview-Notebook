# 一些常见工具使用

## npx
[npx](https://www.ruanyifeng.com/blog/2019/02/npx.html)

Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下。

```js
npm install -g npx
```

npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

```js
// 不使用npx
node-modules/.bin/mocha --version

// 使用npx
npx mocha --version
```

## npm run eject
