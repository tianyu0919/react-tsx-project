module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://commitlint.js.org/#/reference-configuration',
  rules: {
    // "type-enum": [2, 'always', ['傻逼', '一贤']]
    // "scope-enum": [2, 'always', ['body']]
    'scope-empty': [2, 'never'], // * 不能为空
    'subject-empty': [2, 'never'] // * 不能为空
  }
};
