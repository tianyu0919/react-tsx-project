/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:10:28
 * @Description: extends webpack.config.base.js 配置开发环境
 */
const baseConfig = require('./webpack.config.base');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const PATH = require('path');

module.exports = {
  ...baseConfig,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    client: {
      overlay: {
        // * 用来显示报错的
        errors: true,
        warnings: false
      }
    },
    hot: true,
    compress: true,
    port: 9001,
    static: PATH.resolve(__dirname, './dist')
  },
  plugins: [
    ...baseConfig.plugins,
    new ESLintPlugin({
      // * eslint 插件
      extensions: ['.js', '.ts', '.jsx', '.tsx']
      // fix: true
    }),
    new ForkTsCheckerWebpackPlugin(), // * 检查 ts 语法错误，全屏显示错误信息
    new ReactRefreshWebpackPlugin() // * react 的热更新插件
  ]
};

// * eslint 跟 fork-ts-checker-webpack-plugin 的区别：
// * eslint: 根据你的eslint 配置文件，检查你的代码规范问题。报错全屏是否显示信息在 webpack 的 devServer.client.overlay 中配置。
// * fork-ts-checker-webpack-plugin：检查你的 ts 语法错误。如果有类型或者语法错误则在运行阶段就会全屏报错。
