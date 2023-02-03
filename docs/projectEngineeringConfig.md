# 一些插件配置

## [husky](https://typicode.github.io/husky/)

简述：在提交 `git` 的时候触发一些 `git` 的钩子(生命周期），例如在提交 `commit` 之前触发一个 `pre-commit` 生命周期进行代码格式和规范的整理。在 `commit` 的时候查看提交的文本是否符合描述

## [lint-staged](https://github.com/okonet/lint-staged#readme)

简述：**只会检测暂存区的文件**，配合 `husky` 使用，在提交 `commit` 的时候触发 `husky` 的 `pre-commit` 钩子，执行 `npx lint-staged` 用来检查代码，需要配置验证者，例如 `eslint`、`prettier` 等。

例子：在 <kbd>package.json</kbd> 中添加一个配置字段，或者添加新的文件，如下是添加字段的方式。

```json
{
  "lint-staged": {
    "*.(js|ts|jsx|tsx)": ["prettier", "eslint"]
  }
}
```

## [pretty-quick](https://github.com/azz/pretty-quick)

简述：配合 `husky` 和 `prettier` 一起使用，在 `husky` 的 `pre-commit` 钩子中使用 `npx pretty-quick --staged` 命令根据项目中的 `prettier` 配置文件进行暂存文件的代码格式化。

## [commitlint](https://commitlint.js.org/#/)

简述：[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，在提交暂存更改的时候，规范提交的信息。
