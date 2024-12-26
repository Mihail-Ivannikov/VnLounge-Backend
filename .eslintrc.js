module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint', // Ensure Prettier works well with TypeScript
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true, // You can specify the latest ECMAScript version here
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // You can remove this if you don't need it
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error', // This will throw errors for code not following Prettier rules
    'no-console': 'warn', // You can tweak rules based on your preference
  },
};
