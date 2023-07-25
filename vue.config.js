const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/': {
        ws: false,
        // target: 'http://127.0.0.1:4523/m1/3050715-0-default',
        target: 'http://192.168.43.171',
        changeOringin: true,
      }
    }
  }
})
