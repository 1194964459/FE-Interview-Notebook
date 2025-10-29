# debug面板如何绘制：
![debugger面板](../icon/debugger面板.jpg)

```js
/**
 * x：参数中传入的定位坐标
 */
  drawPoint(x, y, color, r) {
      const { ctx, targetFloorInfo, pix } = this.data  // pix = 1000

      const { width, height } = targetFloorInfo
      const _x = (x / width) * pix - r / 2
      const _y = pix - (y / height) * pix - r / 2

      ctx.fillStyle = color
      ctx.fillRect(_x, _y, r, r)  // x、y是距离左上角的位置坐标
    },
```


