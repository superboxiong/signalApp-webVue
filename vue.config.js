let webpack = require("webpack");
const px2rem = require("postcss-px2rem");
module.exports = {
  devServer: {
    port: 8505 // 端口号配置
  },
  configureWebpack: {
    externals: {
      AMap: "AMap" // 高德地图配置
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
        plugins: [
          require("postcss-px2rem")({
            remUnit: 10
          })
        ]
      }
    }
  }
};
