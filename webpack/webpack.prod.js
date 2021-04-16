const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.js')
module.exports = merge(baseWebpackConfig, {
  devtool: false,
  mode: 'production',
})
