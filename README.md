# signal-web-app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 信号测试 APP 前端(页面)项目使用的技术结构

- 简述

  - 本项目使用单页面的 Web 页面形式开发，目前暂不考虑 PC 与移动端屏幕适配，仅适配移动端屏幕
  - 本项目主要是用于嵌入到 Android APP 中以展示 Adroid 原生 API 测试到的手机信号质量数据；包括 RSRP、RSRQ、RSSI 等
  - 项目 Web 端与原生端通信使用 prompt 方法进行通信 详细使用 方法见 `/src/components/SignalDisplayDownComponent/SignalDisplayDownComponent.vue` 中 prompt 的用法

- 项目主要使用技术列表
  - [Vue](https://cn.vuejs.org/v2/api/) [vue-router](https://router.vuejs.org/zh/guide/) [vuex](https://vuex.vuejs.org/zh/) [axios](https://github.com/axios/axios) [vue-touch](https://github.com/vuejs/vue-touch/tree/next) [echarts](https://www.echartsjs.com/zh/option.html#title) [mint-ui](https://mint-ui.github.io/#!/zh-cn) [px2rem](https://www.npmjs.com/package/px2rem) [moment](https://momentjs.com/)
  - Vue 是基本框架
  - Vue-Router 是路由插件，负责管理在单页面中的路由跳转管理
  - Vuex 是数据管理插件，因为在 Vue 中，不同组件间传递数据和麻烦，所以使用一个外部的数据管理插件对前端数据作统一的管理
  - mint-ui 是基于 Vue 的 UI 框架(包含已经做好的某些组件，如弹窗等)
  - Axios 是数据请求的库，类似于 jQuery 中的 `$.ajax` 但是比 jQuery 中的 `ajax` 功能更多，更实用
  - vue-touch 手势控制使用的是 `vue-touch` 控件，详情可以查看官网 API
  - Echarts 图表使用的是 Echarts 可查看官网学习使用方法
  - Scss css 样式表编写使用了 Scss 预编译器的方式，也可以在 Scss 文件中直接 css
  - px2rem 是用来做屏幕适应的，将 css 中的 px 绝对单位转化为 rem 相对单位 弱要修改 px 与 rem 的转换比例在文件 `vue.config.js`中修改 `remUnit`项
  - moment 时间、日期处理插件
