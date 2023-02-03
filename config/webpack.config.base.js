/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:10:28
 * @Description: webpack 基本配置
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PATH = require('path');
const isDevelopment = process.env.NODE_ENV;

console.log(isDevelopment);

module.exports = {
  entry: PATH.resolve(__dirname, '../src/index.tsx'),
  target: ['web', 'es5'],
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
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
              plugins: isDevelopment ? [require.resolve('react-refresh/babel')] : []
            }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.gif$/i,
        type: 'asset/inline'
      },
      {
        test: /\.(ttf|eot|svg)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'fonts'
        }
      },
      {
        test: /\.(doc|docx|pdf)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'assets'
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATH.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
