const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.113.4:80/'
        //target: 'https://yapi.pro/mock/41361',
      }
    }
  }
})
