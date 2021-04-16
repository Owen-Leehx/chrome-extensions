const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: {
    index: './src/index.tsx',
    test: {
      import: './src/test/index.ts',
      filename: 'pages/[contenthash].js',
    },
    option: {
      import: './src/option/index.ts',
      filename: 'pages/option.js',
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic', //https://webpack.docschina.org/configuration/optimization/#optimizationmoduleids
    splitChunks: {
      cacheGroups: {
        reactLib: {
          name: 'reactLib',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'initial',
          reuseExistingChunk: true,
          priority: 1,
        },
        reactRouter: {
          name: 'reactRouter',
          test: /[\\/]node_modules[\\/](react-router)[\\/]/,
          chunks: 'initial',
          reuseExistingChunk: true,
          priority: 1,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'option/index.html',
      template: './src/index.html',
      chunks: ['option'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV),
      },
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: 'assets' }],
    }),
  ],
}
