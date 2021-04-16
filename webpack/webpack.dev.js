const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.js')

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    port: 9999,
    open: true, // other: 'chrome'
    // hot: true,
    // hotOnly: true,
    // liveReload:true,
    // useLocalIp: true,
    // watchContentBase: true,
    // https: true,
    // historyApiFallback: true,
    // host: '0.0.0.0',
    // contentBase: path.join(__dirname, '../dist'),
    // compress: true,
    // noInfo: true,
    // overlay: true,
    proxy: {
      '/api': {
        target: 'http://10.10.10.41:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
})
