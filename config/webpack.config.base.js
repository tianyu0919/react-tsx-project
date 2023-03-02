/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:10:28
 * @Description: webpack 基本配置
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // * 压缩 css 代码
const TerserPlugin = require('terser-webpack-plugin'); // * 压缩 JS 代码
const PATH = require('path');
const isDevelopment = process.env.NODE_ENV;
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBar = require('webpackbar');

console.log(isDevelopment);

module.exports = {
  // entry: PATH.resolve(__dirname, '../test.ts'),
  entry: PATH.resolve(__dirname, '../src/index.tsx'),
  // entry: PATH.resolve(__dirname, '../src/utils/layer/index.ts'),
  mode: isDevelopment ? 'development' : 'production',
  target: ['web', 'es5'],
  // experiments: { // * 如果 output.library.type 为 module 则必须开启这个配置
  //   outputModule: true
  // },
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    clean: true
    // library: {
    //   // name: 'mylib', // * 如果 type 为 module 必须添加name
    //   type: 'umd'
    // },
    // globalObject: 'this'
  },
  resolve: {
    alias: {
      src: PATH.resolve(__dirname, '../src'),
      components: PATH.resolve(__dirname, '../src/components')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()].concat(
      isDevelopment
        ? []
        : [
            new TerserPlugin({
              minify: TerserPlugin.uglifyJsMinify, // * 设置压缩方式，按照 uglify-js 压缩方法
              terserOptions: {
                // * 根据 minify 提交的压缩方式，配置压缩项。
                compress: {
                  drop_console: true, // * 删除 console.log 日志
                  drop_debugger: true
                }
              }
            })
          ]
    ),
    splitChunks: {
      chunks: 'all' // * 将依赖包分离到单独的一个块
    }
  },
  // externals: [
  //   {
  //     "react": 'React',
  //     "react-dom": "ReactDOM"
  //   }
  // ],
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
      {
        test: /\.gif$/i,
        type: 'asset/inline'
      },
      {
        test: /\.(ttf|eot|svg)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'fonts',
          publicPath: 'fonts/'
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
  plugins: [
    new WebpackBar({
      name: isDevelopment ? '运行中' : '打包中',
      color: '#1677ff', // * 默认green，进度条颜色支持HEX
      basic: false, // * 默认为true，启用一个简单的日志报告器
      profile: false //* 默认为false，启用探查器
    }),
    new HtmlWebpackPlugin({
      template: PATH.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new VueLoaderPlugin()
  ]
};
