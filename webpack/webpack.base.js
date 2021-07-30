const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

const ROOT_PATH = path.resolve(__dirname, '../src')
const packagesAliasMap = fs.readdirSync(ROOT_PATH).filter((fileName)=>!fileName.includes('.')).reduce((acc, fileName) => {
  acc[fileName] = path.join(ROOT_PATH, fileName)
  return acc
}, {})

module.exports = {
  entry: {
    index: './src/index.tsx',
    content: {
      import: './src/contentScripts/index.ts',
    },
    background: {
      import: './src/backgroundScripts/index.ts',
      filename: '[name].js',
    },
  },
  output: {
    filename: 'js/[name].js',
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: { ...packagesAliasMap },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#ff7a18',
                  'link-color': '#ff7a18',
                  'border-radius-base': '2px',
                  'component-background':'#eaeaea'
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      excludeChunks: ['background'],
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'option/index.html',
    //   template: './src/index.html',
    //   chunks: ['option'],
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV),
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/manifest.json', to: '' },
      ],
    }),
  ],
}
