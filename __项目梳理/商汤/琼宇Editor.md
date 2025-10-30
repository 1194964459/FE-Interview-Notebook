# 琼宇Editor中实现2D裁剪优化
H5大致的功能就是：把地图加载出来（有些是nerf相关的配置），做面积裁剪；然后把裁剪区域给到UE

## 基本功能、流程

// 
Editor编辑工具：在UE虚幻引擎中内嵌H5页面，H5页面实现对Nerf模型的2D裁剪优化。首先会加载谷歌地图或天地图，然后基于Vue-cesium在地图上展示Nerf区域、绘制多边形裁剪框，绘制完成后通知UE。


在UE虚幻引擎中内嵌H5页面，H5页面从UE获取地图key 加载指定地图（谷歌地图或天地图），获取Nerf区域并在地图上展示，绘制多边形选区用于裁剪Nerf区域。UE可向H5发起新建/取消/导入绘制选区操作。



## 使用到的 Vue-cesium 模块
vc-config-provider
提供全局的配置选项

vc-viewer：构建 Cesium 应用程序的基础组件，其实质是通过 Cesium.Viewer 初始化的一个 DOM 节点，用于挂载其他 DOM 节点或者子组件。

vc-entity、vc-graphics-label；展示文案“当前模型边界”

vc-drawings
加载绘制工具组件。支持绘制点、线、面、矩形、正多边形、圆形。

vc-layer-imagery
```js
加载影像图层，相当于初始化一个 Cesium.ImageryLayer 实例。

需要作为 vc-viewer 的子组件才能正常加载。可以直接指定 vc-layer-imagery 的 imageryProvider 属性，或者用 VueCesium 提供的 vc-imagery-provider-xxx 系列组件作为 vc-layer-imagery 子组件挂载各个 imageryProvider，但一个影像图层只能挂载一个 provider。
```

vc-distance-legend：比例尺

## 地图
unity与js交互（通过webview）

用的googele、天地图的地图服务，但是渲染是用cesium来渲染的

国内地图服务：天地图
国外地图服务：google地图服务，
（为什么不用openStreetMap的地图服务?是开源免费的，觉得不合适，贤斌给的解释是：就自己把对应的地图服务停掉了）




**H5的url中会携带一些参数：**
* hl：语言类型（zh、en）
* source：地图类型（天地图、Google地图）
* lng、lat、
* debug：是否开启debug

一、JS调用UE：
基于这2个方法：
`invokeUeMethod`（H5主动反馈当前的进度、状态）
`invokeUeMethodWithRetVal`(H5有依赖数据需要UE提供)

* 获取地图key
* 获取Nerf区域（Nerf区域是不可编辑的，H5绘制的 都是可编辑的绘制区域）
* 加载后地图反馈给UE
* 绘制区域结束
* H5更新UE相机位置：H5 2d视角切换到UE 3d视角, 相机保持同步


二、UE调用JS：通常是下达执行指令
新建、取消新建、导入绘制区域、显示/隐藏绘制区域、切换地图视角

```JS
window.fe = {
  resetCamera,  // 地图回到默认视角
  newEditPolygon,   // 新建绘制区域/新建选区（仅限当次）
  cancelNewEditPolygon,  //  取消“新建绘制区域”（仅限当次绘制）
  resetMap,  // 重置地图状态（清除所有绘制区域，并显示最新的Nerf区域）
  importEditPolygon,    // 导入绘制区域（将“客户端侧绘制的可编辑数据”导入）
  setEditPolygonVisibility,  // 显示/隐藏绘制区域
  lookAtCamera,  //  UE更新H5相机位置：用于UE 3d视角切换到H5 2d视角, 相机保持同步
  mouseUp,  // 提供给UE调用，H5更新UE相机位置：H5 2d视角切换到UE 3d视角, 相机保持同步
};
```

完成绘制；
```JS
const polgInstance = window.draw.value.getDrawingActionInstance("polygon").cmpRef;
  
polgInstance.value.handleDoubleClick();
```