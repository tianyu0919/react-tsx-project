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
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
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
    port: 9001,
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
    new ESLintPlugin({ // * eslint 插件
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      // fix: true
    }),
    new ForkTsCheckerWebpackPlugin(), // * 检查 ts 语法错误，全屏显示错误信息
    new MiniCssExtractPlugin(),
    new ReactRefreshWebpackPlugin() // * react 的热更新插件
  ]
}

// * eslint 跟 fork-ts-checker-webpack-plugin 的区别：
// * eslint: 根据你的eslint 配置文件，检查你的代码规范问题。报错全屏是否显示信息在 webpack 的 devServer > client > overlay 中配置。
// * fork-ts-checker-webpack-plugin：检查你的 ts 语法错误。如果有类型或者语法错误则在运行阶段就会全屏报错。 