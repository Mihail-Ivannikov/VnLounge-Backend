module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping
    es6: true, // Enables ES6 global variables
  },
  extends: [
    'eslint:recommended', // Use recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Use recommended rules from the TypeScript plugin
    'prettier', // Disables rules that conflict with Prettier
  ],
  plugins: [
    '@typescript-eslint', // Adds TypeScript-specific linting rules
  ],
  rules: {
    // Custom rules can be added here
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused variables prefixed with _
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable requirement for explicit return types
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
