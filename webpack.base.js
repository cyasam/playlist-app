const webpack = require('webpack')
const path = require('path')
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
            name: '[name].[hash].[ext]',
            outputPath: 'assets/fonts/'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/images/'
          }
        }
      },
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/'
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '/.(jpe?g|png|gif|svg|ico)$/']
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

module.exports = config
