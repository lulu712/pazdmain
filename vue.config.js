const { defineConfig } = require('@vue/cli-service')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: '/pazdmain/'
}

module.exports = defineConfig({
  transpileDependencies: true,

  // configureWebpack: {
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()],
  //       dts: false, // Windows 必加
  //       include: [
  //         /\.[tj]sx?$/,
  //         /\.vue$/,
  //         /\.vue\?vue/,
  //       ],
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver()],
  //       dts: false, // Windows 必加
  //     }),
  //   ],
  // },

  devServer: {
    client: {
      overlay: false,
    },
  },
})