const { defineConfig } = require('@vue/cli-service')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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

  // devServer: {
  //   port: 8080,
  //   host: '0.0.0.0',
  //   watchFiles: ['src/**/*', 'public/**/*'], // Windows Watch 修正
  // },
})