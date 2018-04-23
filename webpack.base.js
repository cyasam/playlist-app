const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const config = {
  entry: {
    app: './src/scripts/index.js',
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/images/favicon.png',
      prefix: 'assets/images/favicons/',
      persistentCache: true,
      inject: true,
      title: 'Playlist App',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}

module.exports = merge(config, commonConfig)
