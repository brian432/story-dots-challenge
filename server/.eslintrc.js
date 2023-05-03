module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'server/tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  },
  exclude: ['build/**/*']
}
