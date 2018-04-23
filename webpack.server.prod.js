const webpack = require('webpack')
const merge = require('webpack-merge')
const serverConfig = require('./webpack.server')

const config = {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}

module.exports = merge(config, serverConfig)
