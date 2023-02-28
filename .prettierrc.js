/*
 * @Author: 归宿
 * @Date: 2023-01-10 14:21:59
 * @Description:
 */
module.exports = {
  singleQuote: true,
  semi: true, // 使用分号, 默认true
  useTabs: false, // 使用tab缩进，默认false
  tabWidth: 2, // tab缩进大小,默认为4或2
  arrowParens: 'avoid', // 箭头函数参数括号 默认avoid。avoid 能省略括号的时候就省略 例如x => x，always 总是有括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  printWidth: 200, // 一行的字符数，如果超过会进行换行，默认为80
  trailingComma: 'none' // 去掉末尾的逗号
};
