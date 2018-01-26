const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: {
    app: ['babel-polyfill', './src/scripts/index.js'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk']
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(ttf|woff|eot|otf)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[hash].[ext]",
            publicPath: "../",
            outputPath: "fonts/"
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[hash].[ext]",
            publicPath: "../",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[ext]",
            publicPath: "../",
            outputPath: "images/"
          }
        }
      },
      {
        test:/\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '/\.(jpe?g|png|gif|svg|ico)$/']
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
};

module.exports = config;