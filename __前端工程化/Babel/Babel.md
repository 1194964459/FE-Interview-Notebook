# Babel

参考：[JS 语法转成 AST](https://astexplorer.net/)

Babel 是JavaScript 语法的 “翻译官”！

通过 “**解析 → 转换 → 生成**” 三个步骤，将**高版本 JavaScript 代码（如 ES6+）、TypeScript、JSX** 等转换为**低版本 JavaScript 代码**，确保其能在**所有浏览器**（包括老旧浏览器如 IE）和**运行环境**中正常运行。让开发者可以自由使用**最新的语言特性**，无需担心**运行环境**支持问题。

如：
* ES6 ``` let x = 1``` → 转换为 ES5 ```var x = 1```（结合作用域处理）；
* JSX 语法 ```<div>Hello</div>``` → 转换为 React 函数调用 ```React.createElement("div", null, "Hello")```。


## Babel 的核心组成部分：核心包、插件/预设
Babel 本身是一个 “模块化工具链”，核心功能由**核心包**和**插件/预设**组成，*没有插件的 Babel 几乎无法完成任何实际转换*。

1. 核心包：Babel 的 “骨架”     
核心包负责**实现代码转换的基础流程（解析、转换、生成）**，但*不包含具体的语法转换逻辑*。常用核心包如下：

| 包名	| 作用 |
| ---- |---- |
| @babel/core |	Babel 核心引擎，提供代码解**析、转换、生成**的核心 API（如 **transform** 方法）。|
| @babel/parser |（原 babylon）负责**将源代码(字符串) 解析为 抽象语法树（AST）**，是转换的基础。|
| @babel/traverse|	**遍历并修改 AST**（如将箭头函数节点替换为普通函数节点）。|
| @babel/generator|	将**修改后的 AST 重新生成低版本 JavaScript 代码**。|
| @babel/types	|辅助工具，用于**创建/判断 AST 节点类型**（如 t.arrowFunctionExpression）。|

2. 插件（Plugins）：Babel 的 “肌肉”
插件是实现**具体语法、转换的核心**，*每类语法（如箭头函数、解构赋值）的转换逻辑都由对应的插件实现*。

3. 预设（Presets）：插件的 “集合”
手动配置大量插件会非常繁琐（如支持 ES6+ 需几十个插件），预设是 “插件的集合”，可一次性引入一组插件，简化配置。

    * 常见的预设：
        * @babel/preset-env，自动根据目标环境，引入所需的转换插件，适合处理 ES6+ 语法的兼容性！
        * @babel/preset-react，转换 JSX 语法，并支持 React 相关特性（如 Fragment、Hooks）
        * @babel/preset-typescript，转换 TypeScript 代码为 JavaScript	

## Babel 的工作原理：解析、转换、生成 三步骤
Babel 的转换过程本质是 “操作抽象语法树（AST）”，分为三个核心步骤：
1. **解析**（Parse）：**源代码 → AST**    
由 @babel/parser 完成，将字符串形式的源代码解析为抽象语法树（AST）

2. **转换**（Transform）：**修改 AST**   
由 @babel/traverse 遍历 AST，并根据插件/预设的规则修改 AST

这是 Babel 最核心的步骤 —— 所有语法兼容性处理都在此阶段完成。

3. **生成**（Generate）：**AST → 目标代码**  
由 @babel/generator 将修改后的 AST 重新转换为字符串形式的低版本 JavaScript 代码，并自动处理缩进、换行等格式问题。


## Babel 的关键配置（babel.config.json / .babelrc）
Babel 的配置文件用于指定 “使用哪些插件/预设”“目标运行环境” 等规则，常用配置文件格式有：

* babel.config.json（推荐，项目级配置，支持 Monorepo）；
* .babelrc 或 .babelrc.json（文件级配置，仅对当前目录及子目录生效）。

Babel 7 起采用 @babel 命名空间（如 @babel/core 替代 babel-core）

### @babel/core
@babel/core 本身并不直接实现解析和遍历逻辑，而是整合了 @babel/parser、@babel/traverse 和 @babel/generator（代码生成），提供了更上层的 API（如 transform 方法）。

```@babel/core = 解析（parser）+ 转换（traverse）+ 生成（generator）+ 配置管理 + 错误处理。```

```
transform方法：同步（阻塞式处理），处理字符串形式的源代码
transformAsync：异步，返回 Promise，非阻塞式处理（推荐在 Node.js 环境中使用，避免阻塞事件循环）
transformFile：处理文件路径，直接读取文件内容并转换
transformFromAst：以AST为输入（而非源代码字符串），直接进行转换和生成步骤。适合“已有 AST 时，避免重复解析”的场景
```

### @babel/parser
@babel/parser 的核心作用是将源代码字符串解析为抽象语法树（AST）。除了 Babel 的代码转换，**很多工具都需要解析代码生成 AST**，例如：
* **ESLint（代码检查）**：需要解析代码以检测语法错误；
* **Prettier（代码格式化）**：需要解析代码以重新排版；
* **Webpack（模块打包）**：需要解析代码以**识别依赖关系**。

这些工具可以直接复用 @babel/parser 的解析能力，而无需重复开发一套解析器。

简单应用：[基于 Babel 提取模块的依赖关系](./code/func.js)

### @babel/traverse
@babel/traverse 的核心作用是遍历和修改 AST。

支持复杂的代码转换逻辑，**Babel 的核心功能（如将 ES6+ 转译为 ES5）本质是对 AST 的修改**：
* 箭头函数 ```() => {}``` → 转换为普通函数 ```function () {}```；
* import 语句 → 转换为 require 调用（CommonJS 模块）。
这些转换都依赖 @babel/traverse 提供的节点操作能力（**替换、删除、新增节点**等）。

@babel/traverse 的遍历和修改能力也可被其他工具复用：
* **代码压缩工具(删除)**（如 Terser）：通过遍历 AST 删除无用代码；
* **代码注入工具(新增)**：通过遍历 AST 在特定位置插入日志代码；
* **静态分析工具(遍历)**：通过遍历 AST 提取代码中的依赖关系或变量使用情况。

###  @babel/core中的 transform 方法 
```transform(code, options)```

**transform 方法的第二个参数 options** 是配置核心，决定了代码如何被转换。常用配置项如下：

| 配置项 | 类型	 | 作用说明 | 
| ----| ----| ---- |
| presets| 	数组| 	指定使用的预设（插件集合），如 ['@babel/preset-env'] 处理 ES6+ 语法| 
| plugins	| 数组	| 指定使用的插件（单个语法转换逻辑），优先级高于 presets| 
| sourceType| 	字符串| 	指定代码类型：<br/>"module"（ES 模块，支持 import/export）、<br/>""script"（普通脚本）、<br/>""unambiguous"（自动检测）| 


> 插件与预设的执行顺序：
> * plugins 先于 presets 执行；
> * plugins 按数组正序执行；
> * presets 按数组倒序执行（如 [A, B] 实际执行顺序为 B → A）。

**transform 返回值**是一个包含转换结果的对象，其部分结构如下：

| 属性 | 类型	| 说明| 
| ----| ----| ---- |
| code	| 字符串	| 转换后的代码（如 ES5 代码）| 
| ast	| 对象	| 处理后的抽象语法树（AST），可用于后续二次处理| 

