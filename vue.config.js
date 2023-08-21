const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //关闭语法检查
  lintOnSave: false,

  pages: {
    index: {
      entry: 'src/main.js', //入口文件
      title: 'Fancy Music' //页签名称
    }
  }
})
