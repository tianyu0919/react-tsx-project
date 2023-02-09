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
const { VueLoaderPlugin } = require('vue-loader');

console.log(isDevelopment);

module.exports = {
  entry: PATH.resolve(__dirname, '../src/index.tsx'),
  mode: isDevelopment ? 'development' : 'production',
  target: ['web', 'es5'],
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    clean: true
  },
  resolve: {
    alias: {
      src: PATH.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(le|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        exclude: /node_modules/
      },
      {
        include: /node_modules/,
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        exclude: /src/
      },
      // {
      //   include: /src/,
      //   test: /\.css$/i,
      //   use: ['vue-style-loader', 'css-loader'],
      //   exclude: /node_modules/
      // },
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
    }),
    new VueLoaderPlugin()
  ]
};
