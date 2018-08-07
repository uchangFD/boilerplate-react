import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/dist/js/'),
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015', 'react'
          ]
        }
      },
      {
        test: /\.(css|scss)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"],
              },
              plugins: () => [
                autoprefixer
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000&name=images/[name].[ext]'
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtractPlugin({
      filename: 'build.css',
      publicPath: './dist/css/'
    }),
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}