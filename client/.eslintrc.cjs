module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'client/tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'

  }
}
