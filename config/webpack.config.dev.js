/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:10:28
 * @Description: 
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const PATH = require('path');

module.exports = {
  entry: PATH.resolve(__dirname, '../src/index.tsx'),
  mode: 'development',
  target: ['web', 'es5'],
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  devServer: {
    client: {
      overlay: { // * 用来显示报错的
        errors: true,
        warnings: false
      }
    },
    hot: true,
    compress: true,
    port: 9000,
    static: PATH.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require.resolve('react-refresh/babel')]
            }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.gif$/,
        type: 'asset/inline'
      },
      {
        test: /\.(ttf|eot|svg|doc|docx|pdf)$/,
        type: 'asset/resource'
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATH.resolve(__dirname, "../public/index.html")
    }),
    new ESLintPlugin({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      // fix: true
    }),
    new MiniCssExtractPlugin(),
    new ReactRefreshWebpackPlugin()
  ]
}