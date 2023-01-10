/*
 * @Author: 归宿
 * @Date: 2023-01-10 11:36:53
 * @Description: 
 */
module.exports = {
  "globals": ['test'],
  "env": {
    "browser": true,
    "es2021": true,
    node: true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    "no-unused-vars": 0,
    indent: ['warn', 2]
  }
}
