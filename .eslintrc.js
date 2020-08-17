const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  // 先关掉 Prettier，体验下 airbnb style
  extends: [
    // add more generic rulesets here
    'airbnb-base',
    // 'eslint:recommended',
    // 'plugin:prettier/recommended', // Prettier 一定要是最后一个，才能确保覆盖所有和与其冲突的规则
  ],
  rules: {
    // override/add rules settings here
    'no-console': isDev ? 'off' : 'error',
    'no-debugger': isDev ? 'off' : 'error',
  },
};
