/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:10:28
 * @Description: extends webpack.config.base.js 配置生产环境
 */
const baseConfig = require('./webpack.config.base');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, new BundleAnalyzerPlugin()]
};
