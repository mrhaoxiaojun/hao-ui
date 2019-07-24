# hai-ui  嗨！o(*￣︶￣*)o

> `hao-UI` 是一款基于 `Vuecli2x`脚手架搭建的vue组件库 ，在学习借鉴```element-ui vv-ui```等成熟架构后搭建了自己的前端 UI 组件库，用于学习
- `在线演示：` [Hai-UI](https://mrhaoxiaojun.github.io/hao-ui/#/)


### 安装

```bash
npm install hao-ui --save
```

### 使用

#### 全局使用

可以在项目的入口文件中引入所有组件或所需组件

```js
import HaoUI from 'hao-ui' // 引入组件库
import 'hao-ui/packages/theme-set/lib/index.css' // 引入样式库

Vue.use(HaoUI)
```

在模板中，用 `<h-button></h-button>` 自定义标签的方式使用组件

```html
<template>
  <h-button>这是一个按钮</h-button>
</template>
```

#### 自定义主题

`UI` 基于stylus,可修改 `hao-ui/packages/theme-set/common/var.css` 文件自定义主题


### 问题

在使用 `Hao-UI` 时遇到问题，或者有好的建议，欢迎提出来，反正不会改！skr，skr，O(∩_∩)O~

### 参考

仿element使用vue实现自己的UI组件库(https://blog.csdn.net/qq316020201/article/details/87090721)
从零开始搭建Vue组件库 VV-UI(https://www.cnblogs.com/tiedaweishao/p/7825997.html)
Element源码系列——Vue加载Markdown(https://blog.csdn.net/m0_37972557/article/details/81089887)

