const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const config = {
  entry: {
    app: ['babel-polyfill', './src/scripts/index.js'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),
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
