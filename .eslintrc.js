module.exports = {
  env: {
    "jest/globals": true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src', 'test'],
        extensions: ['.js'],
      },
    },
  },
  rules: {
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
