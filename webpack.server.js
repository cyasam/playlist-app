const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')

const config = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: ['babel-polyfill', './src/server/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'server')
  },
  externals: [nodeExternals()]
}

module.exports = merge(config, commonConfig)
