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
    '@typescript-eslint/no-unused-vars': 'warn',
    'require-await': 'warn',
    'vue/no-dupe-keys': 'warn',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'array-callback-return': 'warn',
    'import/order': 'off',
    'import/first': 'off'
  }
}