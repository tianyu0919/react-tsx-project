/*
 * @Author: 归宿
 * @Date: 2023-01-10 11:36:53
 * @Description: 
 */
module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es2021": true,
    node: true
  },
  ignorePatterns: ['__local/**/*', "*.test.ts"],  // * 忽略项，不检查什么文件
  "extends": [
    "eslint:recommended", // * eslint 本身的集成
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended" // * typescript-eslint 的集成 跟 eslint是两个东西
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser", // * 使用 @typescript-eslint 解析器去解析 ts 文件
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint" // * 开启 @typescript-eslint 插件
  ],
  "rules": {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // "no-unused-vars": 1, // * 用来配置 eslint 本身的
    "@typescript-eslint/no-unused-vars": 1, // * 没有使用的已有变量
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-empty-function": 0, // * 函数提为空报错
    indent: ['warn', 2]
  }
}
