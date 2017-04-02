require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = process.env.NODE_ENV === 'production' ? [
  'babel-polyfill',
  './src/index',
] :
[
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/dev-server',
  './src/index',
];

module.exports = {
  devtool: 'eval',
  entry: {
    app: entry,
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'js/[name]_bundle.js',
    publicPath: '/',
  },
  plugins: (process.env.NODE_ENV === 'production' ? [
    new HtmlWebpackPlugin({
      inject: 'head',
      chunks: [],
      template: path.join(__dirname, 'index.html'),
    }),
  ] : [
    new HtmlWebpackPlugin({
      inject: 'head',
      chunks: [],
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),

  ]).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : null,
        BASE_URL: process.env.BASE_URL ? JSON.stringify(process.env.BASE_URL) : null,
      },
    }),
  ]),
  node: {
    fs: 'empty',
  },
  resolve: {
    modulesDirectories: ['node_modules', '../node_modules/dic-client/src'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[local]---[hash:base64:5]',
        ],
      },
      {
        test: /\.ico$/, loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)$/, loader: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.(eot|woff|ttf)$/, loader: 'file-loader?name=fonts/[name].[ext]&context=./www/fonts"',
      },
      {
        test: /\.json$/, loader: 'json',
      },
    ],
  },
};
