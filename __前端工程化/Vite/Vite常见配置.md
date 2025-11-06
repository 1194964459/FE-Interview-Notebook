# Vite常见配置

localhost请求Https的一个接口，本地devServer跨域：

1. 请求是https，并且 Vite 开发服务器支持 HTTPS

```js
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl()  // 启用 HTTPS 插件
  ], 
  server: {
    https: true, // 开启 HTTPS 服务
    port: 3000,
  },
});
```

2. 通过 server.proxy 将前端请求代理到目标 HTTPS 接口，同时处理跨域头和协议匹配
```js
 server: {
    https: true,
    port: 3000,
    proxy: {
      // 匹配以 /api 开头的请求
      '/api': {
        target: 'https://your-api-domain.com', // 目标 HTTPS 接口地址
        changeOrigin: true, // 跨域时修改请求头的 Origin
        secure: false, // 若目标接口的 SSL 证书不被信任（如自签名），需设为 false
        rewrite: (path) => path.replace(/^\/api/, ''), // 移除请求路径中的 /api 前缀
        // 若接口使用 WebSocket，需开启 ws 代理
        // ws: true,
      },
    }
 }
```