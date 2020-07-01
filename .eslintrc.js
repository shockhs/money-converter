module.exports = {
  parser: 'babel-eslint',
  env: {
    "es6": true,
    browser: true
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    "no-unused-vars":"warn"
  }
}