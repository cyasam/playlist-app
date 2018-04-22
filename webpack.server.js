const path = require('path')
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  externals: [nodeExternals()]
}

module.exports = config
