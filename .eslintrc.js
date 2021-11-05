module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/no-unused-components': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
