module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  rules: {
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-unresolved': 'error',
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    eqeqeq: 'off',
    'dot-notation': 'off',
  },
};
