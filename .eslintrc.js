/*
 * ESLint Configuration
 * https://github.com/eslint/eslint
 *
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 13:21:32
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-15 13:22:17
 */

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  extends: [
    // add more generic rulesets here
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here
    'no-console': isDev ? 'off' : 'error',
    'no-debugger': isDev ? 'off' : 'error',
  },
}
