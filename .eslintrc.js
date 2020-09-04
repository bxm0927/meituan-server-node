const isDev = process.env.NODE_ENV !== 'production';

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

    // 先关掉 Prettier，体验下 airbnb style
    // 'eslint:recommended',
    // 'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here
    'no-console': isDev ? 'off' : 'error',
    'no-debugger': isDev ? 'off' : 'error',
  },
};
